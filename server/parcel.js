const path = require('path')
const proxy = require('http-proxy-middleware')
const Bundler = require('parcel-bundler')
const express = require('express')

let bundler = new Bundler('src/index.html')
let app = express()

app.get('/*.mp3', (req, res) => res.sendFile(req.url, {root: path.join(__dirname, '.')}))
// app.use('/public', express.static('../public'))
app.get('/public/data/song-data.json', (req, res) => res.sendFile('song-data.json', {root: path.join(__dirname, '../public/data')}))

app.use(bundler.middleware())

const port = Number(process.env.PORT || 1234)
app.listen(port, () => console.log(`listening ${port}`))
