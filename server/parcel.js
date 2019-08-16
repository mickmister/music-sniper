// Copyright (c) 2018-present Kochell Software. All Rights Reserved.
// See LICENSE.txt for license information.

const path = require('path')
const proxy = require('http-proxy-middleware')
const Bundler = require('parcel-bundler')
const express = require('express')
const cors = require('cors')

require('dotenv').config()

let bundler = new Bundler('src/index.html')
let app = express()
app.use(cors())

// app.use('/public', express.static('../public'))
app.get('/public/data/song-data.json', (req, res) => res.sendFile('song-data.json', {root: path.join(__dirname, '../public/data')}))

app.use('/api', proxy({target: 'http://localhost:3000', pathRewrite: {'^/api': ''}}));
app.use('/audio_files', proxy({target: 'http://localhost:3000'}));
app.use('/authentication', proxy({target: 'http://localhost:3000'}));
app.use('/rails', proxy({target: 'http://localhost:3000'}));

app.get('/*.mp3', (req, res) => res.sendFile(req.url, {root: path.join(__dirname, '.')}))
app.use(bundler.middleware())

const port = Number(process.env.PORT || 1234)
app.listen(port, () => console.log(`listening ${port}`))
