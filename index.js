require('dotenv').config()
const express = require('express')
const cors = require('cors')
const sequilize = require('./db')
const models = require('./models/models')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlerMiddleware')

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json());
app.use('/api', router)
app.use('/static', express.static('public'));

app.use(errorHandler)

const start = async () => {
  try {
    await sequilize.authenticate()
    await sequilize.sync({ alter: true })
    app.listen(PORT, ()=>{
      console.log(`Server started on port ${PORT} ...`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()