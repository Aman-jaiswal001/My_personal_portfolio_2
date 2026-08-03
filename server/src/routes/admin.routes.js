import { Router } from 'express';
import { deleteAchievement, deletePorject, getContactMessage, getLogin, postAddachievements, postAddPorject } from '../controllers/adminController.js';
import { getAchievments, getProjects } from '../controllers/publicController.js';
import { upload } from '../configs/multer.js';

const adminRouter = Router();

adminRouter.post('/login', getLogin);

adminRouter.get('/contacts',  getContactMessage);

adminRouter.get('/projects', getProjects);

adminRouter.get('/achievements',  getAchievments);

adminRouter.post('/projects', upload.single('image'), postAddPorject);

adminRouter.post('/achievements',  upload.array('images', 6),  postAddachievements);

adminRouter.delete('/projects/:id',  deletePorject);

adminRouter.delete('/achievements/:id',  deleteAchievement);

export default adminRouter;
