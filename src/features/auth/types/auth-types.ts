export type Role = 'guest' | 'hr' | 'sp' | 'software_sp' | 'intern';

export type User = {
   id: number;
   role: Role;
   name: string;
   email: string;
   status: string;
   avatar: string | null;
   firstLogin: boolean;
   hasActiveForm: boolean;
   phoneNumber: string;
   verified: boolean;
   oAuth: boolean;
};

export type LoginRequest = {
   email: string;
   password: string;
};

export type LoginResponse = {
   user: User;
   token: string;
};

export type SignupRequest = {
   email: string;
   phoneNumber: string;
   password: string;
   passwordConfirmation: string;
};

export type PasswordResetRequest = {
   email: string;
};

export type PasswordResetUpdate = {
   newPassword: string;
   newPasswordConfirmation: string;
};

export type OtpResendRequest = {
   email: string;
};

export type OtpVerificationRequest = {
   otp: string;
   email: string;
};
export type CompleteProfileRequest = {
   name: string;
   phoneNumber: string;
};

export type OAuthRequest = {
   accessToken: string;
};
