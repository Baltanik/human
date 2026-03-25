import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { login, requireAuth } from './auth.js';
import settingsRouter from './routes/settings.js';
import contactsRouter from './routes/contacts.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true, ts: new Date().toISOString() }));

// Auth
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const token = login(email, password);
  if (!token) return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ token });
});

app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json({ email: req.admin.sub, role: req.admin.role });
});

// Resources
app.use('/api/settings', settingsRouter);
app.use('/api/contacts', contactsRouter);

// Unhandled
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(PORT, '0.0.0.0', () => {
  console.log(JSON.stringify({ level: 'info', msg: 'server started', port: PORT, env: process.env.NODE_ENV || 'development' }));
});
