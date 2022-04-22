const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    require: true,
    unique: true    
  },
  passwordHash: {
    type: String,
    require: true,   
  },
  favs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Favs'
    }]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User