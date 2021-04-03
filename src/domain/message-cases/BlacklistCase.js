const { getBlacklist } = require('../../utils/get-blacklist')
const HttpResponse = require('../../utils/http-response')
async function BlacklistCase (validPhoneNumbers) {
  try {
    if (!validPhoneNumbers) {
      return {
        validated: false,
        httpResponse: HttpResponse.serverError({ error: 'No phone numbers array provided' })
      }
    }
    if (!Array.isArray(validPhoneNumbers)) {
      return {
        validated: false,
        httpResponse: HttpResponse.serverError({ error: 'Phones numbers must be an array' })
      }
    }
    const blacklist = await getBlacklist()
    if (!blacklist.success) {
      return {
        httpResponse: HttpResponse.serverError({ error: blacklist.error })
      }
    }
    const blacklistPhones = []
    blacklist.data.map(item => (
      blacklistPhones.push(item.phone)
    ))

    function checkBlacklist (phoneNumber) {
      const phone = phoneNumber.DDD + phoneNumber.CELULAR
      return !blacklistPhones.includes(phone)
    }
    const filteredPhoneNumbers = await validPhoneNumbers.filter(checkBlacklist)
    return {
      success: true,
      phoneNumbers: filteredPhoneNumbers
    }
  } catch (e) {
    console.log(e)
  }
}
module.exports = { BlacklistCase }
