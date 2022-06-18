import axios, { AxiosRequestConfig, AxiosError } from 'axios';

type RequestUrl = string;

const codeMessage: { [index: number]: string } = {
  100: 'success',
};

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTgzOTIwMzAsInVzZXJJZCI6IjEwMDIifQ.ZPjINDYnjLc9cglacSh_qxEWDcvUdMW2xg8REpLA6QQ'

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:3000';
}
if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://data.reachplatform.org';
}


axios.defaults.withCredentials = true;
axios.defaults.headers.common['token'] = token;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.timeout = 10000;
// axios.defaults.headers['Access-Control-Allow-Origin'] = '*'
export const request = async (url: RequestUrl, options: AxiosRequestConfig) => {
  try {
    const response: any = await axios({ ...options, url });
    if (response?.status === 200) {
      return response.data
    }
  } catch (err: any) {
    misManage(err);
    throw err;
  }
}

export const misManage = (error: AxiosError) => {
  const response = error.response;
  const config = error.config;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status } = response;
    const { url } = config;
    console.log(`error ${status}: ${url}`, errorText)
  } else if (!response) {
    console.log('network error')
  }
}
