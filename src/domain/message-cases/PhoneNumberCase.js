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
        validPhoneNumbers: filteredPhoneNumbers

      }
    } catch (e) {
      console.log(e)
    }
  }
}
