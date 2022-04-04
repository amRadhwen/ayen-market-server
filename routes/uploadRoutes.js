const Router = require ("express").Router();

const {protectAdmin, protectUser} = require("../middlewares/authMiddleware");

const {
    uploadUserAvatar,
    uploadProductPictures,
    uploadProductVariant,
    uploadProductVideo,
    uploadPostCover,
    uploadPostImages,
    uploadPostVideo,
} = require("../controllers/uploadController");

Router.post("/user/avatar", uploadUserAvatar);

Router.post("/product/pictures", protectUser, (uploadProductPictures));
Router.post("/product/variant", protectUser, uploadProductVariant);
Router.post("/product/video", protectUser, uploadProductVideo);

Router.post("/post/cover", protectAdmin, uploadPostCover);
Router.post("/post/images", protectAdmin, uploadPostImages);
Router.post("/post/video", protectAdmin, uploadPostVideo);


module.exports = Router;