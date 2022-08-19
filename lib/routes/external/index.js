import { Router } from 'express';
import { byUUID } from '../../modules/user/index.js';

const router = Router({ mergeParams: true });

const log = metalogger();

router.get('/', async (req, res) => {
  const scope                 = req.get('x-authenticated-scope');
  const custom_id             = req.get('x-consumer-custom-id');
  const [user_id, company_id] = custom_id?.split('_') ?? [];

  if (user_id?.length > 0 && company_id?.length > 0 && scope?.length > 0) {
    res.json(await byUUID(user_id));
  } else {
    res.sendStatus(401);
    log.info({ scope, custom_id, user_id, company_id });
  }
});

export default router;
