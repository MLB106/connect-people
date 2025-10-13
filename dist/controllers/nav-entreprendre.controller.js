import { NavOption } from '../models/navOption.model.js';
import { ApiResponseUtil, asyncHandler } from '../utils/apiResponse.js';
import { Logger } from '../utils/logger.js';
export const getEntreprendreOptions = asyncHandler(async (_req, res) => {
    const options = await NavOption.find({
        menu: 'entreprendre',
        isActive: true
    })
        .select('code name parentCode')
        .sort({ parentCode: 1, order: 1 });
    Logger.info('Options entreprendre récupérées avec succès', { count: options.length });
    ApiResponseUtil.success(res, 200, options);
});
//# sourceMappingURL=nav-entreprendre.controller.js.map