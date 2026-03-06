import { Toast } from '@/components/toast';
import storageStore from '@/store/storage-store';
import axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

const instance = axios.create({ baseURL: import.meta.env.VITE_API_URL });

instance.interceptors.request.use(requestCallback, errorCallback);
instance.interceptors.response.use(responseCallback, errorCallback);

function requestCallback(config: InternalAxiosRequestConfig) {
   const token = storageStore.getToken();
   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.Accept = 'application/json';
   }
   return config;
}

function responseCallback(response: AxiosResponse) {
   return response.data;
}

function errorCallback(error: AxiosError) {
   if (!error.response) {
      Toast({
         title: 'Network Error',
         description: 'Please check your internet connection and try again.'
      });
      return Promise.reject(error);
   }

   const status = error.response.status;
   const currentPath = window.location.pathname;
   const isAuthPage =
      currentPath.includes('/auth/sign-in') || currentPath.includes('/auth/sign-up');

   if (status === 401 && !isAuthPage) {
      storageStore.clearStorage();
      window.location.href = '/auth/sign-in';
      return Promise.reject(error);
   }

   return Promise.reject(error);
}

export default instance;
