// imports 
const {Post} = require("../models/postModel");
const { ObjectId } = require("mongoose").Types;
const asyncHandler = require("express-async-handler");
const {handlePathError} = require("../middlewares/errMiddleware");


// create post
const createPost = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length) {
        let data = {title, introduction, paragraphs} = req.body;
        const user = req.user._id;
        data = {...data, user};
        try {
            const post = await Post.create(data);
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(400).json({error: "Invalid post data"});
                throw new Error("Invalid post data");
            }
        } catch (error) {
            res.status(400).json({error: handlePathError(error)});
            throw new Error(error.message);
        }
    } else {
        res.status(400).json({error: "Empty request"});
        throw new Error("Empty request");
    }
});


// get all posts
const getAllPosts = asyncHandler(async (req, res) => {
    const posts = Post.find().sort({"createdAt": -1}).populate("user", "first_name last_name email tel avatar username");
    if (posts.length) {
        res.status(200).json(posts);
    } else {
        res.status(404).json({error: "No posts found"})
        throw new Error("no posts found");
    }
});


// get my posts
const getMyPosts = asyncHandler(async (req, res) => {
    const myPosts = Post.find({"user": req.user._id}).populate("user", "first_name last_name email tel avatar username");
    if (myPosts) {
        res.status(200).json(myPosts);
    } else {
        res.status(404).json({error: "No posts found"});
        throw new Error("No posts found");
    }
});


// update post
const updatePost = asyncHandler(async (req, res) => {
    if(Object.keys(req.body).length) {
        try {
            const post = await Post.findById(req.params.id);
            if(post) {
                const {title, introduction, paragraphs} = req.body;
                post.title = title || post.title;
                post.introduction = introduction || post.introduction;
                post.paragraphs = paragraphs || post.paragraphs;
                try {
                    const updatedPost = await post.save();
                    if(updatedPost)
                        res.status(200).json(updatedPost)
                    else {
                        res.status(400).json({error: "Invalid post data"});
                        throw new Error("Invalid post data");
                    }
                }
                catch(error) {
                    res.status(400).json({error: handlePathError(error)});
                    throw new Error(handlePathError(error));
                }
            }
            else {
                res.status(404).json({error: "Post not found"});
                throw new Error("Post not found");
            }
        }
        catch(error) {
            res.status(400).json({error: "Invalid post id"});
            throw new Error("Invalid post id");
        }
    }
    else {
        res.status(400).json({error: "Empty request"});
        throw new Error("Empty request");
    }
});


// update my post
const updateMyPost = asyncHandler(async (req, res) => {
    if(Object.keys(req.body).length) {
        if(req.user._id === req.params.id) {
            try {
                const post = await Post.findById(req.params.id);
                if(post) {
                    const {title, introduction, paragraphs} = req.body;
                    post.title = title || post.title;
                    post.introduction = introduction || post.introduction;
                    post.paragraphs = paragraphs || post.paragraphs;
                    try {
                        const updatedPost = await post.save();
                        if(updatedPost)
                            res.status(200).json(updatedPost)
                        else {
                            res.status(400).json({error: "Invalid post data"});
                            throw new Error("Invalid post data");
                        }
                    }
                    catch(error) {
                        res.status(400).json({error: handlePathError(error)});
                        throw new Error(handlePathError(error));
                    }
                }
                else {
                    res.status(404).json({error: "Post not found"});
                    throw new Error("Post not found");
                }
            }
            catch(error) {
                res.status(400).json({error: "Invalid post id"});
                throw new Error("Invalid post id");
            }
        }
        else {
            res.status().json({error: "Invalid user id"});
            throw new Error("Invalid user id");
        }
    }
    else {
        res.status(200).json({error: "Empty request"});
        throw new Error("Empty request");
    }
})


// delete my post
const deleteMyPost = asyncHandler(async (req, res) => {
    if (req.user._id === req.params.id) {
        try {
            const post = await Post.findById(req.params.id);
            if (post) {
                const deletedPost = await post.remove();
                if (deletedPost) {
                    res.status(200).json(post);
                } else {
                    res.status(401).json({error: "Error deleting post"});
                    throw new Error("Error deleting post");
                }
            } else {
                res.status(404).json({error: "Post not found"});
                throw new Error("Post not found");
            }
        } catch (error) {
            res.status(400).json({error: "Invalid post id"});
            throw new Error("Invalid post id");
        }
    } else {
        res.status(400).json({error: "Invalid user id"});
        throw new Error("Invalid user id");
    }
})


// delete post
const deletePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post) {
            const deletedPost = await post.remove();
            if (deletedPost) {
                res.status(200).json(post);
            } else {
                res.status(401).json({error: "Error deleting post"});
                throw new Error("Error deleting post");
            }
        } else {
            res.status(404).json({error: "Post not found"});
            throw new Error("Post not found");
        }
    } catch (error) {
        res.status(400).json({error: "Invalid post id"});
        throw new Error("Invalid post id");
    }
})


// get post by ID
const getPostById = asyncHandler(async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id).populate("user", "_id first_name last_name tel email avatar username");
        if(post) {
            res.status(200).json(post);
        }
        else {
            res.status(404).json({error: "Post not found"});
            throw new Error("Post not found");
        }
    }
    catch(error) {
        res.status(400).json({error: "Invalid Post id"});
        throw new Error("Invalid post id");
    }
});

const likeDislikePost = asyncHandler(async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(post) {
            if(post.likes.includes(req.user._id)) {
                try {
                    post.likes = post.likes.filter(like => like.toString() !== req.user._id.toString()) || post.likes;
                    const liked = await post.save();
                    res.status(200).json({disliked: true});
                }
                catch(err) {
                    res.status(400).json({error: "Cannot Apply dislike Operation"});
                    throw new Error("Cannot Apply Operation");
                }
            }
            else {
                try {
                    post.likes = [...post.likes, req.user._id] || post.likes;
                    const liked = await post.save();
                    res.status(200).json({liked: true});
                }
                catch(err) {
                    res.status(400).json({error: "Cannot Apply like Operation"});
                    throw new Error("Cannot Apply Operation");
                }
            }
            
        }
        else {
            res.status(404).json({error: "Post not found"});
            throw new Error("Post Not Found");
        }
    }
    catch(error) {
        res.status(400).json({error: "Invalid post id"});
        throw new Error("Invalid Post ID");
    }
})

// export methods
module.exports = {
    createPost,
    getAllPosts,
    getMyPosts,
    getPostById,
    updateMyPost,
    updatePost,
    deleteMyPost,
    deletePost,
    likeDislikePost
}