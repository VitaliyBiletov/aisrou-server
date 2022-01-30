require('dotenv').config()
const express = require('express')
const cors = require('cors')
const sequilize = require('./db')

const PORT = process.env.PORT || 5000
const app = express()

const start = async () => {
  try {
    // await sequilize.authenticate()
    // await sequilize.sync()
    app.listen(PORT, ()=>{
      console.log(`Server started on port ${PORT} ...`)
    })
  } catch (e) {
    console.log(e)
  }
}

app.use(cors())
app.use(express.json());
app.use('/static', express.static('public'));

app.post('/', (req,res)=>{
  res.json({name: 'vb'})
})

start()