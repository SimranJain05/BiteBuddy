const mongoose = require('mongoose');
require('dotenv').config()

// url from connecting with mongodb driver of database
// const mongoURI = 'mongodb+srv://Simranjain:98765431@bite-buddy.5ip3mey.mongodb.net/Bite-Buddy-DB?retryWrites=true&w=majority&appName=Bite-Buddy'

// to connect with database
const connectToDB = async() => {
    await mongoose.connect(process.env.MONGO_URL)
    try{
        console.log("Database connected successfully")

        //    Read data from database

        const fetched_data =  mongoose.connection.db.collection("FoodItems");  // connecting a collection and store its data 

        //  {} empty curly braces means whole data
        //  find method returns the data and we convert it to array 
        
        const data = await fetched_data.find({}).toArray()
        global.FoodItems = data
        // console.log(global.FoodItems);

        const foodCollection  = mongoose.connection.db.collection("FoodCategory");
        const catData = await foodCollection.find({}).toArray()
        global.FoodCategory = catData;
    }
    catch(err){
        console.error(`Error connecting to the database: ${err}`)
    };
}

// exporting function
module.exports =  connectToDB;
