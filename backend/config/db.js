// config/db.js

import mongoose from 'mongoose';

const connectDB = async () => {


    console.log('Mongo URI: ', process.env.MONGO_URI);
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://naolkecha:Naol22@cluster0.6o1omco.mongodb.net/job_portal',
             {
            useNewUrlParser: true,
        });

        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

export default connectDB;


