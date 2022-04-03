const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },/*
    username: {
        type: String,
        required: true,
        unique: true
    },*/
    tel: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    prov: {
        type: String,
        required: true
    },
    addr: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String
    }
}, {
    timestamps: true
})


//middlewares

//check passwords match
userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

//encrypt password before save
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

module.exports.User = model("User", userSchema);

