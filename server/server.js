import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { Sequelize } from 'sequelize';
import authRoutes from './routes/auth.js';
import channelRoutes from './routes/channels.js';
import socketHandlers from './socketHandler.js';


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true
  }
});

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json()); 
app.use('/auth', authRoutes);
app.use('/channels', channelRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the chat server!');
});

socketHandlers(io);

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});