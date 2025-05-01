const {userModel} = require("../DB/model.js")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config()


const login = async (req, res, next) => {
    try {
        const user = await userModel.findOne({username: req.body.username}).exec()
        if(user){
            const match = await bcrypt.compare(req.body.password, user.password)
            if(match){
                const token = jwt.sign({"username": user.username}, process.env.SECRET_KEY, { expiresIn: '1d'});
                res.status(200).json({user, token})
            }else{
                throw new Error("Username and password doesn't match")
            }
            
        }else{
            res.status(404).json({
                status: "fail",
                message: "User not found"
            })
        }
          
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        })
        
    }

}
const signUp = async (req, res, next) => {
    try {
        const user = await userModel.findOne({username: req.body.username}).exec()
        if(user){
            // Can't sign up, user already exist
            throw new Error('Username already exist')
        }else{
            const hash = await bcrypt.hash(req.body.password, saltRounds)        
            if(hash){
                const newUser = await userModel.create({username: req.body.username, password: hash})
                // Add token
                const token = jwt.sign({"username": newUser.username}, process.env.SECRET_KEY, { expiresIn: '1d'});
                res.setHeader('Authorization', `Bearer ${token}`);
                res.status(200).json({newUser, token})
            }else{
                if(err) throw new Error('Can not hash the password')
            }
        }
        
    } catch (error) {        
        res.status(500).json({
            status: "fail",
            message: error.message
        })
        
    }

}
const logOut = async (req, res, next) => {
    try {
        jwt.sign(req.user, process.SECRET_KEY, { expiresIn: 0});
        res.status(204).json({
            status: "deleted"
        })
        
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        })
    }
}
const getUser = async(req,res)=>{
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        
        if (!token) return res.sendStatus(401);

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err)return res.status(403).json({message: "Session expired"})
            req.user = user;
            res.status(200).json({user})
        });
    } catch (error) {
        res.status(401).json({err: error.message})
    }
}
module.exports = {login, logOut, signUp, getUser}

// Understanding jsonwebtoken and contuine working on the log in functionality