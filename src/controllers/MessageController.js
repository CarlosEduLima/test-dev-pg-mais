const { PhoneNumberCase } = require('../domain/message-cases/PhoneNumberCase')
const { BlacklistCase } = require('../domain/message-cases/BlacklistCase')
const { MessageCase } = require('../domain/message-cases/MessageCase')
const HttpResponse = require('../utils/http-response')
const { readCSV } = require('../utils/read-csv')
async function MessageController () {
  try {
    const formatedCSV = await readCSV('data.csv')
    if (!formatedCSV.success) {
      const response = { success: formatedCSV.success, error: formatedCSV.httpResponse.body }
      console.log(response)
    }
    const validPhoneNumbers = await PhoneNumberCase(formatedCSV.data)
    if (!validPhoneNumbers.validated) {
      const response = { success: validPhoneNumbers.validated, error: validPhoneNumbers.httpResponse.body }
      console.log(response)
    }
    const phoneNumbers = await BlacklistCase(validPhoneNumbers.data)
    if (!phoneNumbers.success) {
      const response = { success: phoneNumbers.success, error: phoneNumbers.httpResponse.body }
      console.log(response)
    }
    const validMessages = await MessageCase(phoneNumbers.data)
    if (!validMessages.validated) {
      const response = { success: validMessages.validated, error: validMessages.httpResponse.body }
      console.log(response)
    }
    function IdBroker (message) {
      if (message.OPERADORA === 'VIVO' || message.OPERADORA === 'TIM') {
        const { IDMENSAGEM, IDBROKER = 1 } = message
        return {
          IDMENSAGEM,
          IDBROKER
        }
      } else if (message.OPERADORA === 'CLARO' || message.OPERADORA === 'OI') {
        const { IDMENSAGEM, IDBROKER = 1 } = message
        return {
          IDMENSAGEM,
          IDBROKER
        }
      } else if (message.OPERADORA === 'NEXTEL') {
        const { IDMENSAGEM, IDBROKER = 1 } = message
        return {
          IDMENSAGEM,
          IDBROKER
        }
      }
    }
    const filteredPhoneNumbers = await validMessages.httpResponse.body.data.map(IdBroker)
    console.log(filteredPhoneNumbers)
  } catch (e) {
    console.log({
      success: false,
      httpResponse: HttpResponse.serverError({ error: e })
    })
  }
}
MessageController()
