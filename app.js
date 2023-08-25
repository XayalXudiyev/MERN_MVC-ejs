import express from "express";
import dotenv from 'dotenv'
import conn from './db.js'
import pageRoute from './routes/pageRoute.js'
import photoRoute from './routes/photoRoute.js'

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

//
app.use('/', pageRoute)
app.use('/photos', photoRoute)

// app.get('/', (req, res) => {
//     res.render('index')
// })

// app.get('/about', (req, res) => {
//     res.render('about')
// })

app.listen(port, () => {
    console.log(`Server calisiyor, http://${localhost}:${port}`);
})

