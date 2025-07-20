import express from 'express';
import db from '../models/index.js';
import { SignJWT, jwtVerify } from 'jose';

const router = express.Router();
const { Channel } = db;
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


export default router;