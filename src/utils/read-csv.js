const csv = require('csv-parser')
const httpResponse = require('./http-response')
const fs = require('fs')
let results = []
const createRowObject = (row) => {
  const [IDMENSAGEM, DDD, CELULAR, OPERADORA, HORARIO_ENVIO, MENSAGEM] = row.split(';')
  return {
    IDMENSAGEM,
    DDD,
    CELULAR,
    OPERADORA,
    HORARIO_ENVIO,
    MENSAGEM
  }
}
const readCSV = (CSV) => {
  if (!CSV) {
    return httpResponse.serverError({ error: 'No file provided' })
  }
  if (CSV.split('.').pop() !== 'csv') {
    return httpResponse.badRequest({ error: 'Arquivo enviado não é CSV' })
  }
  fs.createReadStream(CSV)
    .pipe(csv(['id']))
    .on('data', (data) => results.push(data))
    .on('end', () => {
      results = results.map(item => (createRowObject(item.id)))
    })
}

module.exports = { readCSV }
