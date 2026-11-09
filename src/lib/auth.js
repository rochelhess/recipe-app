import jwt from "jsonwebtoken";

const COOKIE_NAME = "token";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days, in seconds

export function signToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: MAX_AGE });
}

export function setAuthCookie(res, token) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax${secure}`,
  );
}

export function clearAuthCookie(res) {
  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`,
  );
}

export function getUserIdFromRequest(req) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET).userId;
  } catch {
    return null;
  }
}
