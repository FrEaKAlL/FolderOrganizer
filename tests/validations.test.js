const { afterEach, beforeEach, describe, test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const validations = require('../utils/validations')

describe('validations', () => {
  let directory

  beforeEach(() => {
    directory = fs.mkdtempSync(path.join(os.tmpdir(), 'folder-organizer-'))
  })

  afterEach(() => {
    fs.rmSync(directory, { recursive: true, force: true })
  })

  test('detects existing and missing directories', () => {
    assert.strictEqual(validations.directoryExist(directory), true)
    assert.strictEqual(validations.directoryExist(path.join(directory, 'missing')), false)
  })

  test('creates a directory', () => {
    const newDirectory = path.join(directory, 'new-directory')

    validations.createDirectory(newDirectory)

    assert.strictEqual(validations.directoryExist(newDirectory), true)
  })
})
