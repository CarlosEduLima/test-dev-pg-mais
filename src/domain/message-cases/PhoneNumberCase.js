const HttpResponse = require('../../utils/http-response')
const validDDDs = require('../../utils/valid-ddds')
module.exports = {
  async PhoneNumberCase (phoneNumbers) {
    try {
      if (!phoneNumbers) {
        return {
          validated: false,
          httpResponse: HttpResponse.serverError({ error: 'No phone numbers array provided' })
        }
      }
      if (!Array.isArray(phoneNumbers)) {
        return {
          validated: false,
          httpResponse: HttpResponse.serverError({ error: 'Phones numbers must be an array' })
        }
      }
      if (!phoneNumbers.length > 0) {
        return {
          validated: false,
          httpResponse: HttpResponse.badRequest({ error: 'Empty array' })
        }
      }

      function validatePhoneNumber (phoneNumber) {
        return phoneNumber.DDD.length === 2 &&
        validDDDs.includes(parseInt(phoneNumber.DDD)) &&
        parseInt(phoneNumber.DDD) !== 21 &&
        phoneNumber.CELULAR.length === 9 &&
        phoneNumber.CELULAR[0] === '9' &&
        parseInt(phoneNumber.CELULAR[1]) > 6
      }
      const filteredPhoneNumbers = await phoneNumbers.filter(validatePhoneNumber)
      return {
        validated: true,
        data: filteredPhoneNumbers

      }
    } catch (e) {
      return {
        validated: false,
        httpResponse: HttpResponse.serverError({ error: 'Cannot validate phone number' })
      }
    }
  }
}
