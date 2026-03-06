import instance from '@/plugins/axios.ts';
import type { AxiosRequestConfig } from 'axios';

export interface ApiResponse<T> {
   success: boolean;
   message: string;
   data: T;
}
export interface ApiError {
   success: boolean;
   message: string;
}

export interface MetaData {
   total: number;
   perPage: number;
   lastPage: number;
   currentPage: number;
}

export const $api = {
   get<TResponse>(path: string, config?: AxiosRequestConfig): Promise<ApiResponse<TResponse>> {
      return instance.get(path, config);
   },


   post<PRequest, TResponse = null>(
      path: string,
      data?: PRequest,
      config?: AxiosRequestConfig
   ): Promise<ApiResponse<TResponse>> {
      return instance.post(path, data, config);
   },

   patch<PRequest, TResponse = null>(
      path: string,
      data?: PRequest,
      config?: AxiosRequestConfig
   ): Promise<ApiResponse<TResponse>> {
      return instance.patch(path, data, config);
   },

   put<PRequest, TResponse = null>(
      path: string,
      data?: PRequest,
      config?: AxiosRequestConfig
   ): Promise<ApiResponse<TResponse>> {
      return instance.put(path, data, config);
   },

   delete<TResponse>(path: string, config?: AxiosRequestConfig): Promise<ApiResponse<TResponse>> {
      return instance.delete(path, config);
   }
};
