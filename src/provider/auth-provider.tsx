import { type ApiResponse } from '@/api/api-services';
import storageStore from '@/store/storage-store';
import { createContext, useContext, useState, type ReactNode } from 'react';

import type {
   LoginRequest,
   LoginResponse,
   OtpVerificationRequest,
   User
} from '@/features/auth/types/auth-types.ts';
import {
   Login,
   Logout,
   OAuth,
   VerifyForgetPasswordOTP,
   VerifyRegisterOTP
} from '@/features/auth/api/auth-api';

type AuthContextType = {
   currentUser: User | null;
   handleLogout: () => Promise<void>;
   setCurrentUser: (user: User | null) => void;
   handleLogin: (credentials: LoginRequest) => Promise<ApiResponse<LoginResponse>>;
   handleOAuthLogin: (accessToken: string) => Promise<ApiResponse<LoginResponse>>;
   handleVerifyForgetPasswordOTP: ({
      otp,
      email
   }: OtpVerificationRequest) => Promise<ApiResponse<LoginResponse>>;
   handleVerifyRegisterOTP: ({
      otp,
      email
   }: OtpVerificationRequest) => Promise<ApiResponse<LoginResponse>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
   children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
   const [currentUser, setCurrentUser] = useState<User | null>(() => {
      const token = storageStore.getToken();
      const user = localStorage.getItem('user');

      if (token && user) {
         try {
            return JSON.parse(user);
         } catch {
            storageStore.destroyToken();
            localStorage.removeItem('user');
            return null;
         }
      }
      return null;
   });

   async function handleLogin({ email, password }: LoginRequest) {
      const response = await Login({
         email,
         password
      });

      setCurrentUser(response.data?.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      storageStore.setToken(response.data.token);

      return response;
   }

   async function handleOAuthLogin(accessToken: string) {
      const response = await OAuth({ accessToken });

      setCurrentUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      storageStore.setToken(response.data.token);

      return response;
   }

   async function handleVerifyForgetPasswordOTP({ otp, email }: OtpVerificationRequest) {
      const response = await VerifyForgetPasswordOTP({ otp, email });

      setCurrentUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      storageStore.setToken(response.data.token);
      return response;
   }

   async function handleVerifyRegisterOTP({ otp, email }: OtpVerificationRequest) {
      const response = await VerifyRegisterOTP({ otp, email });

      setCurrentUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      storageStore.setToken(response.data.token);
      return response;
   }

   async function handleLogout() {
      await Logout();
      setCurrentUser(null);
      localStorage.removeItem('user');
      storageStore.destroyToken();
   }

   return (
      <AuthContext.Provider
         value={{
            currentUser,
            setCurrentUser,
            handleLogin,
            handleLogout,
            handleOAuthLogin,
            handleVerifyForgetPasswordOTP,
            handleVerifyRegisterOTP
         }}
      >
         {children}
      </AuthContext.Provider>
   );
}

export function useAuth() {
   const context = useContext(AuthContext);
   if (context === undefined) {
      throw new Error('useAuth must be used inside of a AuthProvider');
   }

   return context;
}