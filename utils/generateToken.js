import jwt from 'jsonwebtoken';

export const generateTokens = (user) => {
  const payload = { email: user.email };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRATION });

  return { accessToken, refreshToken };
};
