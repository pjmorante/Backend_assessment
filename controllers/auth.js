const { response } = require('express');
const bcrypt = require('bcrypt')
const User = require('../models/user');
const { getJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {

    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email })
        
        if (existingUser) {
            res.status(400).json({
                error: 'email must be unique'
            })
        }

        const saltRounds = bcrypt.genSaltSync();
        const passwordHash = bcrypt.hashSync(password, saltRounds);
    
        const user = new User({
            name,
            email,
            passwordHash,
        });
    
        const savedUser = await user.save();

        const token = await getJWT(user.id, user.name);
    
        res.status(201).json({savedUser, token});
    } catch (error) {
        console.log(error);
    }

}

const loginUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })
        
        const passwordCorrect = user === null
            ? false
            : bcrypt.compareSync(password, user.passwordHash)

        if (!(user && passwordCorrect)) {
            return res.status(401).json({
                error: 'invalid email or password'
            })
        }

        const token = await getJWT(user.id, user.name);

        res.json({
            ok: true,
            "msg": "login",
            token
        })
    } catch (error) {
        console.log(error);
    }

}

// const revalidateToken = (req, res = response) => {

//     res.json({
//         ok: true
//     })
// }

module.exports = {
    createUser,
    loginUser
}