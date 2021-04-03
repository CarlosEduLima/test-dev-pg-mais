const { PhoneNumberCase } = require('./PhoneNumberCase')
const { phoneNumbers } = require('../../../mocks/phone-numbers-array')
describe('Phone number case', () => {
  test('should return 500 and false validated if no array is provided', async () => {
    const validPhoneNumbers = await PhoneNumberCase()
    expect(validPhoneNumbers.validated).toBe(false)
    expect(validPhoneNumbers.httpResponse.statusCode).toBe(500)
    expect(validPhoneNumbers.httpResponse.body).toEqual({ error: 'No phone numbers array provided' })
  })
  test('should return 500 and false validated if PhoneNumber is not an array', async () => {
    const validPhoneNumbers = await PhoneNumberCase({})
    expect(validPhoneNumbers.validated).toBe(false)
    expect(validPhoneNumbers.httpResponse.statusCode).toBe(500)
    expect(validPhoneNumbers.httpResponse.body).toEqual({ error: 'Phones numbers must be an array' })
  })
  test('should return validated true if phone numbers were validated', async () => {
    const validPhoneNumbers = await PhoneNumberCase(phoneNumbers)
    expect(validPhoneNumbers.validated).toBe(true)
  })
})
