const { getAccesstoken } = require("../config")
const Blog = require("../models/Blog")
const ErrorCover = require("../utils/ErrorCover")
const path = require("path");
const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
const User = require("../models/User")

const home = (req, res, next) => {
    res.sendFile(path.join(__dirname, '/Home.html'));
}

const Createpost = async (req, res, next) => {
    try {
        const { title, content, author, image, category, keywords } = req.body
        const checkpost = await Blog.findOne({ title, content, author, category, keywords });
        console.log(checkpost)
        if (checkpost) {
            return next(new ErrorCover('Same Blog Post is Already Existed', 500))
        }
        const newblog = await Blog.create({
            title: title,
            content: content,
            author: author,
            image: image,
            keywords: keywords,
            category: category,
        });
        if (newblog) {
            return res.status(200).json({ message: 'Blog Post Created Successfully' })
        }
    } catch (error) {
        return next(new ErrorCover(error.message, error.status))
    }
}

const updateBlog = async (req, res, next) => {
    const blogid = req.params.id;
    let Userdata;
    try {
        const token = req.cookies.cookie;
        const verifytoken = jwt.verify(token, getAccesstoken);
        const userId = verifytoken.userid; // Remove the await as jwt.verify doesn't return a promise
        Userdata = await User.findById(userId);
    } catch (error) {
        return next(new ErrorCover(error.message, error.status));
    }

    if (!Userdata) {
        return next(new ErrorCover('User not found', 404));
    }

    const findblog = await Blog.findById(blogid);
    console.log(Userdata);
    const Id = Userdata._id;
    if (findblog.author.toString() !== Id.toString()) {
        return next(new ErrorCover('Only Blog Author can Update the Post', 403));
    }

    try {
        const { title, content, author, image, category, keywords } = req.body;

        const updatedBlog = await Blog.findByIdAndUpdate(
            blogid,
            {
                title,
                content,
                author,
                image,
                category,
                keywords,
            },
            { new: true }
        );

        if (updatedBlog) {
            return res.status(200).json({ message: 'Blog Post Updated Successfully' });
        }
    } catch (error) {
        return next(new ErrorCover(error.message, error.status));
    }
};

const deleteBlogPost = async (req, res, next) => {
    const blogId = req.params.id;

    try {
        // Check if the blog post exists
        const blogPost = await Blog.findById(blogId);
        if (!blogPost) {
            return next(new ErrorCover('Blog post not found', 404));
        }

        let Userdata;
        try {
            const token = req.cookies.cookie;
            const verifytoken = jwt.verify(token, getAccesstoken);
            const userId = verifytoken.userid; // Remove the await as jwt.verify doesn't return a promise
            Userdata = await User.findById(userId);
        } catch (error) {
            return next(new ErrorCover(error.message, error.status));
        }

        if (blogPost.author.toString() !== Userdata._id.toString()) {
            return next(new ErrorCover('You are not authorized to delete this blog post', 403));
        }

        // Delete the blog post
        await blogPost.deleteOne({ _id: blogId });

        return res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        return next(new ErrorCover(error.message, error.status));
    }
};



const ReadallPost = async (req, res, next) => {
    try {
        const allpost = await Blog.find()
            .populate({
                path: "author",
                select: "name email", // Specify the fields to include for the author
            })
            .populate({
                path: "Comments",
                populate: {
                    path: "createdBy",
                    model: "User",
                    select: "name email",
                },
            });

        if (allpost.length === 0) {
            return next(
                new ErrorCover(
                    'We do not have any Blog Posts yet. If you are an Author, please create a Blog Post',
                    400
                )
            );
        }

        return res.status(200).json(allpost);
    } catch (error) {
        return next(new ErrorCover(error.message, error.status));
    }
};


const AddComment = async (req, res, next) => {
    const blogId = req.params.id;
    const { name, rating, Comment } = req.body;
    console.log(`${name} ${rating} ${Comment}`);
    try {
        const findBlog = await Blog.findById({ _id: blogId });
        console.log(findBlog);
        let Userdata;
        try {
            const token = req.cookies.cookie;
            const verifytoken = jwt.verify(token, getAccesstoken);
            const userId = await verifytoken.userid;
            Userdata = await User.findById({ _id: userId });
        } catch (error) {
            return next(new ErrorCover(error.message, error.status));
        }
        console.log('userdata ' + Userdata._id);
        let newComment = {
            name: name,
            rating: Number(rating),
            Comment: Comment,
            createdBy: Userdata._id,
        };
        let added = false; // Initialize added as false
        let UserdataId = Userdata._id;
        findBlog.Comments?.forEach((item) => {
            console.log(`item ${item}`);
            // if User Comment is already existed then update it
            if (item?.createdBy === UserdataId) {
                item.name = name;
                item.rating = Number(rating);
                item.Comment = Comment;
                item.createdBy = UserdataId;
                added = true; // Set added to true if the comment is updated
            }
        });

        // If the comment is not updated, add it as a new comment
        if (!added) {
            findBlog.Comments?.unshift(newComment);
            added = true;
        }

        // calculate total rating
        let tutrating = 0;
        findBlog.Comments?.forEach((e) => {
            tutrating = tutrating + e?.rating;
        });
        console.log(`tutrating ${tutrating}`);

        // let's update total rating of the Blog
        findBlog.totalrating = tutrating / findBlog?.Comments?.length;
        await findBlog.save(); // Save the changes to the blog

        return res
            .status(200)
            .json({ message: 'Comment Added Successfully', newComment, added });
    } catch (error) {
        return next(new ErrorCover(error.message, error.status));
    }
};

const getallComment = async (req, res, next) => {
    try {
        const postid = req.params.id;
        const getpost = await Blog.findById({ _id: postid });
        if (!getpost) {
            return next(new ErrorCover('Blog Post not Existed or Might be deleted By the Author', 400))
        }
        const allcomment = getpost.Comments
        return res.status(200).json({ message: 'All Comments found', allcomment })
    } catch (error) {
        return next(new ErrorCover(error.message, error.status));
    }
}

const BlogById = async (req, res, next) => {
    try {
        const Blogid = req.params.id;
        const findBlog = await Blog.findById({ _id: Blogid }).populate(
            "author",
            "name email"
        );
        if (!findBlog) {
            return next(new ErrorCover('Blog Post not Existed or Might be deleted By the Author', 400))
        }
        findBlog.totalViews += 1;
        findBlog.save();
        return res.status(200).json(findBlog)
    } catch (error) {
        return next(new ErrorCover(error.message, error.status));
    }
}

module.exports = { home, Createpost, ReadallPost, AddComment, getallComment, BlogById, updateBlog, deleteBlogPost }