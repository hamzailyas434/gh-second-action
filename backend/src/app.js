import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/stats', (req, res) => {
  res.json({ users: 100, repos: 25, workflows: 5 });
});

export default app;
