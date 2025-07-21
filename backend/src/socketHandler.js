export default function socketHandlers(io) {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('joinChannel', ({ channelId }) => {
      console.log(`User ${socket.id} joined channel ${channelId}`);
      socket.join(channelId);
    });

    socket.on('message', (data) => {
      console.log('Received message:', data);
      // Broadcast the message to everyone else
      socket.to(data.channelId).emit('message', {
        content: data.content,
        userId: socket.id,
        timestamp: new Date(),
      });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
}