import bcrypt from 'bcryptjs';
import connectDB from '@/utils/connectDB';
import User from '../../../models/UserModel';
import { generateTokens } from '../../../utils/generateToken';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  await connectDB();

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const tokens = generateTokens(user);
    res.json(tokens);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
