import { useEffect, useCallback, useRef, useMemo, useState } from 'react'
import { axios } from '../../_services'
import { shallowEqual, useSelector } from 'react-redux'
import {
  formatStudioStatus,
  localToServerTimeOffset,
  dayjs
} from '../../_helpers'
import {
  API_HULLABALLOO_URL,
  API_ACCOUNT_URL,
  LIST_STATUS_FINISHED,
  LIST_STATUS_EXPIRED,
  LIST_STATUS_PROCESSING,
  ANALYSIS_HISTORY_SERVICE,
  ERROR_RETRY_COUNT,
  FILTERS_COLUMN,
  DEFAULT_DATE_TIME_FORMAT
} from '../../_constants'

const useUpdateStudioListStatusSSE = ({
  page,
  status,
  start,
  end,
  setData,
  data,
  abortRef
}) => {
  const errorCountRef = useRef(0)
  const isFetchingRef = useRef(false)
  const isSteamingRef = useRef(false)
  const sseSource = useRef(null)
  const [flag, setFlag] = useState(false)
  const user = useSelector((state) => state.authentication?.user, shallowEqual)

  const idsData = useMemo(() => {
    const ids = data?.lists.reduce((acc, cur) => {
      const { id, status, expires } = cur
      const _status =
        status === LIST_STATUS_FINISHED
          ? dayjs().isBefore(
              expires
                ? localToServerTimeOffset(expires, DEFAULT_DATE_TIME_FORMAT)
                : expires
            )
            ? status
            : LIST_STATUS_EXPIRED
          : status
      const formattedStatus = formatStudioStatus(_status)

      if (formattedStatus === LIST_STATUS_PROCESSING) return [...acc, id]

      return acc
    }, [])

    return {
      update: ids.length > 0,
      ids
    }
  }, [data])

  const fetchStudioList = useCallback(
    async (abortController) => {
      try {
        let data
        isFetchingRef.current = true
        if (idsData.update) {
          const response = await axios.get(
            `${API_ACCOUNT_URL}/api/users/analysis-history`,
            {
              signal: abortController?.signal,
              params: {
                page,
                service: ANALYSIS_HISTORY_SERVICE,
                status,
                start,
                end: localToServerTimeOffset(`${end} 23:59:59`),
                filters: FILTERS_COLUMN
              }
            }
          )
          data = response?.data
        }
        const result = data?.result
        const newLists = result?.data

        if (newLists) {
          setData((prevData) => {
            const prevLists = prevData.lists
            const nextLists = newLists.map((list) => {
              const prevList = prevLists.find((prev) => list.id === prev.id)
              return prevList
                ? list.status === prevList.status
                  ? prevList
                  : {
                      ...prevList,
                      ...list
                    }
                : list
            })
            return { ...prevData, lists: nextLists, total: result.total }
          })
          errorCountRef.current = 0
        }
        setFlag((f) => !f)
        isFetchingRef.current = false
      } catch (e) {
        if (axios.isCancel(e)) {
          setFlag((f) => !f)
        }

        if (errorCountRef.current < ERROR_RETRY_COUNT) {
          errorCountRef.current = ++errorCountRef.current
          setFlag((f) => !f)
          console.log(e)
        }

        isFetchingRef.current = false
      }
    },
    [page, status, start, end, setData, idsData]
  )

  const handleSentSSE = useCallback(async () => {
    if (!idsData.update) return
    try {
      isSteamingRef.current = true
      const idsQueryString = `?history_list=${idsData.ids.join(
        '&history_list='
      )}`
      sseSource.current = new EventSource(
        `${API_HULLABALLOO_URL}/api/v3/files/event${idsQueryString}`,
        {
          withCredentials: true
        }
      )

      sseSource.current.addEventListener('open', () => {
        errorCountRef.current = 0
      })

      sseSource.current.addEventListener('update', () => {
        abortRef.current = new AbortController()
        fetchStudioList(abortRef.current)
      })

      sseSource.current.addEventListener('finished', () => {
        sseSource.current.close()
      })

      sseSource.current.addEventListener('error', (e) => {
        isSteamingRef.current = false
        if (errorCountRef.current < ERROR_RETRY_COUNT) {
          errorCountRef.current = ++errorCountRef.current
          setFlag((f) => !f)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }, [idsData.update, idsData.ids, abortRef, fetchStudioList])

  useEffect(() => {
    if (!isSteamingRef.current && idsData.update && user) {
      handleSentSSE()
    }

    return () => {
      if (isSteamingRef.current) {
        isSteamingRef.current = false
        sseSource.current?.close()
      }

      if (isFetchingRef.current) {
        abortRef.current?.abort()
        abortRef.current = new AbortController()
        isFetchingRef.current = false
      }
    }
  }, [user, handleSentSSE, idsData, flag, abortRef])

  return {}
}

export default useUpdateStudioListStatusSSE
