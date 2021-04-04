const { readCSV } = require('./read-csv')
describe('Read CSV util', () => {
  test('should return 500 if no file is provided', async () => {
    const response = await readCSV()
    expect(response.httpResponse.statusCode).toBe(500)
    expect(response.httpResponse.body).toEqual({ error: 'No file provided' })
  })

  test('should return 400 if file provided is not CSV', async () => {
    const response = await readCSV('data.txt')
    expect(response.httpResponse.statusCode).toBe(400)
    expect(response.httpResponse.body).toEqual({ error: 'Uploaded file is not CSV' })
  })
})
