const path = require('path')
const express = require('express')

const app = express()
const host = process.env.HOST || `http://localhost`
const port = process.env.PORT || 1337

const appRoot = './dist'
const publicDir = './public'

app.get('/', (req, res) => {
  res.sendFile('./index.html', {root: appRoot})
})

app.get('/sound.mp3', (req, res) => res.sendFile('sound.mp3', {root: path.join(__dirname, '.')}))

app.get('/*.(js|css)', (req, res) => {
  res.sendFile(req.path, {root: appRoot})
})

app.get('/public/*', (req, res) => {
  res.sendFile(req.path, {root: publicDir})
})

app.listen(port, () => {
  console.log(`${host}:${port}`)
})
