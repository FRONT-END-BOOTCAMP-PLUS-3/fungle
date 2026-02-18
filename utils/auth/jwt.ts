import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export const generateAccessToken = (userId: string, type: string) => {
  return jwt.sign({ userId, type }, ACCESS_SECRET, { expiresIn: "24h" });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyAccessToken = (
  token: string
): { userId: string; type: string; exp: number } | null => {
  try {
    return jwt.verify(token, ACCESS_SECRET) as {
      userId: string;
      type: string;
      exp: number;
    };
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (
  token: string
): { userId: string; type: string } | null => {
  try {
    return jwt.verify(token, REFRESH_SECRET) as {
      userId: string;
      type: string;
    };
  } catch (error) {
    return null;
  }
};
