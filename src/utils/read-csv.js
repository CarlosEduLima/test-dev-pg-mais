const csv = require('csv-parser')
const httpResponse = require('./http-response')
const fs = require('fs')
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

const processFile = async (CSV) => {
  const records = []
  const parser = fs
    .createReadStream(CSV)
    .pipe(csv(['id']))
  for await (const record of parser) {
    records.push(record)
  }
  return records
}

async function readCSV (file) {
  if (!file) {
    return {
      success: false,
      httpResponse: httpResponse.serverError({ error: 'No file provided' })
    }
  }
  if (file.split('.').pop() !== 'csv') {
    return {
      success: false,
      httpResponse: httpResponse.badRequest({ error: 'Uploaded file is not CSV' })
    }
  }
  const records = await processFile(file)

  const results = records.map(item => (createRowObject(item.id)))
  return {
    success: true,
    data: results
  }
}

module.exports = { readCSV }
