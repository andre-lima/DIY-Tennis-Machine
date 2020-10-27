const express = require('express')
const app = express()
const port = 3000
const ip = "192.168.4.1"

app.get('/', (req, res) => {
  console.log('Someone is here...')
  res.send('Hello World!')
})

app.listen(port, ip, () => {
  console.log(`Example app listening at http://${ip}:${port}`)
})
