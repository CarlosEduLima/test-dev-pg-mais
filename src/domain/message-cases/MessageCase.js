const HttpResponse = require('../../utils/http-response')

async function MessageCase (messages) {
  try {
    if (!messages) {
      return {
        validated: false,
        httpResponse: HttpResponse.serverError({ error: 'No phone numbers array provided' })
      }
    }
    if (!Array.isArray(messages)) {
      return {
        validated: false,
        httpResponse: HttpResponse.serverError({ error: 'Phones numbers must be an array' })
      }
    }
    function validateMessage (message) {
      return message.MENSAGEM.length <= 140 &&
        message.HORARIO_ENVIO <= '19:59:59'
    }
    const filteredMessages = await messages.filter(validateMessage)
    console.log(filteredMessages)
  } catch (e) {
    return {
      validated: false,
      httpResponse: HttpResponse.serverError({ error: e })
    }
  }
}

module.exports = { MessageCase }
