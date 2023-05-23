import React, {
  useRef,
  useCallback,
  useMemo,
  useState,
  useLayoutEffect
} from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useTranslation } from 'react-i18next'
import getBlobDuration from 'get-blob-duration'
import { getMediaInfo, generateRandomString } from '../../_helpers'
import { uploadActions } from '../../_actions'
import { ReactComponent as UploadImg } from '../../assets/image/icons/upload_icon.svg'
import { ReactComponent as AddImg } from '../../assets/image/icons/add_icon.svg'
import { Normal as Button } from '../button'
import Trans from '../trans'
import {
  UPLOAD_MEDIA_TYPES,
  UPLOAD_STATUS,
  UPLOAD_ERROR_TYPE,
  LIMIT_TIME
} from '../../_constants'
import { Container } from '../modal/component'
import { FileSelected, Error } from '../modal/type/upload/component'
import './UploadArea.scss'
import clsx from 'clsx'

const MB = 1000 * 1000
const FILES_SIZE_LIMIT = 1024
const FILE_DURATION_LIMITATION = {
  FREE: 60 * 5,
  PREMIUM: 60 * 60 * 4
}
const ACCEPT_FILE_TYPE = '.mp3,.wav,.m4a,.mp4,.mov'
const RENDER_COMPONENT_TYPES = {
  FILE_SELECTED: 'fileSelected',
  ERROR: 'error'
}

const MIME = [
  'audio/mpeg',
  'audio/wav',
  'audio/x-wav',
  'audio/x-m4a',
  'audio/wave',
  'audio/x-pn-wav',
  'audio/vnd.wave',
  'video/mp4',
  'video/quicktime'
]

const VIDEO_TYPES = ['video, m4a']

const DEFAULT_ERROR_DETAIL = {
  title: '',
  code: null
}

const LessThan = () => <span>{`<`}</span>

