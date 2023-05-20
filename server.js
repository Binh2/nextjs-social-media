var fs = require('fs');
const https = require('https')
const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: __dirname })
const handle = app.getRequestHandler()

const key = fs.readFileSync('ssl-certificates/localhost.key', 'utf8');
const cert = fs.readFileSync('ssl-certificates/localhost.crt', 'utf8');

var options = {
  // key: fs.readFileSync('ssl.key'),
  // cert: fs.readFileSync('ssl.crt'),
  // ca: [fs.readFileSync('root.crt')]
  key: key,
  cert: cert,
  // ca: [fs.readFileSync('rootCA.crt')]
};

app.prepare()
.then(() => {
  https.createServer(options, (req, res) => {
    handle(req, res);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on https://localhost:${port} on ${dev ? "development": "production"} mode.`)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})