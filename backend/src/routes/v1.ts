import express from 'express';
import { azureController } from './../controllers/azureController';
import { monitoringController } from './../controllers/monitoringController';
import { userController } from './../controllers/userController';
import wecomController from './../controllers/wecomController';

const router = express.Router();

export const v1Routes = router;

router.get('/health', (req, res) => {
  res.json({ status: 'v1 API healthy', timestamp: new Date().toISOString() });
});

router.use('/azure', azureController);
router.use('/monitoring', monitoringController);
router.use('/users', userController);
router.use('/wecom', wecomController);