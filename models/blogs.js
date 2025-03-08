const mongoose = require('mongoose');

const blogsSchema = new mongoose.Schema({
    author: {
        type: String,
        // required: true
    },
    title: {
        type: String,
        // required: true
    },
    publishedAt: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
);

const Blogs = mongoose.model('Blogs', blogsSchema, 'Blogs');

module.exports = Blogs;