import { Router } from 'express';
import metalogger from 'metalogger';
import {
  auth,
  byCode,
} from '../../modules/user/index.js';

const router = Router({ mergeParams: true });
const log    = metalogger();

router.post('/auth', async (req, res) => {
  log.info('Authentication: ', req.body);
  res.json(await auth(req.body.email));
});

router.get('/find', async (req, res) => {
  log.info('finding user by: ', req.query);
  res.json(await byCode(req.query.code));
});

export default router;
