// import the express module
import express from "express";
// import the mongoose module
import mongoose from "mongoose";
// import the dotenv module
import dotenv from "dotenv";

// load environment variables from a .env file into process.env
dotenv.config();

// import the user routes
import userRoutes from "./routes/userRouter";
// import the artist routes
import artistRoutes from "./routes/artistRouter";
import newsLetterRoutes from "./routes/newsletterRouter";
import adminRoutes from "./routes/adminRouter";
import {setupCronJob} from "./controllers/cronJobEmails";
import imageRoutes from "./routes/imageRouter";

import songRoutes from "./routes/songRouter"

// create an express application
const app = express();
// use express.json middleware to parse incoming json requests
app.use(express.json());
// use express.urlencoded middleware to parse incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: false }));

// use the user routes for the application
app.use(userRoutes);

// use the artist routes for the application
app.use(artistRoutes);
app.use(songRoutes)
// use the newsLetter routes for the application
app.use(newsLetterRoutes);
// use the admin user routes for the application
app.use(adminRoutes);
// corn job
//setupCronJob();
// upload image
app.use(imageRoutes)



// async function to connect to the mongodb database
async function main() {
    // get the mongodb connection string from the environment variables
    const connectionString = process.env.MONGODB_CONNECTION_STRING;
    
    // if the connection string is not defined, throw an error
    if (!connectionString) {
        throw new Error('MONGODB_CONNECTION_STRING is not defined');
    }

    try {
        // try to connect to the mongodb database
        await mongoose.connect(connectionString);
        // log a success message if the connection is successful
        console.log("Connected to MongoDB database.");
    } 
    
    // catch any errors that occur during the connection
    catch (error) {
        // log the error
        console.log("Error connecting to MongoDB: ", error);
    }
}

// call the main function and catch any errors
main().catch(console.error);

// get the port from the environment variables or use 8080 as a default
const PORT = process.env.PORT || 8080;

// start the server listening on the specified port
app.listen(PORT, () => {
  // log a message indicating the port the server is listening on
  console.log("Server Listening on port: ", PORT);
});