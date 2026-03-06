import { useState } from 'react';
import type { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { Toast } from '@/components/toast';
import { useAuth } from '@/provider/auth-provider';
import { useMutation } from '@tanstack/react-query';
import { AlertCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomButton from '@/components/ui/customs/custom-button';
import type { LoginRequest } from '@/features/auth/types/auth-types';
import { FormCardProvider } from '@/components/form/form-card-provider';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import GoogleButton from '@/features/auth/components/customs/custom-google-button';
import { SignInSchema, type SignInType } from '@/features/auth/schemas/auth-schema';
import { CustomInputField, CustomPasswordInput } from '@/components/form/custom-form-fields';
//import RememberAndAgree from '@/features/auth/components/customs/custom-rememberme-agree-terms';

export const Route = createFileRoute('/(auth)/_layout/auth/sign-in')({
   component: RouteComponent
});

function RouteComponent() {
   const { handleLogin } = useAuth();
   const navigate = useNavigate();
   const [showPassword, setShowPassword] = useState(false);
   const form = useForm<SignInType>({
      resolver: zodResolver(SignInSchema),
      mode: 'onChange',
      defaultValues: {
         password: '',
         emailOrPhone: ''
      }
   });

   function onShowPassword() {
      setShowPassword((prev) => !prev);
   }

   const { mutate, isPending } = useMutation({
      mutationFn: (data: LoginRequest) => handleLogin(data),
      onError: (error: AxiosError<{ message: string }>) => {
         // for those who review this case where the email exists but is not verified  --azhi

         if (error.status === 403) {
            navigate({
              // to: '/auth/resend-otp-page',
               //search: { email: form.getValues('emailOrPhone') }
            });
         } else {
             Toast({
              icon: <AlertCircle className="text-red-500" />,
              title: 'Failed',
              description: 'Please try again!'
                });
         }
      },
      onSuccess: (response) => {
         const userRole = response.data.user.role;

         if (userRole === 'guest' || userRole === 'intern') {
          //  navigate({ to: '/user-profile' });
         } else if (userRole === 'sp' || userRole === 'software_sp') {
           // navigate({ to: '/suprvisor-profile' });
         } else if (userRole === 'hr') {
           // navigate({ to: '/hr-profile' });
         } else {
          //  navigate({ to: '/unauthorized' });
         }
      }
   });

   const handleSubmit = async (values: SignInType) => {
      mutate({
         email: values.emailOrPhone,
         password: values.password
      });
   };

   const cardtTitle = (
      <div className="flex flex-col items-center justify-center gap-2 mt-4">
         <h1 className="text-lg font-bold text-center text-primary-500 mb-4 ">Welcome!</h1>
         <p className="text-sm font-normal text-center text-gray-600">
            We're glad you're here. Let's get you connected.
         </p>
      </div>
   );

   const cardContent = (
      <div className="flex flex-col space-y-4">
         <div className="flex flex-col space-y-4">
            <CustomInputField
               form={form}
               type="text"
               name="emailOrPhone"
               label="Email address or phone"
               placeholder="Enter your email or phone"
            />
            <CustomPasswordInput
               form={form}
               name="password"
               label="Password"
               showPassword={showPassword}
               toggleShowPassword={onShowPassword}
               placeholder="Enter your password"
            />
          {  /*<RememberAndAgree
              // to="/auth/forget-password"
               text="Remember me"
               onClick={undefined}
               button="Forgot password?"
               divClassName={'flex justify-between items-center text-sm my-2'}
               checkboxClassName={
                  'w-3.5 h-3.5 border-gray-200 rounded-xs bg-white  data-[state=checked]:bg-white data-[state=checked]:text-primary-700 data-[state=checked]:border-custom-gray hover:cursor-pointer'
               }
            />*/}
         </div>

         <div className="space-y-4">
            <CustomButton
               theme={form.formState.isValid ? 'primary' : 'secondary'}
               type="submit"
               text="Sign in"
               pending={isPending}
               disabled={!form.formState.isValid || isPending}
               className="text-gray-600 hover:text-gray-100 disabled:opacity-90 font-semibold"
            />
         </div>

         <div className="flex items-center w-full">
            <Separator className="flex-1" />
            <span className="text-gray-500 text-sm px-1">or</span>
            <Separator className="flex-1" />
         </div>
         <GoogleButton text="Sign in with Google" />
         <div className="flex items-center justify-center gap-2">
            <p className="text-center text-sm text-gray-600 ">Don't have an account?</p>
            <Link
               to="/auth/sign-up"
               className="text-primary-400 text-xs underline underline-offset-4"
            >
               Sign up
            </Link>
         </div>
      </div>
   );

   return (
      <FormCardProvider
         form={form}
         title={cardtTitle}
         onSubmit={handleSubmit}
         contianerClassName="flex-col"
         cardContentClassName="w-full max-w-[336px] "
      >
         {cardContent}
      </FormCardProvider>
   );
}
