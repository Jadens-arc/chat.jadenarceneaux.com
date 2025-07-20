import express from 'express';
import db from '../models/index.js';
import { SignJWT, jwtVerify } from 'jose';

const router = express.Router();
const { User, Channel } = db;
const secret = new TextEncoder().encode('your-very-secret-key');

router.get('/list', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing or invalid Authorization header' });
    }

    const token = authHeader.split(' ')[1];
    const { payload } = await jwtVerify(token, secret);
    let channels = await Channel.findAll({where: { id: payload.id }});
    res.json({ channels });
});

router.post('/create', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing or invalid Authorization header' });
    }
    const token = authHeader.split(' ')[1];
    const { payload } = await jwtVerify(token, secret);
    console.log(req.body)
    const { channelName, recipients } = req.body;
    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({ message: 'Recipients are required' });
    }
    if (!channelName || typeof channelName !== 'string' || channelName.trim() === '') {
      return res.status(400).json({ message: 'Channel name is required' });
    }
    try {
        const newChannel = await Channel.create({
          name: channelName,
          ownerId: payload.id,
        });
        for (const recipient of recipients) {
          let user = await User.findOne({ where: { username: recipient } });
          if (!user) {
            return res.status(404).json({ message: `User ${recipient} not found` });
          }
          newChannel.addUser(user);
        }
        await newChannel.save();
        return res.status(201).json({ channel: newChannel });
    } catch (error) {
        console.error("Error creating channel:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;