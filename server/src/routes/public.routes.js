import { Router } from 'express';
import { getAchievments, getProjects } from '../controllers/publicController.js';

const publicRouter = Router();

publicRouter.get('/projects', getProjects);

publicRouter.get('/achievements', getAchievments);

export default publicRouter;
