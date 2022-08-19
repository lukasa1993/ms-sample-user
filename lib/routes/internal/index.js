import { Router } from 'express';
import metalogger from 'metalogger';

const router = Router({ mergeParams: true });
const log    = metalogger();

export default router;
