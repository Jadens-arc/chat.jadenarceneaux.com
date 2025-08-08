import { SignJWT, jwtVerify } from 'jose';
import db from './models/index.js';
const { User } = db;

const secret = new TextEncoder().encode('your-very-secret-key');

async function validateAuth(req) {
  return new Promise((resolve, reject) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      reject({ message: 'Missing or invalid Authorization header' });
    }

    const token = authHeader.split(' ')[1];
    jwtVerify(token, secret).then(data => { resolve(data.payload) });
  });
}

async function userFromPayload(payload) {
  return new Promise((resolve, reject) => {
    User.findOne({ where: { id: payload.id } }).then(resolve)
  });
}

async function userFromRequest(req) {
  return new Promise((resolve, reject) => {
    validateAuth(req)
      .then(payload => {
        userFromPayload(payload)
          .then(user => {
            if (!user) {
              reject({ message: "User not found" });
            }
            resolve(user);
          })
      })
      .catch(reject);
  });
}

export { validateAuth, userFromPayload, userFromRequest };