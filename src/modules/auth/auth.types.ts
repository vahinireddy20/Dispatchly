export interface RequestOtpInput {
  email?: string;
  phone?: string;
}

export interface VerifyOtpInput {
  email?: string;
  phone?: string;
  otp: string;
  name?: string;     // For onboarding new users
  newEmail?: string; // For onboarding new users
}

export interface SetPasswordInput {
  userId: number;
  password: string;
}

export interface LoginInput {
  identifier: string; // email or phone
  password: string;
}

export interface SignupInput {
  email?: string;
  phone?: string;
}
