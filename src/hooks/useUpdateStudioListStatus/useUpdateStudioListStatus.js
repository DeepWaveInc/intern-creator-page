import { useCallback, useEffect, useState, useMemo, useRef } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import {
  formatStudioStatus,
  localToServerTimeOffset,
  dayjs
} from '../../_helpers'
import {
  API_ACCOUNT_URL,
  ANALYSIS_HISTORY_SERVICE,
  LIST_STATUS_FINISHED,
  LIST_STATUS_EXPIRED,
  LIST_STATUS_PROCESSING,
  LIST_STATUS_SUCCESS,
  PAGE_LIFECYCLE,
  ERROR_RETRY_COUNT,
  FILTERS_COLUMN,
  DEFAULT_DATE_TIME_FORMAT
} from '../../_constants'
import { axios } from '../../_services'
import { usePrevious } from '../../hooks'
import pageLifecycle from 'page-lifecycle/dist/lifecycle.es5.js'

const CALLING_TIME = 30000

const useUpdateStudioListStatus = ({
  page,
  status,
  start,
  end,
  setData,
  data,
  abortRef
}) => {
  const errorCountRef = useRef(0)
  const statusTimerRef = useRef(null)
  const isFetchingRef = useRef(false)
  const pagePrevState = usePrevious(pageLifecycle.state)
  const [flag, setFlag] = useState(false)
  const [pageCurrentState, setPageCurrentState] = useState(pageLifecycle.state)
  const user = useSelector((state) => state.authentication?.user, shallowEqual)

  const isListsNeedUpdate = useMemo(() => {
    const { lists } = data

    const result = lists.map((list) => {
      const { status, expires } = list
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

      if (formattedStatus === LIST_STATUS_PROCESSING) {
        return true
      }

      if (formattedStatus === LIST_STATUS_SUCCESS) {
        const tenMinutesBeforeExpires = dayjs(expires).subtract(5, 'minute')
        return dayjs().isAfter(tenMinutesBeforeExpires)
      }

      return false
    })

    return result.some((item) => item)
  }, [data])

  const fetchStudioList = useCallback(
    async (abortController) => {
      try {
        let data
        isFetchingRef.current = true
        if (isListsNeedUpdate) {
          const response = await axios.get(
            `${API_ACCOUNT_URL}/api/users/analysis-history`,
            {
              signal: abortController?.signal,
              params: {
                page,
                service: ANALYSIS_HISTORY_SERVICE,
                status,
                start,
                end,
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
    [page, status, start, end, setData, isListsNeedUpdate]
  )

  const handlePageLifecycleChange = useCallback(
    (abortRef) => {
      switch (true) {
        case pageCurrentState === PAGE_LIFECYCLE.ACTIVE: {
          statusTimerRef.current && clearTimeout(statusTimerRef.current)

          if (pagePrevState === PAGE_LIFECYCLE.HIDDEN) {
            if (!isFetchingRef.current) {
              abortRef.current = new AbortController()
              fetchStudioList(abortRef.current)
            }
          }

          statusTimerRef.current = setTimeout(() => {
            !isFetchingRef.current && fetchStudioList(abortRef.current)
          }, CALLING_TIME)
          break
        }

        case pageCurrentState === PAGE_LIFECYCLE.HIDDEN:
        case !pageCurrentState: {
          abortRef.current?.abort()
          abortRef.current = new AbortController()
          isFetchingRef.current = false
          statusTimerRef.current && clearTimeout(statusTimerRef.current)
          break
        }

        default:
          break
      }
    },
    [pageCurrentState, pagePrevState, fetchStudioList]
  )

  useEffect(() => {
    user && handlePageLifecycleChange(abortRef)
  }, [flag, user, handlePageLifecycleChange, abortRef])

  useEffect(() => {
    pageLifecycle.addEventListener('statechange', ({ newState }) => {
      setPageCurrentState(newState)
    })
  }, [])

  return {}
}

export default useUpdateStudioListStatus
