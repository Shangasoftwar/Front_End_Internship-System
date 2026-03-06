import z from 'zod';
import { passwordValidationRules } from '@/helper/password-rules';

export const digit = z
   .string()
   .regex(/^\d*$/, { message: 'Please enter only numbers' })
   .min(10, "can't be less than 10 number")
   .max(13, "can't be more than 13 number");

export const passwordSchema = z
   .string()
   .min(8, 'Password must be at least 8 characters long')
   .regex(/\d/, 'Password must contain at least one digit.')
   .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
   .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
   .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character.');

const emailOrPhoneSchema = z.string().refine(
   (val) => {
      const isPhone = digit.safeParse(val).success;
      const isEmail = z.email().safeParse(val).success;
      return isEmail || isPhone;
   },
   {
      message: 'Please enter a valid email or phone number'
   }
);

export const FinalSignInSchema = z.object({
   emailOrPhone: emailOrPhoneSchema,
   otp: z.string().min(6),
   newPassword: passwordSchema,
   newPasswordConfirmation: z.string().min(8, "Pssword can't be less than 9 character"),
   password: z.string().min(8, "Password can't be less than 8 character")
});

export const SignInSchema = FinalSignInSchema.pick({
   password: true,
   emailOrPhone: true
});

export const ForgetPasswordSchema = FinalSignInSchema.pick({
   emailOrPhone: true
});

export const OtpSchema = FinalSignInSchema.pick({
   otp: true
});

export const ResetPasswordSchema = FinalSignInSchema.pick({
   newPassword: true,
   newPasswordConfirmation: true
}).refine((data) => data.newPassword === data.newPasswordConfirmation, {
   error: 'Passwords don’t match!!',
   path: ['passwordConfirmation']
});

export const SignUpSchema = z
   .object({
      phoneNumber: digit,
      email: z.email('Please enter an email'),
      password: z.string(),
      passwordConfirmation: z.string()
   })
   .superRefine((data, ctx) => {
      const { password, passwordConfirmation } = data;

      if (password) {
         const failedRules = passwordValidationRules
            .filter(({ test }) => !test(password))
            .map(({ message }) => message);

         if (failedRules.length > 0) {
            ctx.addIssue({
               code: z.ZodIssueCode.custom,
               path: ['password'],
               message: failedRules.join(', ')
            });
         }
      }

      if (passwordConfirmation && password !== passwordConfirmation) {
         ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['passwordConfirmation'],
            message: 'Passwords do not match!'
         });
      }
   });

export const CompleteProfileSchema = z.object({
   full_name: z
      .string()
      .regex(/^[a-zA-Z\s]+$/, 'Please enter a name')
      .min(1, 'Name is required'),
   phoneNumber: digit
});

export type OtpType = z.infer<typeof OtpSchema>;
export type SignInType = z.infer<typeof SignInSchema>;
export type SignUpType = z.infer<typeof SignUpSchema>;
export type BaseSignInType = z.infer<typeof FinalSignInSchema>;
export type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;
export type ForgetPasswordType = z.infer<typeof ForgetPasswordSchema>;
export type CompleteProfileType = z.infer<typeof CompleteProfileSchema>;
