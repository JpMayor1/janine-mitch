import { jwtVerify } from "jose";

type UserJWTPaylaod = {
  jti: string;
  iat: number
}

export function getJWTSecretKey () {
  const key = process.env.JWT_SECRET_KEY;

  if(!key || key.length === 0) {
    throw new Error('JWT_SECRET_KEY is not set in your environment variable');
  }

  return key;
}

export async function Verification (token: string) {
  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(getJWTSecretKey()));

    return verified.payload as UserJWTPaylaod;

  } catch (error) {
    throw new Error('[Auth]: Your token has expired!');
  }
}