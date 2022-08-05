/*
 * @Author: 张洋
 * @Description: 请求文件  基于axios
 */
import axios from 'axios'
import qs from 'qs'

interface IResult {
  sucesss?: boolean
  errMsg?: string
  data: any
}

// 创建axios实例
const $axios = axios.create({
  baseURL: '/',
  timeout: 30000, // 30秒
  responseType: 'json'
})

// 响应拦截
$axios.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    // 网络错误
    return Promise.reject(error)
  }
)

export const get = (
  url: string,
  params?: { [key: string]: any },
  ...args: any[]
): Promise<IResult> =>
  new Promise((resolve, reject) => {
    $axios({
      method: 'GET',
      url,
      params,
      paramsSerializer(params) {
        return qs.stringify(params)
      },
      ...args
    })
      .then(result => {
        resolve(result)
      })
      .catch(error => {
        reject(error)
      })
  })

export const post = (
  url: string,
  params?: { [key: string]: any },
  ...args: any[]
): Promise<IResult> =>
  new Promise((resolve, reject) => {
    $axios({
      method: 'POST',
      url,
      data: qs.stringify(params),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      ...args
    })
      .then(result => {
        resolve(result)
      })
      .catch(error => {
        reject(error)
      })
  })

export const { put, patch, delete: del } = $axios

export default $axios
