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
  test('should return 400 and false validated if PhoneNumber is an empty array', async () => {
    const validPhoneNumbers = await PhoneNumberCase([])
    expect(validPhoneNumbers.validated).toBe(false)
    expect(validPhoneNumbers.httpResponse.statusCode).toBe(400)
    expect(validPhoneNumbers.httpResponse.body).toEqual({ error: 'Empty array' })
  })
  /* test('should return 400 and false validated if celular or ddd is not provided', async () => {
    const validPhoneNumbers = await PhoneNumberCase([{
      IDMENSAGEM: 'e7b87f43-9aa8-414b-9cec-f28e653ac25e',
      OPERADORA: 'VIVO',
      HORARIO_ENVIO: '18:35:20',
      MENSAGEM: 'dui luctus rutrum nulla tellus in sagittis dui'
    }])
    expect(validPhoneNumbers.validated).toBe(false)
    expect(validPhoneNumbers.httpResponse.statusCode).toBe(400)
    expect(validPhoneNumbers.httpResponse.body).toEqual({ error: 'Empty Phone number or Phone DDD' })
  }) */
  test('should return validated true if phone numbers were validated', async () => {
    const validPhoneNumbers = await PhoneNumberCase(phoneNumbers)
    expect(validPhoneNumbers.validated).toBe(true)
  })
})
