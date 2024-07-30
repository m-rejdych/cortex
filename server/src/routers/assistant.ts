import { Router } from 'express';

import { assistantController } from '@/controllers/assistant';

export const router = Router();

router.post('/', assistantController);
