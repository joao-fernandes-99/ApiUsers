const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const config = {
    uri: 'mongodb+srv://api:123@cluster0.5ggmu.mongodb.net/<dbname>?retryWrites=true&w=majority',
    options:{
        useNewUrlParser: true,
        useFindAndModify: false,
    },
}

mongoose.connection.on('open', ()=>{
    console.log('Sucesso ao conectar ao Banco de dados Mongo')
})

mongoose.connection.on('error',()=>{
    throw new Error('Não foi possivel conectar ao banco de Dados Mongo')
})

module.exports = {
    connect: ()=> mongoose.connect(config.uri, config.options)
}