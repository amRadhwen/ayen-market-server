const { Schema, model } = require("mongoose");


const commentModel = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    likes: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    }]
}, {
    timestamps: true
})

module.exports.Comment = model("Comment", commentModel);