import { $api } from '@/api/api-services';
import type {
   OAuthRequest,
   SignupRequest,
   LoginResponse,
   OtpResendRequest,
   PasswordResetUpdate,
   PasswordResetRequest,
   OtpVerificationRequest,
   CompleteProfileRequest,
   LoginRequest,
   User
} from '../types/auth-types';
import type { CompleteProfileType, ForgetPasswordType, SignUpType } from '../schemas/auth-schema';

export async function forgetPasswordOTP({ emailOrPhone }: ForgetPasswordType) {
   const response = await $api.post<PasswordResetRequest>('auth/password-reset/request-otp', {
      email: emailOrPhone
   });

   return response;
}

export async function Login({ email, password }: LoginRequest) {
   const response = await $api.post<LoginRequest, LoginResponse>('auth/login', {
      email: email,
      password: password
   });
   return response;
}
export async function SignUp({ email, phoneNumber, password, passwordConfirmation }: SignUpType) {
   const response = await $api.post<SignupRequest>('auth/register', {
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      passwordConfirmation: passwordConfirmation
   });
   return response;
}

export async function VerifyForgetPasswordOTP({ otp, email }: OtpVerificationRequest) {
   const response = await $api.post<OtpVerificationRequest, LoginResponse>(
      'auth/password-reset/verify-otp',
      {
         email,
         otp
      }
   );

   return response;
}
export async function VerifyRegisterOTP({ otp, email }: OtpVerificationRequest) {
   const response = await $api.post<OtpVerificationRequest, LoginResponse>('auth/otp/verify', {
      email,
      otp
   });

   return response;
}

export async function CompleteProfile({ full_name, phoneNumber }: CompleteProfileType) {
   const response = await $api.post<CompleteProfileRequest, User>('auth/complete-profile', {
      name: full_name,
      phoneNumber: phoneNumber
   });
   return response;
}

export async function ResetPassword({ newPassword, newPasswordConfirmation }: PasswordResetUpdate) {
   const response = await $api.post<PasswordResetUpdate>('auth/password-reset/update', {
      newPassword,
      newPasswordConfirmation
   });

   return response;
}

export async function OAuth({ accessToken }: OAuthRequest) {
   const response = await $api.post<OAuthRequest, LoginResponse>('auth/google/callback', {
      accessToken
   });

   return response;
}
export async function ResendOTP({ email }: OtpResendRequest) {
   const response = await $api.post<OtpResendRequest>('auth/otp/send', {
      email
   });

   return response;
}

export async function Logout() {
   const response = await $api.post('auth/logout');

   return response;
}
