const mongoose = require('mongoose')

const LikeSchema = new mongoose.Schema({
    postId: String,
    ip: String,
},{timestamps: true})

module.exports = mongoose.model('Like', LikeSchema);