const express = require('express')
const bodyParser = require('body-parser')
const userRoute = require('./routes/userRoute')
const database = require('./db/database')
const port = 3000
app = express()

app.use(bodyParser.urlencoded({extended: false}))
userRoute(app)


database.connect().then(()=>{
    app.listen(port, ()=> console.log('Api Rodando.......'))
})




