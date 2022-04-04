const { uploadImage, uploadVideo } = require("../utils/fileHandler");

// user avatar
const uploadUAvatar = uploadImage(process.env.USERS_AVATARS_PATH).single("avatar");

// Product data
//const uploadPCover = uploadImage(process.env.PRODUCTS_COVERS_PATH).single("cover");
const uploadPVariant = uploadImage(process.env.PRODUCTS_VARIANTS_PATH).single("variant");
const uploadPPictures = uploadImage(process.env.PRODUCTS_PICTURES_PATH).array("pictures", 3);
const uploadPVideo = uploadVideo(process.env.PRODUCTS_VIDEOS_PATH).single("video");

// Post data
const uploadPtCover = uploadImage(process.env.POSTS_COVERS_PATH).single("cover");
const uploadPtImages = uploadImage(process.env.POSTS_IMAGES_PATH).array("images", 10);
const uploadPtVideo = uploadVideo(process.env.POSTS_VIDEOS_PATH).single("video");

module.exports = {
    // user avatar
    uploadUAvatar,
    //product
    uploadPPictures,
    uploadPVariant,
    uploadPVideo,
    //post
    uploadPtCover,
    uploadPtImages,
    uploadPtVideo
}