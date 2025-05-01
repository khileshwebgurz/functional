const mongoose = require('mongoose')

const BookmarkSchema = new mongoose.Schema({
    postId: String,
    ip: String,
},{timestamps: true})

module.exports = mongoose.model('Bookmark', BookmarkSchema);