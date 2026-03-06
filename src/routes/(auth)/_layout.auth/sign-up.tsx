import { useState } from 'react';
import type { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { Toast } from '@/components/toast';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@/components/ui/separator';
import { SignUp } from '@/features/auth/api/auth-api';
import { AlertCircle } from 'lucide-react';
import { FormCardProvider } from '@/components/form/form-card-provider';
import { createFileRoute,  useNavigate } from '@tanstack/react-router';
import CustomButton from '@/components/ui/customs/custom-button';
import GoogleButton from '@/features/auth/components/customs/custom-google-button';
import { SignUpSchema, type SignUpType } from '@/features/auth/schemas/auth-schema';
import { CustomInputField, CustomPasswordInput } from '@/components/form/custom-form-fields';
import RememberAndAgree from '@/features/auth/components/customs/custom-rememberme-agree-terms';
export const Route = createFileRoute('/(auth)/_layout/auth/sign-up')({
    component: RouteComponent
});

function RouteComponent() {
    const navigate = useNavigate();

    const form = useForm<SignUpType>({
        resolver: zodResolver(SignUpSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
            phoneNumber: '',
            passwordConfirmation: ''
        }
    });

    const { errors } = form.formState;
    const [checked, setChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const passwordError = errors.password?.message;
    const confirmPasswordError = errors.passwordConfirmation?.message;

    const combinedPasswordErrors = [passwordError, confirmPasswordError].filter(Boolean).join(', ');

    const passwordOnClick = () => setShowPassword((prev) => !prev);
    const confirmPasswordOnClick = () => setShowConfirmPassword((prev) => !prev);
    const checkedClick = () => setChecked((prev) => !prev);

    const { mutate, isPending } = useMutation({
        mutationFn: (data: SignUpType) => SignUp(data),
        onSuccess: () => {
            navigate({
               // to: '/auth/otp-page',
                //search: { email: form.getValues('email'), flow: 'sign-up' }
            });
        },
        onError: (error: AxiosError) => {
            if (error.status === 403) {
                navigate({
                    //to: '/auth/resend-otp-page',
                    //search: { email: form.getValues('email') }
                });
            } else {
               Toast({
              icon: <AlertCircle className="text-red-500" />,
              title: 'Failed',
              description: 'Please try again!'
                });
            }
        }
    });

    const handleSubmit = (values: SignUpType) => {
        mutate(values);
    };

    const cardtTitle = (
        <div className="flex flex-col items-center justify-center gap-2 mt-4">
            <h1 className="text-lg font-bold text-center text-primary-500 mb-4">Welcome!</h1>
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
                    showMessage
                    type="email"
                    name="email"
                    label="Email address "
                    placeholder="Enter your email "
                />
                <CustomInputField
                    form={form}
                    showMessage
                    type="text"
                    name="phoneNumber"
                    label="Phone number"
                    placeholder="Enter your phone"
                />
                <CustomPasswordInput
                    form={form}
                    name="password"
                    label="Password"
                    showPassword={showPassword}
                    toggleShowPassword={passwordOnClick}
                    placeholder="Enter your password"
                />
                <CustomPasswordInput
                    form={form}
                    name="passwordConfirmation"
                    showMessage={!!combinedPasswordErrors}
                    label="Confirm password"
                    errorMessage={combinedPasswordErrors}
                    showPassword={showConfirmPassword}
                    toggleShowPassword={confirmPasswordOnClick}
                    placeholder="Re-enter new password"
                />
                <RememberAndAgree
                    to="/" 
                    check={checked}
                    text="I agree to"
                    onClick={checkedClick}
                    button="Terms & Conditions"
                    divClassName={'flex gap-2 items-center text-sm my-2'}
                    checkboxClassName={
                        'w-3.5 h-3.5 border-gray-200 rounded-xs bg-white  data-[state=checked]:bg-white data-[state=checked]:text-primary-700 data-[state=checked]:border-custom-gray hover:cursor-pointer'
                    }
                />
            </div>
            <div className="space-y-4">
                {form.formState.isValid && checked ? (
                    <CustomButton
                        type="submit"
                        text="Sign up"
                        theme="primary"
                        pending={isPending}
                        className="text-gray-700 hover:text-gray-100 hover:cursor-pointer"
                    />
                ) : (
                    <CustomButton
                        disabled
                        type="submit"
                        text="Sign up"
                        theme="secondary"
                        className=" disabled:opacity-100 font-semibold"
                    />
                )}
            </div>
            <div className="flex items-center w-full">
                <Separator className="flex-1" />
                <span className="text-gray-400 text-sm px-1">or</span>
                <Separator className="flex-1" />
            </div>
            <GoogleButton text="Sign up with Google" />
            <div className="flex items-center justify-center gap-2">
                <p className="text-center text-sm text-gray-600 ">Already have an account?</p>
                {/* <Link
                   // to="/auth/sign-in"
                   /// className="text-primary-400 text-xs underline underline-offset-4"
                >
                    Sign In
                </Link> */}
            </div>
        </div>
    );

    return (
        <FormCardProvider
            form={form}
            onSubmit={handleSubmit}
            title={cardtTitle}
            contianerClassName="flex-col"
            cardContentClassName="w-full max-w-[350px]"
        >
            {cardContent}
        </FormCardProvider>
    );
}
