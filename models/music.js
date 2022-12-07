const mongoose = require('mongoose')

const musicSchema = new mongoose.Schema({

    name: String,
    image: String,
    artist: String,
    album: String,
    genre: String,
    year: Number,
    favorite: Boolean,
    player: String

})

const Music = mongoose.model('Music', musicSchema)
module.exports = Music