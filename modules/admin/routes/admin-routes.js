// filepath: C:\www\solparts\modules\admin\routes\adminRoutes.js
import express from 'express';
import { getAdmins } from '../controllers/admin-controller.js';

const router = express.Router();

router.get('/admins', getAdmins);

export default router;