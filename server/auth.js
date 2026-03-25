import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

if (!JWT_SECRET || !ADMIN_EMAIL || !ADMIN_PASSWORD_HASH) {
  console.error('[auth] FATAL: JWT_SECRET, ADMIN_EMAIL and ADMIN_PASSWORD_HASH must be set in .env');
  process.exit(1);
}

export function login(email, password) {
  if (email !== ADMIN_EMAIL) return null;
  const valid = bcrypt.compareSync(password, ADMIN_PASSWORD_HASH);
  if (!valid) return null;
  return jwt.sign({ sub: email, role: 'admin' }, JWT_SECRET, { expiresIn: '8h' });
}

export function requireAuth(req, res, next) {
  const header = req.headers['authorization'] || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.admin = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}
