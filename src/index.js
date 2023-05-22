const express = require('express')
const cors = require('cors');
const logger = require('./middlewares/logger')
const errorHandler = require('./middlewares/error')
const parking = require('./parking/routes')

const app = express()

app.use(express.json())
app.use(cors())
app.use(logger())

app.use('/parking', parking)

app.use(errorHandler)

const server = app.listen(3001, '0.0.0.0', () => {
  console.log('Server started')
});

server.once('error', (error) => {
  console.error(error)
  process.exit(1)
})