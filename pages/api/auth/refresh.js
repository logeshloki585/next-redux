import jwt from 'jsonwebtoken';
import connectDB from '@/utils/connectDB';
import User from '../../../models/UserModel';
import { generateTokens } from '../../../utils/generateToken';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  await connectDB();

  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token provided' });
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }

      const user = await User.findOne({ email: decoded.email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const tokens = generateTokens(user);
      res.json(tokens);
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
