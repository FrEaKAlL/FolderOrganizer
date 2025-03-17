const { describe, test } = require('node:test')
const assert = require('node:assert')

const validations = require('../utils/validations')

describe('tests begin for the validation file', () => {
  test('when the directory exists', () => {
    const resultado = validations.directoryExist('c:/')
    assert.strictEqual(resultado, true)
  })
  test('when the directory not exists', () => {
    const resultado = validations.directoryExist('x:/')
    assert.strictEqual(resultado, false)
  })
})