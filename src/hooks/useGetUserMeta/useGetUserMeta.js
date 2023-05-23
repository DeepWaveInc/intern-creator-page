import { useEffect, useRef, useCallback } from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { userMetaActions } from '../../_actions'
import { axios } from '../../_services'
import { API_ACCOUNT_URL, API_RESPONSE_STATUS } from '../../_constants'

const useGetUserMeta = () => {
  const isFetchingRef = useRef(false)
  const dispatch = useDispatch()
  const [user, meta] = useSelector(
    (state) => [state.authentication?.user, state.meta],
    shallowEqual
  )

  const handleFetchingMeta = useCallback(async () => {
    try {
      isFetchingRef.current = true
      const {
        data: { result, status }
      } = await axios.get(`${API_ACCOUNT_URL}/api/v1/user/me/meta`)

      if (status === API_RESPONSE_STATUS.SUCCESS) {
        dispatch(
          userMetaActions.update({
            ne_tutorial_schedule: result?.ne_tutorial_schedule,
            uuid: result?.uuid
          })
        )
      }
      isFetchingRef.current = false
    } catch (error) {
      isFetchingRef.current = false
    }
  }, [dispatch])

  useEffect(() => {
    if (user && !meta && !isFetchingRef.current) handleFetchingMeta()
  }, [user, handleFetchingMeta, meta])
}

export default useGetUserMeta
