import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { jwtVerify, SignJWT } from 'jose';
import  bcrypt  from 'bcrypt';
import { Sequelize, DataTypes } from 'sequelize';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const secret = new TextEncoder().encode('your-very-secret-key');
const saltRounds = 10; 
const sequelize = new Sequelize('postgres://express:1bACnLFEssTdactr@localhost:5432/chatjadenarceneaux') // Example for postgres

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json()); 

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  timestamps: true,
  tableName: 'users'
}); 

app.get('/', (req, res) => {
  res.send('Welcome to the chat server!');
});

app.post('/login', async (req, res) => {
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

      const token = await new SignJWT(user.toJSON())
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(secret);

      res.status(200).json({ token });
    });
});

app.post('/signup', async (req, res) => {
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