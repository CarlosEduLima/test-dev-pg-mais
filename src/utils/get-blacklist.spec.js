const { getBlacklist } = require('./get-blacklist')

describe('Request Blacklist', () => {
  test('should return 500 and success false if no url is provided', async () => {
    const response = await getBlacklist()
    expect(response.httpResponse.statusCode).toBe(500)
    expect(response.success).toBe(false)
    expect(response.httpResponse.body).toEqual({ error: 'No url provided' })
  })
  test('should return 500 and success false if request fail', async () => {
    const response = await getBlacklist('https://invalid-url.com/')
    expect(response.success).toBe(false)
    expect(response.httpResponse.statusCode).toBe(500)
  })
  test('should return 200 and success if request not fail', async () => {
    const response = await getBlacklist('https://front-test-pg.herokuapp.com/blacklist')
    expect(response.success).toBe(true)
    expect(response.httpResponse.statusCode).toBe(200)
  })
})
