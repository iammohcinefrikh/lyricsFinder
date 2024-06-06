import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import userRoutes from "./routes/userRouter";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(userRoutes);

// Correctly named async function
async function main() {
    const connectionString = process.env.MONGODB_CONNECTION_STRING;
    if (!connectionString) {
        throw new Error('MONGODB_CONNECTION_STRING is not defined');
    }

    try {
        await mongoose.connect(connectionString);
        console.log("Connected to MongoDB database.");

        const PORT = process.env.PORT || 8080;

        app.listen(PORT, () => {
          console.log("Server Listening on port: ", PORT);
        });
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error);
    }
}

// Call the async function
main().catch(console.error); // Handle errors