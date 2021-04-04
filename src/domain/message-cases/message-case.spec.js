const { MessageCase } = require('./MessageCase')
const { phoneNumbers } = require('../../../mocks/phone-numbers-array')
describe('Message case', () => {
  test('should return 500 and false validated if no array is provided', async () => {
    const validPhoneNumbers = await MessageCase()
    expect(validPhoneNumbers.validated).toBe(false)
    expect(validPhoneNumbers.httpResponse.statusCode).toBe(500)
    expect(validPhoneNumbers.httpResponse.body).toEqual({ error: 'No messages array provided' })
  })

  test('should return 400 and false validated if messages is an empty array', async () => {
    const validPhoneNumbers = await MessageCase([])
    expect(validPhoneNumbers.validated).toBe(false)
    expect(validPhoneNumbers.httpResponse.statusCode).toBe(400)
    expect(validPhoneNumbers.httpResponse.body).toEqual({ error: 'Empty array' })
  })
  test('should return validated true if phone numbers were validated', async () => {
    const validPhoneNumbers = await MessageCase(phoneNumbers)
    expect(validPhoneNumbers.success).toBe(true)
    expect(validPhoneNumbers.httpResponse.statusCode).toBe(200)
  })
})
