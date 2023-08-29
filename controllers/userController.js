import User from "../models/UserModel.js";      //User Modeli
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const createUser = async (req, res) => {        //DB da user yaratmaq
    try {
        const user = await User.create(req.body)
        res.redirect('/login')

    } catch (error) {
        res.status(500).json(
            {
                succeded: false,
                error
            })
    }
}


const loginUser = async (req, res) => {        //DB da user yaratmaq
    try {
        const { username, password } = req.body

        const loggedUser = await User.findOne({ username })

        let same = false

        if (loggedUser) {
            same = await bcrypt.compare(password, loggedUser.password)
        } else {
            return res.status(401).json({
                succeded: false,
                error: 'There is  no such user'
            })
        }
        if (same) {
            const token = createToken(loggedUser._id)
            res.cookie('jsonWebToken', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24,
            })
            res.redirect('/users/dashboard')
        } else {
            res.status(401).json({
                succeded: false,
                error: 'password are not matched'
            })
        }
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}


const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' })
}



const getDashboardpage = (req, res) => {
    res.render('dashboard', {
        link: "dashboard",
    })
}


export { createUser, loginUser, getDashboardpage };