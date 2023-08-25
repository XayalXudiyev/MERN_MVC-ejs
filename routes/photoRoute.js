import  express from "express";
import * as photoController from '../controllers/photoController.js'

const router = express.Router()

router.route('/').post(photoController.createPhoto) 

// router.route('/about').get(pageController.getAboutPage) 

export default router