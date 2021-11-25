require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
const routes = require('./src/routes')

const app = express()
const port = process.env.PORT || 5000

// entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apinewsdb.d2lqr.mongodb.net/APINewsDB?retryWrites=true&w=majority`,
      function (err){
          if(err) {
            console.log(err)
          }else{
          console.log('MongoDB successfully connected!')
        }
      }
  )  

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(routes)

app.listen(port, function(){
  console.log(`Server runing on port ${port}`)
})