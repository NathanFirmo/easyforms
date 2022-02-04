const api = require('../api/index')
test('Send an email', async () => {
  jest.setTimeout(10000)
  const req = {
    body: {
      name: 'jest',
      destiny: 'easyforms@alwaysdata.net',
      email: 'easyforms@alwaysdata.net',
      message: 'The api passed on the tests.'
    },
    isTest: true
  }
  const data = await api(req)
  expect(data.messageId).toBeDefined()
})
