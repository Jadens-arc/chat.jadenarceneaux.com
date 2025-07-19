import express from 'express';
import bcrypt from 'bcrypt';
import { SignJWT, jwtVerify } from 'jose';
import db from '../models/index.js';

const router = express.Router();
const { User } = db;
const secret = new TextEncoder().encode('your-very-secret-key');
const saltRounds = 10;

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  User.findOne({ where: { username } })
    .then(async (user) => {
      if (!user) {
        return res.status(401).json({ message: 'User does not exist' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = await new SignJWT({
        id: user.id,
        username: user.username,
        email: user.email
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(secret);

      res.status(200).json({ token });
    });
});

router.post('/signup', async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  let existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' }); 
  }
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = await User.create({ username, password: hashedPassword, email }); 
  const token = await new SignJWT(user.toJSON())
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret);

  res.status(200).json({ token });
});

router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing or invalid Authorization header' });
    }

    const token = authHeader.split(' ')[1];

    const { payload } = await jwtVerify(token, secret);

    res.json({ user: payload });
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
});

export default router;