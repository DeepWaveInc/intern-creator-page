import React, { useCallback, useState, useMemo } from 'react'
import { Container } from '../../component'
import { useDispatch } from 'react-redux'
import { notifyActions } from '../../../../_actions'
import { useTranslation } from 'react-i18next'
import { Normal as Button } from '../../../button'
import { Normal as Input } from '../../../input'
import { SingleDropdown } from '../../../dropdown'
import { NOTIFY_COMPONENT_CONFIG } from '../../../../_constants'
import './ShareLink.scss'

const SHARE_STATUS = {
  PUBLIC: '1',
  PRIVATE: '0'
}
const DEFAULT_SHARE_STATUS = SHARE_STATUS.PRIVATE

const ContentNode = ({ link, is_public, setLoading, handleOnChangePublic }) => {
  const { t } = useTranslation()
  const [currentShareStatus, setCurrentShareStatus] = useState(
    is_public
      ? SHARE_STATUS.PUBLIC
      : SHARE_STATUS.PRIVATE || DEFAULT_SHARE_STATUS
  )

  const handleChange = useCallback(
    async (e) => {
      setLoading(true)
      await handleOnChangePublic(e === SHARE_STATUS.PUBLIC)
      setCurrentShareStatus(e)
      setLoading(false)
    },
    [handleOnChangePublic, setLoading]
  )

  const options = useMemo(
    () => [
      {
        value: SHARE_STATUS.PUBLIC,
        label: t('share.public')
      },
      {
        value: SHARE_STATUS.PRIVATE,
        label: t('share.private')
      }
    ],
    [t]
  )

  return (
    <>
      <div className="hullaballoo-modal__share-link__content__status-container">
        <span>{t('share.status_of_this_link')}</span>
        <SingleDropdown
          onChange={handleChange}
          options={options}
          defaultValue={currentShareStatus}
          textStyle={true}
          className="hullaballoo-modal__share-link__content__status-dropdown"
        />
      </div>
      <Input value={link} disabled />
    </>
  )
}

const ShareLink = ({
  is_public,
  id,
  filename,
  link,
  onOkClick,
  handleOnChangePublic,
  ...props
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(false)

  const handleCopyLink = useCallback(() => {
    typeof onOkClick === 'function' && onOkClick()
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link).then(
        () => {
          dispatch(
            notifyActions.update({
              type: NOTIFY_COMPONENT_CONFIG.TYPE_SUCCESS,
              message: t('share.copy_link.successfully', { filename }),
              autoHidePeriod: NOTIFY_COMPONENT_CONFIG.AUTO_HIDE_PERIOD
            })
          )
        },
        (err) => {
          dispatch(
            notifyActions.update({
              type: NOTIFY_COMPONENT_CONFIG.TYPE_ERROR,
              message: t('share.copy_link.failed'),
              autoHidePeriod: NOTIFY_COMPONENT_CONFIG.AUTO_HIDE_PERIOD
            })
          )
          console.log(err)
        }
      )
    }
  }, [onOkClick, link, dispatch, t, filename])

  return (
    <Container
      {...{
        titleNode: t('modal.share_link.title'),
        contentNode: (
          <ContentNode
            {...{ link, id, is_public, setLoading, handleOnChangePublic }}
          />
        ),
        className: 'hullaballoo-modal__share-link',
        actionsNode: [
          <Button
            type="primary"
            size="lg"
            key="copy_link"
            onClick={handleCopyLink}
          >
            <span>{t('common.copy_link')}</span>
          </Button>
        ],
        isLoading,
        ...props
      }}
    />
  )
}
export default ShareLink
