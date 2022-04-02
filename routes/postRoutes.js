const Router = require("express").Router();
const {
    createPost,
    getAllPosts,
    getMyPosts,
    getPostById,
    updateMyPost,
    updatePost,
    deletePost,
    deleteMyPost,
    sharePost,
    likeDislikePost
} = require("../controllers/postControllers");

const {
    protectUser,
    protectAdmin
} = require("../middlewares/authMiddleware");


Router.route("/")
    .post(protectAdmin, createPost)
    .get(protectUser, getAllPosts);

Router.route("/:id")
    .get(protectUser, getPostById)
    .put(protectAdmin, updateMyPost)
    .delete(protectAdmin, deleteMyPost);

Router.route("/admin/")
    .get(protectAdmin, getMyPosts);

Router.route("/admin/:id")
    .put(protectAdmin, updatePost)
    .delete(protectAdmin, deletePost);

Router.route("/likedislike/:id")
    .put(protectUser, likeDislikePost);

//Router.route("/dislike/:id")
//    .put(protectUser, dislikePost);
//
//Router.route("/share/:id")
//    .put(protectUser, sharePost);


module.exports = Router;