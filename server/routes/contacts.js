import { Router } from 'express';
import { getDb } from '../db.js';
import { requireAuth } from '../auth.js';

const router = Router();

// POST /api/contacts — public: book-a-call form submission
router.post('/', (req, res) => {
  const { first_name, last_name, email, company, website, budget, platforms, goals } = req.body;
  if (!first_name || !last_name || !email) {
    return res.status(400).json({ error: 'first_name, last_name and email are required' });
  }
  const platformsStr = Array.isArray(platforms) ? platforms.join(',') : (platforms ?? '');
  const result = getDb().prepare(`
    INSERT INTO contacts (first_name, last_name, email, company, website, budget, platforms, goals)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(first_name, last_name, email, company ?? null, website ?? null, budget ?? null, platformsStr, goals ?? null);
  res.status(201).json({ id: result.lastInsertRowid });
});

// GET /api/contacts — admin only
router.get('/', requireAuth, (req, res) => {
  const { status, q } = req.query;
  let sql = 'SELECT * FROM contacts';
  const params = [];
  const where = [];
  if (status) { where.push('status = ?'); params.push(status); }
  if (q) { where.push('(first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR company LIKE ?)'); const like = `%${q}%`; params.push(like, like, like, like); }
  if (where.length) sql += ' WHERE ' + where.join(' AND ');
  sql += ' ORDER BY created_at DESC';
  const rows = getDb().prepare(sql).all(...params);
  res.json(rows.map(r => ({ ...r, platforms: r.platforms ? r.platforms.split(',') : [] })));
});

// GET /api/contacts/:id — admin only
router.get('/:id', requireAuth, (req, res) => {
  const row = getDb().prepare('SELECT * FROM contacts WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json({ ...row, platforms: row.platforms ? row.platforms.split(',') : [] });
});

// PATCH /api/contacts/:id — admin only (status, notes)
router.patch('/:id', requireAuth, (req, res) => {
  const allowed = ['status', 'notes', 'first_name', 'last_name', 'email', 'company', 'website'];
  const updates = Object.entries(req.body).filter(([k]) => allowed.includes(k));
  if (!updates.length) return res.status(400).json({ error: 'Nothing to update' });
  const set = updates.map(([k]) => `${k} = ?`).join(', ');
  const vals = updates.map(([, v]) => v);
  getDb().prepare(`UPDATE contacts SET ${set}, updated_at = datetime('now') WHERE id = ?`).run(...vals, req.params.id);
  res.json({ ok: true });
});

// DELETE /api/contacts/:id — admin only
router.delete('/:id', requireAuth, (req, res) => {
  getDb().prepare('DELETE FROM contacts WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

export default router;
