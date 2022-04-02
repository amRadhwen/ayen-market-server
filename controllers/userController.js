const {User} = require("../models/userModel");
const {generateToken}  = require("../utils/tokenGenerator.js");
const asyncHandler = require("express-async-handler");
const {handlePathError} = require("../middlewares/errMiddleware.js");

// authentificate user
// return user without password and jwt token
const authUser = asyncHandler(async (req, res)=>{
    if(Object.keys(req.body).length && req.body.login.length && req.body.password.length) {
        const {login, password} = req.body;
        const user = await User.findOne({email: login}) || await User.findOne({username: login});
        if(user && (await user.matchPassword(password))) {
            res.status(200)
               .json({
                user,
                token: generateToken(user._id)
            })
        }
        else {
            res.status(401).json({error: "Incorrect email, username or password"});
            throw new Error("Incorrect email, username or password");
        }

    }
    else {
        res.status(400).json({error: "Empty Request"});
        throw new Error("Empty Request");
    }
});

// create new user
// return user without password and jwt token
const createUser = asyncHandler(async (req, res)=>{
    if(Object.keys(req.body).length) {
        const {
            firstName,
            lastName,
            //username,
            tel,
            email,
            prov,
            addr,
            zip,
            password,
            birthDate,
            avatar
        } = req.body;
        const data = {
            firstName,
            lastName,
            tel,
            email,
            prov,
            addr,
            zip,
            password,
            birthDate,
            avatar
        };
        const userExists = await User.findOne({email})// || await User.findOne({username});
        if(userExists) {
            res.status(400).json({error: "User already exists"});
            throw new Error("User already exists");
        }
        try {
            console.log(data);
            const user = await User.create(data);
            res.status(200).json({
                user,
                token: generateToken(user._id)
            })
        }
        catch(err){
            res.status(400).json({error: "Invalid user data"});
            throw new Error("Invalid user data");
        }
    }
    else {
        res.status(400).json({error: "Empty request"});
        throw new Error("Empty Request");
    }
});


// get user 'profile' informations using token
// return user without password
const getUser = asyncHandler(async (req, res)=> {
    try {
        let user = await User.findById(req.user._id);
        const {firstName, lastName, username, email, tel, birthDate, prov, addr, zip, avatar, is_admin} = user;
        if(user) {
            res.json({
                user: {firstName, lastName, username, email, tel, birthDate, prov, addr, zip, avatar, is_admin}
            })
        }
        else {
            res.status(404).json({error: "User not found"});
            throw new Error("User not found");
        }
    }
    catch(error) {
        res.status(400).json({error: "Invalid user id"});
        throw new Error(error);
    }
});

// update user 'profile' informations using token
// return updated user without password
const updateUser = asyncHandler(async (req, res) => {
    if(Object.keys(req.body).length) {
        const user = await User.findById(req.user._id);
        if(user) {
            user.firstName = req.body.firstName || user.firstName;
            user.lastName = req.body.lastName || user.lastName;
            user.username = req.body.username || user.username;
            user.email = req.body.email || user.email;
            user.password = req.body.password || user.password;
            user.tel = req.body.tel || user.tel;
            user.prov = req.body.prov || user.prov;
            user.addr = req.body.addr || user.addr;
            user.zip = req.body.zip || user.zip;
            user.birthDate = req.body.birthDate || user.birthDate;
            user.avatar = req.body.avatar || user.avatar;

            try {
                const {firstName, lastName, username, email, tel, birthDate, prov, addr, zip, avatar} = await user.save();
                if(updateUser) {
                    res.status(200).json({
                        updatedUser: {firstName, lastName, username, email, tel, birthDate, addr, zip, avatar}
                    });
                }
                else {
                    res.status(400).json({error: "Invalid user data"});
                    throw new Error("Invalid user data");
                }
            }
            catch(error) {
                res.status(400).json({error: handlePathError(error)})
                throw new Error(error);
            }            
        }
        else {
            res.status(404).json({error: "User not found"});
            throw new Error("User not found")
        }

    }
    else {
        res.status(401).json({error: "Empty Request"});
        throw new Error("Empty Request");
    }
});


// delete user 'profile' using token
// return deleted user without password
const deleteUser = asyncHandler(async (req, res)=>{
    try {
        const user = await User.findById(req.user._id);
        if(user) {
            const deletedUser = user.remove();
            if(deletedUser) {
                res.status(200).json(user);
            }
            else {
                res.status(401).json({error: "Error deleting user"});
                throw new Error("Error deleting user");
            }
        }
        else {
            res.status(404).json({error: "User not found"});
        }
    }
    catch(error) {
        res.status(401).json({error: "Invalid user id"});
        throw new new Error(error.message);
    }
});

// get user by id using @params id
// return user without password

const getUserById = asyncHandler(async (req, res)=>{
    try {
        const user = await User.findById(req.params.id).select("-password");
        if(user) {
            res.status(200).json(user);
        }
        else {
            res.status(401).json({error: "User not found"});
            throw new Error("User not found");
        }
    }
    catch(error) {
        res.status(400).json({error: "Invalid user id"});
        throw new Error(error.message);
    }
})

// get users
// return user without password
const getUsers = asyncHandler(async (req, res)=>{
    const users = await User.find().select("-password");
    if(users) {
        res.status(200).json(users);
    }
    else {
        res.status(401).json({error: "No user found"});
    }
});

module.exports = {
    authUser,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getUserById,
    getUsers
}
