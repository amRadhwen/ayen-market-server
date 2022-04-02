const Router = require ("express").Router();

const {protectAdmin, protectUser} = require("../middlewares/authMiddleware");

const {
    uploadUserAvatar,
    uploadProductCover,
    uploadProductImages,
    uploadProductVideo,
    uploadPostCover,
    uploadPostImages,
    uploadPostVideo,
} = require("../controllers/uploadController");

Router.post("/user/cover", uploadUserAvatar);

Router.post("/product/cover", uploadProductCover);
Router.post("/product/images", uploadProductImages);
Router.post("/product/video", uploadProductVideo);

Router.post("/post/cover", uploadPostCover);
Router.post("/post/images", uploadPostImages);
Router.post("/post/video", uploadPostVideo);


module.exports = Router;