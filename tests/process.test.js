const { afterEach, beforeEach, describe, test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs/promises')
const os = require('node:os')
const path = require('node:path')
const { executeProcess } = require('../process/process')

describe('file organization process', () => {
  let directory
  let configuration

  beforeEach(async () => {
    directory = await fs.mkdtemp(path.join(os.tmpdir(), 'folder-organizer-'))
    configuration = {
      idioma: 'espanol',
      rutaAOrganizar: directory,
      carpetas: [
        { texto: 'PDF', extencion: 'pdf' },
        { texto: 'Word', extencion: 'docx' }
      ]
    }
  })

  afterEach(async () => {
    await fs.rm(directory, { recursive: true, force: true })
  })

  test('organizes known files, unknown files, and ignores incomplete downloads', async () => {
    await fs.writeFile(path.join(directory, 'report.pdf'), 'pdf')
    await fs.writeFile(path.join(directory, 'document.doc'), 'doc')
    await fs.writeFile(path.join(directory, 'document.docx'), 'docx')
    await fs.writeFile(path.join(directory, 'download.crdownload'), 'partial')

    await executeProcess(configuration)

    assert.strictEqual(await fs.readFile(path.join(directory, 'PDF', 'report.pdf'), 'utf8'), 'pdf')
    assert.strictEqual(await fs.readFile(path.join(directory, 'Word', 'document.docx'), 'utf8'), 'docx')
    assert.strictEqual(await fs.readFile(path.join(directory, 'Otros', 'document.doc'), 'utf8'), 'doc')
    assert.strictEqual(await fs.readFile(path.join(directory, 'download.crdownload'), 'utf8'), 'partial')
  })

  test('renames a file when its destination already exists', async () => {
    await fs.mkdir(path.join(directory, 'PDF'))
    await fs.writeFile(path.join(directory, 'PDF', 'report.pdf'), 'existing')
    await fs.writeFile(path.join(directory, 'PDF', 'report (1).pdf'), 'existing numbered')
    await fs.writeFile(path.join(directory, 'report.pdf'), 'new')

    await executeProcess(configuration)

    assert.strictEqual(await fs.readFile(path.join(directory, 'PDF', 'report.pdf'), 'utf8'), 'existing')
    assert.strictEqual(await fs.readFile(path.join(directory, 'PDF', 'report (1).pdf'), 'utf8'), 'existing numbered')
    assert.strictEqual(await fs.readFile(path.join(directory, 'PDF', 'report (2).pdf'), 'utf8'), 'new')
  })

  test('processes only files discovered in each scan', async () => {
    await fs.writeFile(path.join(directory, 'first.pdf'), 'first')
    await executeProcess(configuration)
    await fs.writeFile(path.join(directory, 'second.pdf'), 'second')

    await executeProcess(configuration)

    assert.strictEqual(await fs.readFile(path.join(directory, 'PDF', 'first.pdf'), 'utf8'), 'first')
    assert.strictEqual(await fs.readFile(path.join(directory, 'PDF', 'second.pdf'), 'utf8'), 'second')
  })
})
