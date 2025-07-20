import axios, { Axios, AxiosRequestConfig } from 'axios';

const addErrorLog = (errorInfo: unknown) => {};

class HttpRequest {
  baseUrl: string;
  queue: object;
  constructor(baseUrl = '/') {
    this.baseUrl = baseUrl;
    this.queue = {};
  }

  getInsideConfig() {
    return {
      baseURL: this.baseUrl,
      headers: {},
    };
  }

  destroy(url: string) {
    delete this.queue[url];
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }

  interceptors(instance: Axios, url: string) {
    // 请求拦截
    instance.interceptors.request.use(
      (config) => {
        // if (!Object.keys(this.queue).length) {
        // }
        this.queue[url] = true;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截
    instance.interceptors.response.use(
      (res) => {
        this.destroy(url);
        return Promise.resolve(res);
      },
      (error) => {
        this.destroy(url);
        const errorInfo = error.response;
        addErrorLog(errorInfo);
        return Promise.reject(error);
      }
    );
  }

  request(options: AxiosRequestConfig) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance, options.url!);
    return instance(options);
  }
}

export default HttpRequest;

const http = new HttpRequest();

export const request = http.request.bind(http);

export const get = async (
  url: string,
  params: Record<string, unknown>,
  data?: Record<string, unknown>
) => {
  return request({
    method: 'get',
    url,
    params,
    data,
  });
};

export const post = async (
  url: string,
  data: Record<string, unknown>,
  params?: Record<string, unknown>
) => {
  return request({
    method: 'post',
    url,
    data,
    params,
  });
};
