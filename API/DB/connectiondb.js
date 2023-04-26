const mongoose = require('mongoose')

const dbConnection = ()=>{
    return mongoose.connect(
        'mongodb://127.0.0.1:27017/e-commerce'
    ).then(
        console.log('Server connected to the db')
    )
}
module.exports = dbConnection