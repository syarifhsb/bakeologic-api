import { sign, verify } from "hono/jwt";
import { ENV } from "../env";
import { JWTPayload } from "hono/utils/jwt/types";

export async function signToken(subject: string): Promise<string> {
  const payload = {
    sub: subject,
    exp: Math.floor(Date.now() / 1000) + 86400, // Expires in 1 day
  };
  const secret = ENV.TOKEN_SECRET_KEY;
  const token = await sign(payload, secret);
  return token;
}

export async function verifyToken(token: string): Promise<JWTPayload> {
  const jwt = await verify(token, ENV.TOKEN_SECRET_KEY);
  return jwt;
}
