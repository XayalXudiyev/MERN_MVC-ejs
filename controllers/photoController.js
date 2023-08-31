import Photo from "../models/PhotoModel.js";     //Pgoto Modeli
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

const createPhoto = async (req, res) => {        //DB da photo yaratmaq
    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
            use_filename: true,
            folder: "lenslight"
        }
    )
    try {
        await Photo.create({
            name: req.body.name,
            description: req.body.description,
            user: res.locals.user._id,
            url: result.secure_url
        })

        fs.unlinkSync(req.files.image.tempFilePath) //tmp'den silir yükleme olandan sora

        res.status(201).redirect('/users/dashboard')
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        })
    }
}

const getAllPhotos = async (req, res) => {
    try {
      const photos = res.locals.user
        ? await Photo.find({ user: { $ne: res.locals.user._id } })
        : await Photo.find({});
      res.status(200).render('photos', {
        photos,
        link: 'photos',
      });
    } catch (error) {
      res.status(500).json({
        succeded: false,
        error,
      });
    }
  };

const getAPhoto = async (req, res) => {     //Db'dan istənilən id'yə görə photo gətirir
    try {
        const OnePhoto = await Photo.findById({ _id: req.params.id }).populate("user")
        res.status(200).render('photo', {
            OnePhoto,
            link: " photos"
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }
}

export { createPhoto, getAllPhotos, getAPhoto };