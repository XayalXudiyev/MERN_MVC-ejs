import mongoose from "mongoose";
import { Schema } from "mongoose";

const photoSchema = new Schema({

    name: {
        type: String,
        required: true

    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    uploadAt: {
        type: Date,
        default: Date.now
    }
}

)

const Photo = mongoose.model("Photo", photoSchema)

export default Photo;