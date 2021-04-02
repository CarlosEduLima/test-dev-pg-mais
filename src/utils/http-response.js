const badRequest = (error) => {
  return {
    statusCode: 400,
    body: error
  }
}

const serverError = (error) => {
  return {
    statusCode: 500,
    body: error
  }
}

const success = (data) => {
  return {
    statusCode: 200,
    body: data
  }
}
module.exports = {
  badRequest,
  serverError,
  success
}
