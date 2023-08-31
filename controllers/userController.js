import User from "../models/UserModel.js";      //User Modeli
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import Photo from "../models/PhotoModel.js";

const createUser = async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.create(req.body);
        console.log(user);

        res.status(201).json({ user: user._id });
    } catch (error) {
        console.log('ERROR', error);

        let errors2 = {};

        if (error.code === 11000) {
            errors2.email = 'The Email is already registered';
        }

        if (error.name === 'ValidationError') {
            Object.keys(error.errors).forEach((key) => {
                errors2[key] = error.errors[key].message;
            });
        }
        res.status(400).json(errors2);
    }
};


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

const getDashboardpage = async (req, res) => {
    const photos = await Photo.find({ user: res.locals.user._id })
    res.render('dashboard', {
        link: "dashboard",
        photos
    })
}

const getAllUsers = async (req, res) => {      //DB dan photoları gətirir
    try {
        const users = await User.find({ _id:{$ne:res.locals.user._id}})
        res.status(200).render('users', {
            users,
            link: "users"
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        })
    }
}


const getAUser = async (req, res) => {     //Db'dan istənilən id'yə görə user gətirir
    try {
        const user = await User.findById({ _id: req.params.id })
        const photos = await User.find({user:res.locals.user._id})
        res.status(200).render('user', {
            user,
            photos,
            link: " users"
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}

export { createUser, loginUser, getDashboardpage, getAllUsers, getAUser };