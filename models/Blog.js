const mongoose = require('mongoose')
const User = require('./User')
const BlogSchema = mongoose.Schema({
    title: { type: String, required: [true, 'Blog Must have a Title'], trim: true },
    content: { type: String, required: [true, 'Blog Must have a Content'], trim: true },
    author: { type: mongoose.SchemaTypes.ObjectId, ref: "User", default: User._id },
    image: [{
        public_id: { type: String, required: true },
        url: { type: String, required: true }
    }],
    keywords: [{
        type: String,
        required: [true, 'Must Enter Atleast Two Comments']
    }],
    category: [{
        type: String,
        required: [true, 'Must Enter Atleast One Category']
    }],
    totalrating: { type: Number, default: 0 },
    totalViews: { type: Number, default: 0 },
    Comments: [{
        name: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true
        },
        Comment: {
            type: String,
            required: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            default: User._id
        },
    }],
    CreatedAt: { type: Date, default: Date.now }
},
    { timestamps: true }
)
module.exports = mongoose.model('Blog', BlogSchema, 'BlogPost')



// const CommentSchema = mongoose.Schema({
//     post: { type: mongoose.SchemaTypes.ObjectId, ref: 'Blog' },
//     name: { type: String, required: [true, 'Must Enter Your Name'] },
//     rating: { type: Number, required: true, default: 0, max: 5, min: 0 },
//     Comment: { type: String, required: [true, 'Must Enter a Comment'] },
//     createdBy: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' }
// })
// module.exports = mongoose.model('Comments', CommentSchema, 'Comment')