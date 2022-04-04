const { Schema, model } = require("mongoose");


const newsletterSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    email: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});