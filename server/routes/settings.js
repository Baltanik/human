import { Router } from 'express';
import { getDb } from '../db.js';
import { requireAuth } from '../auth.js';

const router = Router();

// GET /api/settings — public: frontend needs keys to inject tags + calendly url
router.get('/', (req, res) => {
  const row = getDb().prepare(
    'SELECT gtm_id, ga4_id, google_ads_id, meta_pixel_id, calendly_url FROM api_keys WHERE id = 1'
  ).get();
  res.json(row || {});
});

// PUT /api/settings — admin only
router.put('/', requireAuth, (req, res) => {
  const { gtm_id, ga4_id, google_ads_id, meta_pixel_id, calendly_url } = req.body;
  getDb().prepare(`
    UPDATE api_keys SET
      gtm_id = ?,
      ga4_id = ?,
      google_ads_id = ?,
      meta_pixel_id = ?,
      calendly_url = ?,
      updated_at = datetime('now')
    WHERE id = 1
  `).run(
    gtm_id ?? null,
    ga4_id ?? null,
    google_ads_id ?? null,
    meta_pixel_id ?? null,
    calendly_url ?? null
  );
  res.json({ ok: true });
});

export default router;
