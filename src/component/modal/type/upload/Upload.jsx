import React, {
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  useMemo,
  useState
} from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { uploadActions } from '../../../../_actions'
import {
  UPLOAD_MEDIA_TYPES,
  UPLOAD_STATUS,
  UPLOAD_ERROR_TYPE
} from '../../../../_constants'
import { getMediaInfo, generateRandomString } from '../../../../_helpers'
import getBlobDuration from 'get-blob-duration'
import { Container } from '../../component'
import { BeforeUpload, FileSelected, Error } from './component'
import clsx from 'clsx'
import './Upload.scss'

const MB = 1000 * 1000
const FILES_SIZE_LIMIT = 1024
const FILE_DURATION_LIMITATION = {
  FREE: 60 * 5,
  PREMIUM: 60 * 60 * 4
}
const ACCEPT_FILE_TYPE = '.mp3,.wav,.m4a,.mp4,.mov'
const RENDER_COMPONENT_TYPES = {
  BEFORE_UPLOAD: 'beforeUpload',
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

const Upload = ({
  isOpen,
  toggle: propsToggle,
  handleSelectFilesCallback,
  handleUploadClickCallback,
  handleClickCancelSubmitCallback,
  handleClickSubmitCallback,
  handleFormatErrorTracker,
  handleErrorCallback,
  outsideFiles,
  setOutsideFiles,
  ...remaining
}) => {
  const dispatch = useDispatch()
  const subscription = useSelector((state) => state.subscription, shallowEqual)
  const { insertFiles } = uploadActions
  const inputRef = useRef(null)
  const [errorDetail, setErrorDetail] = useState({ ...DEFAULT_ERROR_DETAIL })
  const [selectedFiles, setSelectedFiles] = useState([])
  const [invalidFiles, setInvalidFiles] = useState([])
  const [renderType, setRenderType] = useState(
    RENDER_COMPONENT_TYPES.BEFORE_UPLOAD
  )

  const isShowCloseIcon = useMemo(
    () =>
      [
        RENDER_COMPONENT_TYPES.BEFORE_UPLOAD,
        RENDER_COMPONENT_TYPES.ERROR
      ].includes(renderType),
    [renderType]
  )

  const handleToggle = useCallback(() => {
    isShowCloseIcon && propsToggle()
  }, [isShowCloseIcon, propsToggle])

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
        setRenderType(RENDER_COMPONENT_TYPES.FILE_SELECTED)
      } catch (error) {
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
    if (!isOpen) return
    handleResetFiles()
    setRenderType(RENDER_COMPONENT_TYPES.BEFORE_UPLOAD)
  }, [handleResetFiles, isOpen])

  const handleUpload = useCallback(() => {
    dispatch(insertFiles(selectedFiles))
    propsToggle()
  }, [selectedFiles, dispatch, insertFiles, propsToggle])

  const handleUploadButtonClick = () => {
    inputRef.current.click()
  }

  const handleOutSideFiles = useCallback(() => {
    if (outsideFiles.length) {
      checkIsFilesValid(outsideFiles)
    }
  }, [outsideFiles, checkIsFilesValid])

  const handleChange = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedFiles([])
    setInvalidFiles([])
    checkIsFilesValid(e.target.files)
  }

  const render = useMemo(() => {
    switch (renderType) {
      case RENDER_COMPONENT_TYPES.FILE_SELECTED:
        return (
          <FileSelected
            {...{
              files: selectedFiles,
              invalidFiles,
              handleUploadClickCallback,
              handleOnClear: () => {
                handleResetFiles()
                setRenderType(RENDER_COMPONENT_TYPES.BEFORE_UPLOAD)
                if (outsideFiles.length) {
                  setOutsideFiles([])
                }
              },
              handleUpload
            }}
          />
        )
      case RENDER_COMPONENT_TYPES.ERROR:
        return (
          <Error
            {...{
              title: errorDetail.title,
              code: errorDetail.code,
              onClick: handleInit
            }}
          />
        )
      default:
        return (
          <BeforeUpload
            {...{
              onButtonClick: handleUploadButtonClick,
              handleReset: handleResetFiles,
              checkIsFilesValid,
              handleSelectFilesCallback
            }}
          />
        )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    errorDetail,
    renderType,
    handleUploadButtonClick,
    handleResetFiles,
    selectedFiles
  ])

  useEffect(() => {
    handleOutSideFiles()
  }, [handleOutSideFiles])

  useLayoutEffect(() => {
    return () => {
      setTimeout(() => {
        handleInit()
      }, 0)
    }
  }, [handleInit])

  return (
    <>
      <input
        type="file"
        ref={inputRef}
        onChange={handleChange}
        accept={ACCEPT_FILE_TYPE}
        hidden
        multiple
      />
      <Container
        {...{
          isOpen,
          contentNode: render,
          className: clsx('hullaballoo-modal__upload', {
            'file-selected': renderType === RENDER_COMPONENT_TYPES.FILE_SELECTED
          }),
          isShowCloseIcon,
          toggle: handleToggle,
          ...remaining
        }}
      />
    </>
  )
}

export default Upload
