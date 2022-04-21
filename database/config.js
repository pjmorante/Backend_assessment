const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('DB Online')
    } catch (error) {
        throw new Error('There is not connection')
    }
    
}
module.exports = { dbConnection }