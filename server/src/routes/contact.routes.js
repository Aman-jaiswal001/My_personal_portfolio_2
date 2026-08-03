import { Router } from 'express';
import { postContactmessage } from '../controllers/contactController.js';

const contactRouter = Router();

contactRouter.post('/', postContactmessage);

export default contactRouter;
