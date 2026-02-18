import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export const generateAccessToken = (userId: string, type: string) => {
  if (userId == null || type == null) {
    throw new Error(
      "generateAccessToken: userId and type must be non-null (userId: " +
        String(userId) +
        ", type: " +
        String(type) +
        ")",
    );
  }
  const payload = { userId: String(userId), type: String(type) };
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "24h" });
};

export const generateRefreshToken = (userId: string) => {
  if (userId == null) {
    throw new Error(
      "generateRefreshToken: userId must be non-null (userId: " +
        String(userId) +
        ")",
    );
  }
  const payload = { userId: String(userId) };
  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyAccessToken = (
  token: string,
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
  token: string,
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
