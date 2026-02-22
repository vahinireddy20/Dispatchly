import { prisma } from "../../config/prisma";
import { RequestOtpInput, VerifyOtpInput, SetPasswordInput, LoginInput } from "./auth.types";
import { hashPassword, comparePassword } from "../../common/utils/hash";
import { signToken } from "../../common/utils/jwt";
import { sendOtpEmail } from "../../common/utils/email";


// Helper to generate 6-digit OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

export const requestOtp = async (data: RequestOtpInput) => {
  const { email, phone } = data;
  if (!email && !phone) throw new Error("Email or Phone is required");

  // Find user based on whichever identifier is provided
  let user = null;
  if (phone) {
    user = await prisma.user.findUnique({ where: { phone } });
  } else if (email) {
    user = await prisma.user.findUnique({ where: { email } });
  }

  // Admin password login detection
  if (user && user.role === 1 && user.password) {
    return {
      message: "Admin account detected. Please login with password.",
      isAdmin: true,
      phone: user.phone,
      email: user.email
    };
  }

  const otp = generateOtp();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

  if (user) {
    // Existing user: Update OTP and optionally update email if they specified a new one
    await prisma.user.update({
      where: { id: user.id },
      data: {
        otp,
        otpExpiry,
        // If they provided an email now but didn't have one before, we could save it,
        // but let's stick to just delivery for now unless it's a new user.
      },
    });
  } else {
    // New user auto-registration
    user = await prisma.user.create({
      data: {
        phone,
        email,
        otp,
        otpExpiry,
        role: 0,
        isActive: true
      },
    });
  }

  // Determine delivery method (Email prioritized if we have it)
  const deliveryEmail = email || user.email;
  if (deliveryEmail) {
    await sendOtpEmail(deliveryEmail, otp);
    return {
      message: "OTP sent to your email",
      isAdmin: false,
      deliveryMethod: "email"
    };
  } else {
    // MOCK SMS
    console.log(`[MOCK OTP] Sent ${otp} to ${phone}`);
    return {
      message: "OTP sent to your phone",
      isAdmin: false,
      deliveryMethod: "sms"
    };
  }
};

export const verifyOtp = async (data: VerifyOtpInput) => {
  const { email, phone, otp, name, newEmail } = data;

  // Find user by phone OR email
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        phone ? { phone } : {},
        email ? { email } : {}
      ].filter(cond => Object.keys(cond).length > 0)
    }
  });

  if (!user || user.otp !== otp || (user.otpExpiry && user.otpExpiry < new Date())) {
    throw new Error("Invalid or expired OTP");
  }

  // Check if onboarding is needed (New user = role 0 and no name)
  const needsOnboarding = user.role === 0 && !user.name;

  if (needsOnboarding) {
    // If name/email not provided yet, tell frontend to show onboarding screen
    if (!name || (!user.email && !newEmail)) {
      return {
        message: "OTP verified. Please complete your registration.",
        onboardingRequired: true,
        userId: user.id,
        email: user.email // Tell frontend if we already have the email
      };
    }

    // Complete onboarding
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name,
        email: user.email || newEmail,
        otp: null,
        otpExpiry: null
      },
    });
  } else {
    // Clear OTP for existing user
    await prisma.user.update({
      where: { id: user.id },
      data: { otp: null, otpExpiry: null },
    });
  }

  // issue token and return user info
  const updatedUser = await prisma.user.findUnique({ where: { id: user.id } });
  const token = signToken({ userId: user.id, role: user.role });

  return {
    message: "Login successful",
    token,
    user: {
      id: updatedUser?.id,
      name: updatedUser?.name,
      email: updatedUser?.email,
      phone: updatedUser?.phone,
      role: updatedUser?.role
    }
  };
};

export const setPassword = async (data: SetPasswordInput) => {
  const hashedPassword = await hashPassword(data.password);

  await prisma.user.update({
    where: { id: data.userId },
    data: { password: hashedPassword },
  });

  return { message: "Password set successfully" };
};

export const login = async (data: LoginInput) => {
  const { identifier, password } = data;

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: identifier },
        { phone: identifier }
      ]
    }
  });

  if (!user || !user.password || !user.isActive) {
    throw new Error("Invalid credentials");
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) throw new Error("Invalid credentials");

  const token = signToken({ userId: user.id, role: user.role });

  return { token, user: { id: user.id, email: user.email, name: user.name, phone: user.phone, role: user.role } };
};
