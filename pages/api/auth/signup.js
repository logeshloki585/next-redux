import bcrypt from 'bcryptjs';
import connectDB from '@/utils/connectDB';
import User from '../../../models/UserModel';
import { generateTokens } from '../../../utils/generateToken';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  await connectDB();

  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, passwordHash: hashedPassword });
    await user.save();

    const tokens = generateTokens(user);
    res.status(201).json(tokens);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', errorq:err});
  }
};
