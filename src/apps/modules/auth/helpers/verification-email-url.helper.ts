export const VERIFICATION_EMAIL_TOKEN_TTL = 5 * 60 * 1000; // 5 minutes

/** Custom your Server URL */
export const makeVerificationEmailUrl = (verificationToken: string): string => {
  return `http://localhost:3000/auth/verify_email?token=${verificationToken}`;
};
