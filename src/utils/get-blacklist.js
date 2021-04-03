const axios = require('axios')
const getBlacklist = () => {
  return axios.get('https://front-test-pg.herokuapp.com/blacklist/')
    .then(response => {
      return {
        success: true,
        data: response.data
      }
    })
    .catch(error => {
      return {
        success: false,
        error: error
      }
    })
}

module.exports = { getBlacklist }
