const express = require('express')
const app = express()
const host = process.env.HOST || `http://localhost`
const port = process.env.PORT || 1337

const appRoot = './dist'

app.get('/', function (req, res) {
  res.sendFile('./index.html', {root: appRoot})
})

app.get('/*.js', function (req, res) {
  res.sendFile(req.path, {root: appRoot})
})

app.listen(port, () => {
  console.log(`${host}:${port}`)
})
