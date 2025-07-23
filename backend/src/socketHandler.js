import db from './models/index.js';
const { User, Message } = db;
import { jwtVerify } from 'jose';
const secret = new TextEncoder().encode('your-very-secret-key');


export default function socketHandlers(io) {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('joinChannel', ({ channelId }) => {
      console.log(`User ${socket.id} joined channel ${channelId}`);
      socket.join(channelId);
    });

    socket.on('message', async (data) => {
      console.log('Received message:', data);
      let token = data.token;
      if (!token) {
        console.error("No token provided in message event");
        return;
      }
      let sender = null;
      try {
        const { payload } = await jwtVerify(token, secret);
        console.log("Token payload:", payload);
        sender = payload.username;
      } catch (error) {
        console.error("Invalid token:", error);
        return;
      }

      let owner = await User.findOne({ where: { username: sender } });
      if (!owner) {
        console.error("User not found:", sender);
        return;
      }

      const newMessage = await Message.create({
        content: data.content,
        userId: owner.id,
        channelId: data.channelId,
      });

      await newMessage.save();

      let date = new Date();
      socket.to(data.channelId).emit('message', {
        content: data.content,
        userId: socket.id,
        timestamp: date,
        sender: sender,
      });

      socket.emit('message', {
        content: data.content,
        userId: socket.id,
        channelId: data.channelId,
        timestamp: date, 
        sender: sender,
      });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
}