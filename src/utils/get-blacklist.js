const axios = require('axios')
const HttpResponse = require('./http-response')
const getBlacklist = (url) => {
  if (!url) {
    return {
      success: false,
      httpResponse: HttpResponse.serverError({ error: 'No url provided' })
    }
  }
  return axios.get(url)
    .then(response => {
      return {
        success: true,
        httpResponse: HttpResponse.success({ data: response.data })
      }
    })
    .catch(error => {
      return {
        success: false,
        httpResponse: HttpResponse.serverError({ error: error })
      }
    })
}

module.exports = { getBlacklist }
