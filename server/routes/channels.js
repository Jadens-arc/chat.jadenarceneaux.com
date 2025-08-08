import express from 'express';
import db from '../models/index.js';
import { userFromRequest } from '../authHelper.js';

const router = express.Router();
const { User, Channel, UserChannel, Message } = db;

router.get('/', async (req, res) => {
  userFromRequest(req)
    .then(user => {
      Channel.findAll({
        include: [
          {
            model: User,
            as: 'users',
            attributes: ['id', 'username'],
            where: { id: user.id }
          }
        ]
      }).then(channels => { res.json({ channels }) });
    })
    .catch(error => {
      res.status(401).json(error);
    });
});

router.post('/', async (req, res) => {
  let user = await userFromRequest(req);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

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
      ownerId: user.id,
    });

    newChannel.addUser(user);

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

router.get('/:id', async (req, res) => {
  let user = await userFromRequest(req);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const channelId = req.params.id;
  try {
    const channel = await Channel.findByPk(channelId, {
      include: [
        {
          model: User,
          as: 'users',
          attributes: ['id', 'username']
        },
        {
          model: User,
          as: 'users', 
          attributes: [],
          through: {
            attributes: []
          },
          where: {
            id: user.id
          },
          required: true 
        },
      ]
    });
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }
    const recipients = channel.users.reduce((acc, user) => {
      acc[user.id] = user.username;
      return acc;
    }, {});
    return res.json({
      channel: {
        id: channel.id,
        name: channel.name,
        createdAt: channel.createdAt,
        updatedAt: channel.updatedAt,
        recipients: recipients
      }
    });
  } catch (error) {
    console.error("Error fetching channel details:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:id/messages', async (req, res) => {
  let user = await userFromRequest(req);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const channelId = req.params.id;
  try {
    const channel = await Channel.findByPk(channelId, {
      include: [
        {
          model: User,
          as: 'users', 
          attributes: [],
          through: {
            attributes: []
          },
          where: {
            id: user.id
          },
          required: true 
        },
        {
          model: Message,
          as: 'messages',
          attributes: ['id', 'content', 'createdAt'],
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['username']
            }
          ]
        }
      ]
    });
    
    if (!channel) {
      return res.status(404).json({ message: 'Channel not found' });
    }

    return res.json({
      messages: channel.messages.map(message => ({
        id: message.id,
        content: message.content,
        timestamp: message.createdAt,
        sender: message.user.username
      })),
    });
  } catch (error) {
    console.error("Error fetching channel details:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
  
});


export default router;