const {userModel} = require("../DB/model.js")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const saltRounds = 10;


const login = async (req, res, next) => {
    try {
        const user = await userModel.findOne({username: req.body.username}).exec()
        if(user){
            if(bcrypt.compare(req.body.password,user.password)){
                // Add token
                const token = jwt.sign({"username": user.username}, 'secret', { expiresIn: '60s'});
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
        const hash = await bcrypt.hash(req.body.password, saltRounds)        
        if(hash){
            const user = await userModel.create({username: req.body.username, password: hash})
            // Add token
            const token = jwt.sign({"username": user.username}, 'secret', { expiresIn: '60s'});
            res.setHeader('Authorization', `Bearer ${token}`);
            res.status(200).json({user, token})


        }else{
            if(err) throw new Error('Can not hash the password');

        }
        ;
        
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error.message
        })
        
    }

}
const logOut = async (req, res, next) => {
    try {
        jwt.sign(req.user, 'secret', { expiresIn: 0});
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
module.exports = {login, logOut, signUp}