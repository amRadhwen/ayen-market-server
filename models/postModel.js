const { Schema, model } = require("mongoose");


const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    cover: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    introduction: {
        type: String,
        required: true
    },
    paragraphs: [{
        title: {
            type: String
        },
        //content is a html code (can contain links and others tags) !!!!!!!!!!!!!!!!!!!!!!!!!!
        content: {
            type: String,
            required: true
        },
        images: [{
            type: String
        }],
        video: {
            type: String
        }
    }],
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    ],
    shares: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    }]
}, {
    timestamps: true
})

module.exports.Post = model("post", postSchema);