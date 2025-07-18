import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { jwtVerify, SignJWT } from 'jose';
import { pool } from './db.js';
import { User } from './models/user.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const secret = new TextEncoder().encode('your-very-secret-key');

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Welcome to the chat server!');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  User.findByUsername(username).then(async (user) => {
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = await new SignJWT(user)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(secret);

    res.status(200).json({ token });
  });
});

app.get('/me', async (req, res) => {
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

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(5001, () => {
  console.log('Server is running on http://localhost:5001');
});