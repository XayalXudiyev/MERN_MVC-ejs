import express from "express";
import dotenv from 'dotenv'
import conn from './db.js'
import pageRoute from './routes/pageRoute.js'
import photoRoute from './routes/photoRoute.js'
import userRoute from './routes/userRoute.js'

dotenv.config() 

//Conection to the Db
conn()

const app = express()
const port = process.env.PORT
const localhost = '127.0.0.1'

//ejs template engine
app.set('view engine', 'ejs')

// Static files
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Route
app.use('/', pageRoute)
app.use('/photos', photoRoute)
app.use('/users', userRoute)


app.listen(port, () => {
    console.log(`Server calisiyor, http://${localhost}:${port}`);
})

