const mongoose = require('mongoose')

const Schema = mongoose.Schema
const FileSchema = new Schema({
    file: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model('filesPDFJS', FileSchema)