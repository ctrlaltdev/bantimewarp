const Table = require('./Table')

const ChanStruc = {
  name: 'TEXT UNIQUE'
}

const Chans = new Table('chans')
Chans.define(ChanStruc)

Chans.sync()

Chans.create = function (name) {
  return new Promise((res, rej) => {
    this.db.run('INSERT INTO chans (name) VALUES(?)', name, (err, row) => {
      if (err) rej(err)
      res(row)
    })
  })
}

Chans.read = function (name) {
  return new Promise((res, rej) => {
    this.db.get('SELECT * FROM chans WHERE name = ?', name, (err, row) => {
      if (err) rej(err)
      res(row)
    })
  })
}

Chans.list = function () {
  return new Promise((res, rej) => {
    this.db.all('SELECT * FROM chans', (err, rows) => {
      if (err) rej(err)
      res(rows)
    })
  })
}

Chans.delete = function (name) {
  return new Promise((res, rej) => {
    this.db.run('DELETE FROM chans WHERE name = ?', name, (err, row) => {
      if (err) rej(err)
      res(row)
    })
  })
}

module.exports = Chans
