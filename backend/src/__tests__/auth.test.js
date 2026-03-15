const request = require('supertest');
const app = require('../app');

// Mock DB to avoid real PlanetScale connections in unit tests
jest.mock('../config/db', () => ({
  query: jest.fn(),
}));

const { query } = require('../config/db');

describe('POST /api/auth/register', () => {
  it('returns 400 when required fields are missing', async () => {
    const res = await request(app).post('/api/auth/register').send({});
    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  it('returns 400 for an invalid email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Alice', email: 'not-an-email', password: 'password123' });
    expect(res.status).toBe(400);
  });

  it('returns 409 when email is already registered', async () => {
    query.mockResolvedValueOnce([{ id: 1, email: 'alice@test.com' }]);
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Alice', email: 'alice@test.com', password: 'password123' });
    expect(res.status).toBe(409);
    expect(res.body.message).toMatch(/already in use/i);
  });
});

describe('POST /api/auth/login', () => {
  it('returns 400 when fields are missing', async () => {
    const res = await request(app).post('/api/auth/login').send({});
    expect(res.status).toBe(400);
  });

  it('returns 401 for unknown email', async () => {
    query.mockResolvedValueOnce([]); // user not found
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'nobody@test.com', password: 'password123' });
    expect(res.status).toBe(401);
  });
});
