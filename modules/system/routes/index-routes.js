import express from 'express';
import { renderIndex } from '../controllers/index-controller.js';

const router = express.Router();

router.get('/', renderIndex);

export default router;