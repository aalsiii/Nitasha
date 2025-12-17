const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        default: 'Dr. Nitasha Buldeo'
    },
    content: {
        type: String,
        required: true
    },
    excerpt: {
        type: String, // Short summary for the list view
        required: true
    },
    coverImage: {
        type: String,
        required: false
    },
    category: {
        type: [String],
        default: ['General']
    },
    tags: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Blog', BlogSchema);
