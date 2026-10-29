import { test, describe } from 'node:test'
import assert from 'node:assert'
import request from 'supertest'
import app from '../app.js'

describe('Server & Health Route Verification', () => {
  test('GET /api/health should return 200 and healthy status', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect('Content-Type', /json/)
      .expect(200)

    assert.strictEqual(response.body.success, true)
    assert.strictEqual(response.body.data.status, 'healthy')
    assert.strictEqual(response.body.data.service, 'Capstone Connect API')
    assert.ok(response.body.data.uptimeSeconds >= 0)
    assert.ok(response.body.data.timestamp)
  })

  test('GET /api should return 200 with API endpoints index', async () => {
    const response = await request(app)
      .get('/api')
      .expect('Content-Type', /json/)
      .expect(200)

    assert.ok(response.body.endpoints)
    assert.strictEqual(response.body.endpoints.health, '/api/health')
  })

  test('GET /api/nonexistent-route should trigger 404 ApiError', async () => {
    const response = await request(app)
      .get('/api/nonexistent-route')
      .expect('Content-Type', /json/)
      .expect(404)

    assert.strictEqual(response.body.success, false)
    assert.strictEqual(response.body.statusCode, 404)
    assert.ok(response.body.message.includes('not found'))
  })
})
