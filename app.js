import  express  from "express";
const app = express()
const port = 3000
const localhost = '127.0.0.1'

app.get('/', (req,res)=>{
    res.send('a')
})

app.listen(port, ()=>{
    console.log(`Server calisiyor, http://${localhost}:${port}`);
})

