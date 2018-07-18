const path = require('path')
const proxy = require('http-proxy-middleware')
const Bundler = require('parcel-bundler')
const express = require('express')

let bundler = new Bundler('src/index.html')
let app = express()

// app.use(
//   '/sounds',
//   proxy({
//     target: 'http://www.soulwinning.info:80'
//   })
// )

app.get('/sound.mp3', (req, res) => res.sendFile('sound.mp3', {root: path.join(__dirname, '.')}))

app.use(bundler.middleware())

const port = Number(process.env.PORT || 1234)
app.listen(port, () => console.log(`listening ${port}`))
