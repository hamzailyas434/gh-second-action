import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from './app.js';

describe('Stats API', () => {
  it('should return stats', async () => {
    const res = await request(app).get('/api/stats');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('users');
    expect(res.body).toHaveProperty('repos');
    expect(res.body).toHaveProperty('workflows');
  });
});
