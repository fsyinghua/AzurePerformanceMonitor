import express from 'express';

const router = express.Router();

export const userController = router;

router.get('/', async (req, res) => {
  try {
    res.json({ users: [], message: 'User management endpoint' });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    res.json({ token: 'dummy-token', user: { username } });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Internal server error' });
  }
});