const { BlacklistCase } = require('./BlacklistCase')
const { phoneNumbers } = require('../../../mocks/phone-numbers-array')
describe('Blacklist case', () => {
  test('should return 500 and false validated if no array is provided', async () => {
    const validPhoneNumbers = await BlacklistCase()
    expect(validPhoneNumbers.validated).toBe(false)
    expect(validPhoneNumbers.httpResponse.statusCode).toBe(500)
    expect(validPhoneNumbers.httpResponse.body).toEqual({ error: 'No phone numbers array provided' })
  })
  test('should return validated true if valid phone numbers were provided', async () => {
    const validPhoneNumbers = await BlacklistCase(phoneNumbers)
    expect(validPhoneNumbers.success).toBe(true)
  })
})