const UploadArea = ({
  handleSelectFilesCallback,
  handleUploadClickCallback,
  isShow = false
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { insertFiles } = uploadActions
  const subscription = useSelector((state) => state.subscription, shallowEqual)
  const [isModalOpen, setModalOpen] = useState(false)
  const inputRef = useRef(null)

  const [errorDetail, setErrorDetail] = useState({ ...DEFAULT_ERROR_DETAIL })
  const [selectedFiles, setSelectedFiles] = useState([])
  const [invalidFiles, setInvalidFiles] = useState([])
  const [renderType, setRenderType] = useState(
    RENDER_COMPONENT_TYPES.FILE_SELECTED
  )

  const modalClose = useCallback(() => {
    setModalOpen(false)
    setSelectedFiles([])
    setInvalidFiles([])
    inputRef.current.value = ''
    setRenderType(RENDER_COMPONENT_TYPES.FILE_SELECTED)
  }, [])

  const isShowCloseIcon = useMemo(
    () =>
      [
        RENDER_COMPONENT_TYPES.BEFORE_UPLOAD,
        RENDER_COMPONENT_TYPES.ERROR
      ].includes(renderType),
    [renderType]
  )

  const handleToggle = useCallback(() => {
    isShowCloseIcon && modalClose()
  }, [isShowCloseIcon, modalClose])

  const checkIsFilesValid = useCallback(
    async (files) => {
      try {
        const isSubscribed = subscription?.level > 0
        for (let i = 0; i < files.length; i++) {
          const isFileSizeValid = files[i].size / MB <= FILES_SIZE_LIMIT

          if (!MIME.includes(files[i].type) || !isFileSizeValid) {
            setInvalidFiles((invalidFiles) => {
              return {
                ...(isFileSizeValid
                  ? {
                      [UPLOAD_ERROR_TYPE.TYPE]: [
                        ...(invalidFiles[UPLOAD_ERROR_TYPE.TYPE]
                          ? invalidFiles[UPLOAD_ERROR_TYPE.TYPE]
                          : []),
                        files[i].name
                      ]
                    }
                  : {}),
                ...(!isFileSizeValid
                  ? {
                      [UPLOAD_ERROR_TYPE.SIZE]: [
                        ...(invalidFiles[UPLOAD_ERROR_TYPE.SIZE]
                          ? invalidFiles[UPLOAD_ERROR_TYPE.SIZE]
                          : []),
                        files[i].name
                      ]
                    }
                  : {})
              }
            })
          } else {
            const fileType = files[i].type

            if (VIDEO_TYPES.includes(fileType)) {
              const mediaInfo = await getMediaInfo(files[i])

              if (
                mediaInfo.duration >
                (isSubscribed
                  ? FILE_DURATION_LIMITATION.PREMIUM
                  : FILE_DURATION_LIMITATION.FREE)
              ) {
                setInvalidFiles((invalidFiles) => {
                  return {
                    [UPLOAD_ERROR_TYPE.DURATION]: [
                      ...(invalidFiles[UPLOAD_ERROR_TYPE.DURATION]
                        ? invalidFiles[UPLOAD_ERROR_TYPE.DURATION]
                        : []),
                      files[i].name
                    ]
                  }
                })
              } else {
                setSelectedFiles((selectedFiles) => [
                  ...selectedFiles,
                  {
                    file: files[i],
                    filename: files[i].name,
                    duration: mediaInfo.duration,
                    type: UPLOAD_MEDIA_TYPES.VIDEO,
                    status: UPLOAD_STATUS.IDLE,
                    id: generateRandomString(),
                    createTime: new Date().getTime(),
                    is_cancelable: true
                  }
                ])
              }
            } else {
              const blobUrl = URL.createObjectURL(files[i])
              const duration = await getBlobDuration(blobUrl)

              if (
                duration >
                (isSubscribed
                  ? FILE_DURATION_LIMITATION.PREMIUM
                  : FILE_DURATION_LIMITATION.FREE)
              ) {
                setInvalidFiles((invalidFiles) => {
                  return {
                    [UPLOAD_ERROR_TYPE.DURATION]: [
                      ...(invalidFiles[UPLOAD_ERROR_TYPE.DURATION]
                        ? invalidFiles[UPLOAD_ERROR_TYPE.DURATION]
                        : []),
                      files[i].name
                    ]
                  }
                })
              } else {
                setSelectedFiles((selectedFiles) => [
                  ...selectedFiles,
                  {
                    file: files[i],
                    filename: files[i].name,
                    duration,
                    type: UPLOAD_MEDIA_TYPES.AUDIO,
                    status: UPLOAD_STATUS.IDLE,
                    id: generateRandomString(),
                    createTime: new Date().getTime(),
                    is_cancelable: true
                  }
                ])
              }
            }
          }
        }
        setModalOpen(true)
        setRenderType(RENDER_COMPONENT_TYPES.FILE_SELECTED)
      } catch (error) {
        setModalOpen(true)
        setRenderType(RENDER_COMPONENT_TYPES.ERROR)
        setErrorDetail({
          title: error?.message ?? null,
          code: error?.code ?? null
        })
        console.log(error)
      }
    },
    [subscription?.level]
  )

  const handleResetFiles = useCallback(() => {
    inputRef.current.value = ''
    setSelectedFiles([])
    setInvalidFiles([])
    setErrorDetail({ ...DEFAULT_ERROR_DETAIL })
  }, [])

  const handleInit = useCallback(() => {
    if (!isModalOpen) return
    handleResetFiles()
    setRenderType(RENDER_COMPONENT_TYPES.FILE_SELECTED)
  }, [handleResetFiles, isModalOpen])

  const handleChange = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedFiles([])
    setInvalidFiles([])
    checkIsFilesValid(e.target.files)
  }

  const handleOnDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleOnDragIn = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleOnDragOut = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleOnDrop = (e) => {
    handleResetFiles()
    e.preventDefault()
    e.stopPropagation()
    typeof handleSelectFilesCallback === 'function' &&
      handleSelectFilesCallback()
    const files = e.dataTransfer.files
    checkIsFilesValid(files)
  }

  const handleUpload = useCallback(() => {
    dispatch(insertFiles(selectedFiles))
    modalClose()
  }, [selectedFiles, dispatch, insertFiles, modalClose])

  const render = useMemo(() => {
    switch (renderType) {
      case RENDER_COMPONENT_TYPES.ERROR:
        return (
          <Error
            {...{
              title: errorDetail.title,
              code: errorDetail.code,
              onClick: modalClose
            }}
          />
        )
      default:
        return (
          <FileSelected
            {...{
              files: selectedFiles,
              invalidFiles,
              handleUploadClickCallback,
              handleOnClear: modalClose,
              handleUpload
            }}
          />
        )
    }
  }, [
    invalidFiles,
    renderType,
    modalClose,
    selectedFiles,
    errorDetail.title,
    errorDetail.code,
    handleUploadClickCallback,
    handleUpload
  ])

  useLayoutEffect(() => {
    return () => {
      setTimeout(() => {
        handleInit()
      }, 0)
    }
  }, [handleInit])

  return (
    <>
      <Container
        {...{
          isOpen: isModalOpen,
          contentNode: render,
          className: clsx('hullaballoo-modal__upload', {
            'file-selected': renderType === RENDER_COMPONENT_TYPES.FILE_SELECTED
          }),
          isShowCloseIcon,
          toggle: handleToggle,
          onCloseIconClick: modalClose
        }}
      />
      <input
        type="file"
        ref={inputRef}
        onChange={handleChange}
        accept={ACCEPT_FILE_TYPE}
        hidden
        multiple
      />
      {isShow && (
        <div
          className={clsx('hullaballoo__upload-area')}
          onDragEnter={handleOnDragIn}
          onDragLeave={handleOnDragOut}
          onDragOver={handleOnDrag}
          onDrop={handleOnDrop}
        >
          <div className="hullaballoo__upload-area__before-upload">
            <UploadImg className="hullaballoo__upload-area__before-upload__img" />
            <Button
              type="blank"
              className="ga_btn_files"
              onClick={() => {
                typeof handleSelectFilesCallback === 'function' &&
                  handleSelectFilesCallback()
                inputRef.current.click()
              }}
            >
              <AddImg className="hullaballoo__upload-area__before-upload__add-icon" />
              <span>{t('common.browser_files')}</span>
            </Button>
            <h4>{t('modal.drag_file')}</h4>
            <span>
              <Trans
                i18nKey="modal.drag_file.info"
                values={{
                  limit_time:
                    subscription?.level > 0
                      ? `${LIMIT_TIME.PREMIUM} ${t('common.hours')}`
                      : `${LIMIT_TIME.FREE} ${t('common.minutes')}`
                }}
              >
                <br />
                <LessThan />
              </Trans>
            </span>
          </div>
        </div>
      )}
    </>
  )
}

export default UploadArea
