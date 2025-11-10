import axios, { AxiosError, AxiosRequestConfig } from 'axios';

class APIService {
  private static instance: APIService;
  private api = axios.create();

  private constructor() {
    this.setupInterceptors();
  }

  public static getInstance(): APIService {
    if (!APIService.instance) {
      APIService.instance = new APIService();
    }
    return APIService.instance;
  }

  private setupInterceptors() {
    this.api.interceptors.request.use((config) => {
      config.baseURL = process.env.EXPO_PUBLIC_PHONE_API_URL;

      if (__DEV__) {
        console.log(`{ URL DA REQUEST: ${config.baseURL}/${config.url} }`);
      }

      return config;
    }, (error: AxiosError) => {
      if (__DEV__) {
        console.log('Error: ', error);
      }
      
      return Promise.reject(error);
    });
  } 

  public async get<T>(url: string, config?: AxiosRequestConfig) {
    return this.api.get<T>(url, config);
  }
}

export const apiService = APIService.getInstance();