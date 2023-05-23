import {
  API_HULLABALLOO_URL,
  API_RESPONSE_STATUS,
  UPLOAD_CLIENT_KEY
} from '../../_constants'
import { axios } from '../../_services'
import axiosOriginal from 'axios'
import { getFileSHA256ChecksumHash } from '../../_helpers'

const AWS_ACCESS_CONTROL_KEY = 'bucket-owner-full-control'

const handleUploadFileToCloudFront = async ({
  filename,
  file,
  duration,
  orig_name,
  coin,
  upload_signed_url,
  task_id,
  abort
}) => {
  const sha256 = await getFileSHA256ChecksumHash(file)
  try {
    if (!upload_signed_url) {
      throw new Error('upload_signed_url is required')
    }

    await axiosOriginal({
      method: 'put',
      url: upload_signed_url,
      data: file,
      headers: {
        'Content-Type': 'binary/octet-stream',
        'x-amz-content-sha256': sha256,
        'x-amz-meta-duration': duration,
        'x-amz-meta-orig_name': orig_name,
        ...(coin ? { 'x-amz-meta-coin': coin } : {}),
        'x-amz-acl': AWS_ACCESS_CONTROL_KEY
      },
      ...(abort ? { signal: abort.signal } : {})
    })

    return Promise.resolve({
      filename: filename,
      success_file: {
        ...(coin ? { ...coin } : {}),
        ...(task_id ? { task_id } : {}),
        duration,
        filename: file.name
      }
    })
  } catch (error) {
    return Promise.resolve({
      filename: filename,
      failure_file: {
        ...(coin ? { ...coin } : {}),
        duration,
        filename: file.name
      }
    })
  }
}

export const uploadFileV1API = async (selectedFiles) => {
  const formData = new FormData()
  for (let i = 0; i < selectedFiles.length; i++) {
    formData.append('audio_file', selectedFiles[i])
  }

  const {
    data: { result }
  } = await axios.post(`${API_HULLABALLOO_URL}/api/files`, formData, {
    params: { mode: 's3' }
  })

  return result
}

export const uploadFileV3API = async (selectedFiles) => {
  const {
    data: { result: lists }
  } = await axios.post(
    `${API_HULLABALLOO_URL}/api/v3/files`,
    selectedFiles.map((selected) => ({
      filename: selected.filename.replaceAll('  ', '_'),
      duration: selected.duration
    }))
  )

  const errorCodeExistObject = lists.find((item) => item.error_code !== null)

  if (errorCodeExistObject) {
    return Promise.reject({
      response: {
        data: {
          error: {
            code: errorCodeExistObject.error_code
          }
        }
      }
    })
  }

  const uploaded = await Promise.all(
    lists.map(async (item, index) => {
      return await handleUploadFileToCloudFront({
        filename: item.filename,
        file: selectedFiles[index].file,
        duration: item.duration,
        orig_name: item.filename_byte_code,
        coin: item.coin,
        upload_signed_url: item.upload_signed_url
      })
    })
  )

  return uploaded.reduce(
    (acc, cur) => ({
      filename: cur.hasOwnProperty('success_file')
        ? [...acc.filename, cur.filename]
        : acc.filename,
      success_file: cur.success_file
        ? [...acc.success_file, cur.success_file]
        : acc.success_file,
      failure_file: cur.failure_file
        ? [...acc.failure_file, cur.failure_file]
        : acc.failure_file,
      total_coin: cur.hasOwnProperty('success_file')
        ? acc.total_coin + cur.success_file.coin
        : acc.total_coin
    }),
    {
      filename: [],
      success_file: [],
      failure_file: [],
      total_coin: 0
    }
  )
}

export const uploadFileV4API = async (data, abort) => {
  try {
    const {
      data: { result, status }
    } = await axios.post(
      `${API_HULLABALLOO_URL}/api/v4/files`,
      {
        filename: data.filename.replaceAll('  ', '_'),
        duration: data.duration,
        client: UPLOAD_CLIENT_KEY
      },
      {
        ...(abort ? { signal: abort.signal } : {})
      }
    )

    if (status === API_RESPONSE_STATUS.SUCCESS) {
      const uploaded = await handleUploadFileToCloudFront({
        filename: result.filename,
        file: data.file,
        duration: result.duration,
        orig_name: result.filename_byte_code,
        upload_signed_url: result.upload_signed_url,
        task_id: result.task_id,
        abort
      })
      return uploaded
    }
  } catch (error) {
    return Promise.reject(error)
  }
}
