const { getBlacklist } = require('../../utils/get-blacklist')
const HttpResponse = require('../../utils/http-response')
async function BlacklistCase (validPhoneNumbers) {
  try {
    if (!validPhoneNumbers) {
      return {
        success: false,
        httpResponse: HttpResponse.serverError({ error: 'No phone numbers array provided' })
      }
    }
    const blacklist = await getBlacklist('https://front-test-pg.herokuapp.com/blacklist')
    if (!blacklist.success) {
      return {
        success: false,
        httpResponse: HttpResponse.serverError({ error: blacklist.httpResponse.error })
      }
    }
    const blacklistPhones = []
    blacklist.httpResponse.body.data.map(item => (
      blacklistPhones.push(item.phone)
    ))

    function checkBlacklist (phoneNumber) {
      const phone = phoneNumber.DDD + phoneNumber.CELULAR
      return !blacklistPhones.includes(phone)
    }
    const filteredPhoneNumbers = await validPhoneNumbers.filter(checkBlacklist)
    return {
      success: true,
      data: filteredPhoneNumbers
    }
  } catch (e) {
    return {
      success: false,
      httpResponse: HttpResponse.serverError({ error: e })
    }
  }
}
module.exports = { BlacklistCase }
