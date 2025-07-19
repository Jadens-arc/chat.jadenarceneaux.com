import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { jwtVerify, SignJWT } from 'jose';
import  bcrypt  from 'bcrypt';
import { Sequelize, DataTypes } from 'sequelize';
import authRoutes from './routes/auth.js';


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
app.use('/auth', authRoutes);

// await User.sync();

app.get('/', (req, res) => {
  res.send('Welcome to the chat server!');
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