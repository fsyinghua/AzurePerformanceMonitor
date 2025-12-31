import express from 'express';

const router = express.Router();

export const monitoringController = router;

router.get('/metrics', async (req, res) => {
  try {
    res.json({ message: 'Monitoring metrics endpoint', status: 'available' });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Internal server error' });
  }
});

router.get('/alerts', async (req, res) => {
  try {
    res.json({ message: 'Alerts endpoint', status: 'available' });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Internal server error' });
  }
});