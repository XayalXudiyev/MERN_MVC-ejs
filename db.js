import mongoose from "mongoose";

const conn = () => {
    mongoose.connect(process.env.DB_URI, {
        dbName: 'Lenslight',
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Connected to the DB succesfully');
    }).catch((err) => {
        console.log(`Db connection err:, ${err}`);
    })
}

export default conn; 