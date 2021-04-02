const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json())
Routes(app)
app.use(express.urlencoded({ extended: false }))

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`)
})

module.exports = app
