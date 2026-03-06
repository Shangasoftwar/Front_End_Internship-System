import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Toast } from '@/components/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { SuccessIcon } from '@/assets/icon/iconSuccess';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import CustomButton from '@/components/ui/customs/custom-button';
import { FormCardProvider } from '@/components/form/form-card-provider';
import { CustomPasswordInput } from '@/components/form/custom-form-fields';
import { PasswordRules } from '@/features/auth/components/customs/password-rules.tsx';
import { ResetPasswordSchema, type ResetPasswordType } from '@/features/auth/schemas/auth-schema';
import { ResetPassword } from '@/features/auth/api/auth-api';  
import { useMutation } from '@tanstack/react-query';
export const Route = createFileRoute('/(auth)/_layout/auth/reset-password')({
   component: RouteComponent
});

function RouteComponent() {
   const navigate = useNavigate();
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const form = useForm<ResetPasswordType>({
      resolver: zodResolver(ResetPasswordSchema),
      mode: 'onChange',
      defaultValues: {
         newPassword: '',
         newPasswordConfirmation: ''
      }
   });

   const currentPassword = form.watch('newPassword');
   const passwordOnClick = () => setShowPassword((prev) => !prev);
   const confirmPasswordOnClick = () => setShowConfirmPassword((prev) => !prev);

   const { mutate, isPending } = useMutation({
      mutationFn: (data: ResetPasswordType) => ResetPassword(data),
      onSuccess: () => {
         Toast({
            icon: <SuccessIcon />,
            title: 'Password updated',
            description: 'Your password reseted successfully'
         });
         navigate({ to: '/auth/sign-in' });
      }
   });

   const handleSubmit = (values: ResetPasswordType) => {
      mutate({
         newPassword: values.newPassword,
         newPasswordConfirmation: values.newPasswordConfirmation
      });
   };

   const cardTitle = (
      <div className="flex flex-col space-y-5 mt-10">
         <h2 className="text-md font-semibold text-center text-card-title">Reset your password</h2>
         <p className="text-xs font-normal text-card-description leading-[20px]">
            Please enter a new password for your account
         </p>
      </div>
   );

   return (
      <FormCardProvider<ResetPasswordType>
         form={form}
         title={cardTitle}
         onSubmit={handleSubmit}
         contianerClassName="flex-col"
         cardContentClassName="w-full max-w-[343px]"
      >
         <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-4">
               <CustomPasswordInput
                  form={form}
                  name="newPassword"
                  label="Reset password"
                  showPassword={showPassword}
                  toggleShowPassword={passwordOnClick}
                  placeholder="Enter new password"
               />
               <CustomPasswordInput
                  form={form}
                  name="newPasswordConfirmation"
                  label="Confirm password"
                  showPassword={showConfirmPassword}
                  toggleShowPassword={confirmPasswordOnClick}
                  placeholder="Re-enter new password"
               />
            </div>
            <div className="flex flex-col gap-3 my-6 mb-8">
               <PasswordRules
                  rule="length"
                  password={currentPassword}
                  title="Minimum 8 characters"
               />
               <PasswordRules password={currentPassword} rule="number" title="Number" />
               <PasswordRules rule="uppercase" title="Use uppercase" password={currentPassword} />
               <PasswordRules rule="lowercase" title="Use lowercase" password={currentPassword} />
               <PasswordRules password={currentPassword} rule="special" title="Special Character" />
            </div>
            <div className="space-y-4">
               <CustomButton
                  type="submit"
                  text="Reset"
                  theme={form.formState.isValid ? 'primary' : 'secondary'}
                  pending={isPending}
                  disabled={!form.formState.isValid || isPending}
                  className="hover:cursor-pointer disabled:opacity-100 font-semibold"
               />
            </div>
         </div>
      </FormCardProvider>
   );
}
