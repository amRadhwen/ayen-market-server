const path = require('path');
const multer = require('multer');
const asyncHandler = require("express-async-handler");


const { 
    uploadUAvatar,

    uploadPCover,
    uploadPImages,
    uploadPVideo,

    uploadPtCover,
    uploadPtImages,
    uploadPtVideo
} = require("../utils/uploadHandler");


// user profile avatar
const uploadUserAvatar = asyncHandler(async (req, res) => {
    uploadUAvatar(req, res, (err) => {
        try {
            res.json({path: `/${req.file.destination.split("/")[req.file.destination.split("/").length - 1]}/${req.file.filename}`});
        }
        catch(error) {
            res.status(400).json({error: "Invalid Image File"});
            console.error(`${error.name}: ${error.message}(Invalid Image File)`);
        }
    })
})

//product

const uploadProductCover = asyncHandler( async (req, res) => {
    uploadPCover(req, res, (err)=>{
        try {
            res.json({path: `/${req.file.destination.split("/")[req.file.destination.split("/").length-2]}/${req.file.destination.split("/")[req.file.destination.split("/").length-1]}/${req.file.filename}`});
        }
        catch(error) {
            res.status(400).json({error: "Invalid Image File"});
            console.error(`${error.name}: ${error.message}(Invalid Image File)`);
        }
    })
    
})

// !!!!!!!!!!!!!!!!
// when images number bypass max count( in here it's 4)  it do the job with only the 4 images
// when a file is not a valid image it do the job from the index 0 to the index of the invalid file -1
// so this must be fixed
const uploadProductImages = asyncHandler( async (req, res) => {
    uploadPImages(req, res, (err)=>{
        if(!req.files.length){
            console.error("Empty Request");
            return res.status(400).json({error: "Empty request"});
        }
        try {
            let paths = [];
            req.files.forEach(file=>{
                paths.push(`/${file.destination.split("/")[file.destination.split("/").length-2]}/${file.destination.split("/")[file.destination.split("/").length-1]}/${file.filename}`);
            })
            res.status(200).json({paths});
        }
        catch(error) {
            res.status(400).json({error: "Invalid Image File"});
            console.error(`${error.name}: ${error.message}(Invalid Image File)`);
        }
    })
})

const uploadProductVideo = asyncHandler( async (req, res) => {
    uploadPVideo(req, res, (err)=>{
        try {
            res.json({path: `/${req.file.destination.split("/")[req.file.destination.split("/").length-2]}/${req.file.destination.split("/")[req.file.destination.split("/").length-1]}/${req.file.filename}`})
        }
        catch(error) {
            res.status(400).json({error: "Invalid Video File"});
            console.error(`${error.name}: ${error.message}(Invalid Video File)`);
        }
    })
})

// Posts

const uploadPostCover = asyncHandler( async (req, res) => {
    uploadPtCover(req, res, (err)=>{
        try {
            res.json({path: `/${req.file.destination.split("/")[req.file.destination.split("/").length-2]}/${req.file.destination.split("/")[req.file.destination.split("/").length-1]}/${req.file.filename}`});
        }
        catch(error) {
            res.status(400).json({error: "Invalid Image File"});
            console.error(`${error.name}: ${error.message}(Invalid Image File)`);
        }
    })
    
})


const uploadPostImages = asyncHandler( async (req, res) => {
    uploadPtImages(req, res, (err)=>{
        if(!req.files.length){
            console.error("Empty Request");
            return res.status(400).json({error: "Empty request"});
        }
        try {
            let paths = [];
            req.files.forEach(file=>{
                paths.push(`/${file.destination.split("/")[file.destination.split("/").length-2]}/${file.destination.split("/")[file.destination.split("/").length-1]}/${file.filename}`);
            })
            res.status(200).json({paths});
        }
        catch(error) {
            res.status(400).json({error: "Invalid Image File"});
            console.error(`${error.name}: ${error.message}(Invalid Image File)`);
        }
    })
})

const uploadPostVideo = asyncHandler( async (req, res) => {
    uploadPtVideo(req, res, (err)=>{
        try {
            res.json({path: `/${req.file.destination.split("/")[req.file.destination.split("/").length-2]}/${req.file.destination.split("/")[req.file.destination.split("/").length-1]}/${req.file.filename}`})
        }
        catch(error) {
            res.status(400).json({error: "Invalid Video File"});
            console.error(`${error.name}: ${error.message}(Invalid Video File)`);
        }
    })
})

module.exports = {
    uploadUserAvatar,
    
    uploadProductCover,
    uploadProductImages,
    uploadProductVideo,

    uploadPostCover,
    uploadPostImages,
    uploadPostVideo
}