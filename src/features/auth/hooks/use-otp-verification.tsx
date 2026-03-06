import { Toast } from '@/components/toast';
import { ResendOTP } from '../api/auth-api';
import { useEffect, useState } from 'react';
import { useAuth } from '@/provider/auth-provider';
import { useMutation } from '@tanstack/react-query';
import { AlertCircle } from 'lucide-react';
import { SuccessIcon } from '@/assets/icon/iconSuccess';
import type { OtpVerificationRequest } from '../types/auth-types';
import { useNavigate, type LinkProps } from '@tanstack/react-router';
//import type { AxiosError } from 'axios';

export function useOTPVerification(
   email: string,
   navigateTo: LinkProps['to'],
   flow: 'forget-password' | 'sign-up',
   redirectOnResend = false
) {
   const navigate = useNavigate();
   const [timeLeft, setTimeLeft] = useState(() => {
      const storedTime = localStorage.getItem('otpTimer');
      return storedTime ? Math.max(0, parseInt(storedTime)) : 60;
   });
   const { handleVerifyForgetPasswordOTP, handleVerifyRegisterOTP } = useAuth();

   useEffect(() => {
      localStorage.setItem('otpTimer', timeLeft.toString());
   }, [timeLeft]);

   useEffect(() => {
      if (timeLeft <= 0) {
         localStorage.removeItem('otpTimer');
         return;
      }

      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
   }, [timeLeft]);

   const verifyMutation = useMutation({
      mutationFn: (values: OtpVerificationRequest) =>
         flow === 'forget-password'
            ? handleVerifyForgetPasswordOTP({ email: values.email, otp: values.otp })
            : handleVerifyRegisterOTP({ email: values.email, otp: values.otp }),
      onError: () => {
        Toast({
              icon: <AlertCircle className="text-red-500" />,
              title: 'Failed',
              description: 'Please try again!'
                });
      },
      onSuccess: () => {
         Toast({
            icon: <SuccessIcon />,
            title: 'Authentication complete',
            description: 'You’ve successfully verified your identity'
         });
         navigate({ to: navigateTo });
      }
   });

   const resendMutation = useMutation({
      mutationFn: () => ResendOTP({ email }),
      onError: () => {
           Toast({
              icon: <AlertCircle className="text-red-500" />,
              title: 'Failed',
              description: 'Please try again!'
                });
      },
      onSuccess: () => {
         setTimeLeft(60);
         localStorage.setItem('otpTimer', '60');
         Toast({
            icon: <SuccessIcon />,
            title: 'Resend Requested',
            description: "You've requested a new code. Please wait before trying again"
         });

       if (redirectOnResend) {
  navigate({ to: navigateTo });
}
      }
   });

   return {
      timeLeft,
      setTimeLeft,
      verify: verifyMutation.mutate,
      resend: resendMutation.mutate,
      isVerifying: verifyMutation.isPending,
      isResending: resendMutation.isPending
   };
}
