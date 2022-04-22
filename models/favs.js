const mongoose = require('mongoose');
const { object } = require('prop-types');

const favsSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  favs: [String],
  description: String,
  link: String,
  user: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
})
favsSchema.method('toJSON', function(){
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
})

const Favs = mongoose.model('Favs', favsSchema);

module.exports = Favs;