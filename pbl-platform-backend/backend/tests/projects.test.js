import './setup.js';
import { api } from './setup.js';

const big = (n=100) => Array.from({length:n}).map((_,i)=>`word${i}`).join(' ');

describe('Projects', () => {
  let token;
  beforeAll(async () => {
    const res = await api().post('/api/auth/signup').send({
      email: 'ent@example.com', password: 'Strong#123', role: 'entrepreneur'
    });
    token = res.body.token;
  });

  it('rejects short descriptions', async () => {
    const res = await api().post('/api/projects/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'T', description: 'short', problem: 'short', solution: 'short',
        targetAudience: 'TA', revenueModel: 'ads'
      });
    expect(res.status).toBe(400);
  });

  it('creates valid project', async () => {
    const res = await api().post('/api/projects/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'My Project',
        description: big(120),
        problem: big(120),
        solution: big(120),
        targetAudience: 'Students',
        revenueModel: 'Subscriptions',
        premium: false
      });
    expect(res.status).toBe(201);
  });
});
