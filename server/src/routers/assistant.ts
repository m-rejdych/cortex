import { Router } from 'express';

import { assistantController } from '@/contollers/assistant';

export const router = Router();

router.post('/', assistantController);
