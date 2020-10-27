const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  console.log('Someone is here...')
  res.send('Hello World!')
})

app.listen(port, '10.0.0.1', () => {
  console.log(`Example app listening at http://ip:${port}`)
})
