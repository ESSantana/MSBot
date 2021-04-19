import axios, { AxiosInstance } from 'axios';
import { enviromentVariables as env } from '../enviromentVariables';

let _httpInstance: AxiosInstance;

export const getInstance = (baseUrl: string = ''): AxiosInstance => {

  if (!_httpInstance && baseUrl === '') {
    _httpInstance = axios.create({
      baseURL: env.twitch.base_url
    });
  } else if(baseUrl !== ''){
    _httpInstance = axios.create({
      baseURL: baseUrl
    });
  }

  return _httpInstance;
}