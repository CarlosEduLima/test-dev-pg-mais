const { readCSV } = require('./read-csv')
describe('Read CSV util', () => {
  test('should return 500 if no file is provided', async () => {
    const httpResponse = await readCSV()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual({ error: 'No file provided' })
  })

  test('should return 400 if file provided is not CSV', async () => {
    const httpResponse = await readCSV('data.txt')
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual({ error: 'Arquivo enviado não é CSV' })
  })
})
