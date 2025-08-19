import './setup.js';
import { api } from './setup.js';

describe('Auth', () => {
  it('rejects weak passwords', async () => {
    const res = await api().post('/api/auth/signup').send({
      email: 'a@b.com', password: 'short', role: 'student'
    });
    expect(res.status).toBe(400);
  });

  it('signs up and logs in', async () => {
    const res = await api().post('/api/auth/signup').send({
      email: 'user@example.com', password: 'Strong#123', role: 'student'
    });
    expect(res.status).toBe(201);
    const login = await api().post('/api/auth/login').send({
      email: 'user@example.com', password: 'Strong#123'
    });
    expect(login.status).toBe(200);
    expect(login.body.token).toBeTruthy();
  });
});
