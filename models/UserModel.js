import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({

    username: {
        type: String,
    },
    email: {
        type: String,

    },
    password: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true
    })

userSchema.pre("save", function (next) {
    const user = this
    bcrypt.hash(user.password, 10, (err, hash) => {
        user.password = hash
        next()
    })
})

const User = mongoose.model("User", userSchema)

export default User;