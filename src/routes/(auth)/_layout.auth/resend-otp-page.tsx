import z from 'zod';
import { createFileRoute } from '@tanstack/react-router';
import CustomButton from '@/components/ui/customs/custom-button';
import ResendOTPImg from '@/assets/images/verifyEmail.svg';
import { useOTPVerification } from '@/features/auth/hooks/use-otp-verification';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const resendSearchSchem = z.object({
   email: z.email()
});

export const Route = createFileRoute('/(auth)/_layout/auth/resend-otp-page')({
   component: RouteComponent,
   validateSearch: resendSearchSchem
});

function RouteComponent() {
   const { email } = Route.useSearch();
   const { resend, isResending } = useOTPVerification(email, '/auth/otp-page', 'sign-up', true);

   return (
      <div className={'h-full w-full flex items-center justify-center'}>
         <Card
            className={
               'flex flex-col border-none shadow-none items-center justify-center w-full max-w-[500px] min-h-auth-card my-5 bg-card rounded-2xl md:-m-5'
            }
         >
            <CardHeader className="w-full flex flex-col items-center justify-center text-center">
               <ResendOTPImg />
               <CardTitle className="text-md text-gray-600 mt-2">
                  Verify your emaill address
               </CardTitle>
               <CardDescription className="text-xs">
                  You’ve entered <b>{email}</b> as the email address for your account.
               </CardDescription>
               <CardDescription className="text-xs">
                  Please verify this email address by clicking button below.
               </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
               <CustomButton
                  text="Verify your email"
                  theme="primary"
                  className="max-w-80 py-5 bg-primary-500"
                  pending={isResending}
                  onClick={() => resend()}
               />
            </CardContent>
         </Card>
      </div>
   );
}
