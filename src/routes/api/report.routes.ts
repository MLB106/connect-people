import { Router, Request, Response } from 'express';
import { ApiResponseUtil, asyncHandler } from '../../utils/apiResponse.js';
import { Logger } from '../../utils/logger.js';

const router: Router = Router();

router.get('/reports', asyncHandler(async (_req: Request, res: Response) => {
  Logger.info('Rapports récupérés avec succès');
  ApiResponseUtil.success(res, 200, []);
}));

export default router;