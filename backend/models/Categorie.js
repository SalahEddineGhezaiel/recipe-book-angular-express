const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorieSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Categorie', categorieSchema);
