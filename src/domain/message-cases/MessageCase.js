const HttpResponse = require('../../utils/http-response')

async function MessageCase (messages) {
  try {
    if (!messages) {
      return {
        validated: false,
        httpResponse: HttpResponse.serverError({ error: 'No messages array provided' })
      }
    }
    if (!messages.length > 0) {
      return {
        validated: false,
        httpResponse: HttpResponse.badRequest({ error: 'Empty array' })
      }
    }
    function validateMessage (message) {
      return message.MENSAGEM.length <= 140 &&
        message.HORARIO_ENVIO <= '19:59:59'
    }
    const filteredMessages = await messages.filter(validateMessage)
    return {
      success: true,
      httpResponse: HttpResponse.success({ data: filteredMessages })
    }
  } catch (e) {
    return {
      validated: false,
      httpResponse: HttpResponse.serverError({ error: e })
    }
  }
}

module.exports = { MessageCase }
