import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken'; // Asegúrate de tener jwt decodificado instalado

export default function handler(req, res) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key'); // Reemplaza 'your_secret_key' con tu clave secreta real
    res.status(200).json({ message: 'Access granted', user: decoded });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}