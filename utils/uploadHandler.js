const { uploadImage, uploadVideo } = require("../utils/fileHandler");

// user avatar
const uploadUAvatar = uploadImage(process.env.USERS_AVATARS_PATH).single("avatar");

// Product data
const uploadPCover = uploadImage(process.env.PRODUCTS_COVERS_PATH).single("cover");
const uploadPImages = uploadImage(process.env.PRODUCTS_IMAGES_PATH).array("images", 3);
const uploadPVideo = uploadVideo(process.env.PRODUCTS_VIDEOS_PATH).single("video");

// Post data
const uploadPtCover = uploadImage(process.env.POSTS_COVERS_PATH).single("cover");
const uploadPtImages = uploadImage(process.env.POSTS_IMAGES_PATH).array("images", 10);
const uploadPtVideo = uploadVideo(process.env.POSTS_VIDEOS_PATH).single("video");

module.exports = {
    // user avatar
    uploadUAvatar,
    //product
    uploadPCover,
    uploadPImages,
    uploadPVideo,
    //post
    uploadPtCover,
    uploadPtImages,
    uploadPtVideo
}