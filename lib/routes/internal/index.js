import { Router } from 'express';
import metalogger from 'metalogger';
import {
  auth,
  byCode,
  reset,
} from '../../modules/user/index.js';

const router = Router({ mergeParams: true });
const log    = metalogger();

router.post('/auth', async (req, res) => {
  log.info('Authentication: ', req.body);
  try { res.json(await auth(req.body.email));} catch (e) { }
});

router.post('/reset_code', async (req, res) => {
  log.info('Reset: ', req.body);
  res.json(await reset(req.body.user_uuid));
});

router.get('/find', async (req, res) => {
  log.info('finding user by: ', req.query);
  res.json(await byCode(req.query.code));
});

export default router;
