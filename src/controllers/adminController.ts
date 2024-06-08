import { Request, Response } from "express";
import { hashPassword } from "../utils/hashPasswordUtil";
import { verifyPassword } from "../utils/comparePasswordUtil";
import { generateToken } from "../utils/generateTokenUtil";
import { User} from "../models/databaseModel";
import { handleResponse } from "../helpers/handleResponseHelper";
import { BadRequestError, NotFoundError, UnAuthenticatedError} from "../errors/index";
import { StatusCodes} from "http-status-codes";

// define the request body for user/Admin registration
interface RegisterRequestBody {
    userFirstName: string;
    userLastName: string;
    userEmail: string;
    userPassword: string;
}

//define the login request of the user/Admin
interface LoginRequestBody {
    userEmail: string;
    userPassword: string;
}

// define the request body for user update
interface UpdateUserRequestBody {
    isAdmin: boolean;
    isSubscribed: boolean;
}


// function to handle user registration
export const adminRegister = async (request: Request, response: Response) => {
    try {
      // extract user details from the request body
      const { userFirstName, userLastName, userEmail, userPassword}: RegisterRequestBody = request.body;
  
      // check if the user already exists
      const existingUser = await User.findOne({ userEmail });
  
      if (existingUser) {
        // if user exists, return a conflict error
        return response.status(StatusCodes.BAD_REQUEST).json({
            error: new BadRequestError("user deja exist")
              .message,
            })
        }
      else {
        // if user does not exist, hash the password
        const hashedPassword = hashPassword(userPassword);
  
        // create a new user
        const newUser = new User({
          userFirstName: userFirstName,
          userLastName: userLastName,
          userEmail: userEmail,
          userPassword: hashedPassword,
          isAdmin: true,
          isSubscribed: false
        });

        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
          throw new Error("JWT_SECRET is not defined.");
        }

        // save the new user/Admin to the database
        await newUser.save();
  
        // return a success response with the jwt token
        response.status(200).json({ 
           "statusCode": 200,
           "success": "OK",
           "message": "LRegister successfully.",
           "token": generateToken(userEmail, jwtSecret)
         });
      }
    } 
    
    catch (error) {
      // handle any errors
      handleResponse(response, 500, "error", "Internal Server Error", "Failed to register user.");
    }
  };

  // function to handle user login
export const adminLogin = async (request: Request, response: Response) => {
    try {
      // extract user details from the request body
      const { userEmail, userPassword}: LoginRequestBody = request.body;
  
      // check if the user exists
      const existingUser = await User.findOne({ userEmail });
  
      if (!existingUser) {
        // if user does not exist, return a not found error
        return handleResponse(response, 404, "error", "Not Found", "User account not found.");
      }
  
      else {
        // if user exists, verify the password
        const isPasswordValid = verifyPassword(userPassword, existingUser.userPassword);
  
        if (!isPasswordValid) {
          // if password is invalid, return a forbidden error
          return handleResponse(response, 403, "error", "Forbidden", "Invalid login credentials.");
        }
  
        else {
          // if password is valid, generate a jwt token
          const jwtSecret = process.env.JWT_SECRET;
  
          if (!jwtSecret) {
            throw new Error("JWT_SECRET is not defined.");
          }
  
          // return a success response with the jwt token
          response.status(200).json({ 
            "statusCode": 200,
            "success": "OK",
            "message": "Logged in successfully.",
            "token": generateToken(userEmail, jwtSecret)
          });
        }
      }
    }
  
    catch (error) {
      // handle any errors
      handleResponse(response, 500, "error", "Internal Server Error", "Failed to login user.");
    }
  };

  export const updateUser = async (request: Request, response: Response) => {
    try {
      //check the user is admin
      if (!request.user || !request.user.email) {
        return handleResponse(response, 404, "error", "Not Found", "User account not found1000.");
      }
      const userEmail = request.user.email;
       // check if the user exists
       const existingUser = await User.findOne({ userEmail });
      
       if (!existingUser) {
         // if user does not exist, return a not found error
         return handleResponse(response, 404, "error", "Not Found", "User account not found.");
       }
  
       if (!existingUser.isAdmin){
        return handleResponse(response, 404, "error", "UnAuthorized" ,"Only Admin that has the permission");
       }
  
      const userId = request.params.id;
      const { isAdmin, isSubscribed }: UpdateUserRequestBody = request.body;
      // const updateData: UpdateUserRequestBody = {};
      // if (isAdmin !== undefined) updateData.isAdmin = isAdmin;
      // if (isSubscribed !== undefined) updateData.isSubscribed = isSubscribed;
  
      const updatedUser = await User.findByIdAndUpdate(userId, {isAdmin: isAdmin, isSubscribed: isSubscribed} ,{ new: true });
      if (!updatedUser) {
        return handleResponse(response, 404, "error", "Not Found", "not updated");
      }
  
      return handleResponse(response, 200, "updateed", "updated", "updated");
  
    } catch (error) {
      console.error(error)
      handleResponse(response, 500, "error", "Internal Server Error", "Failed to update user.");
    }
  };


  export const deleteUser = async (request: Request, response: Response) => {
    try {
      //check the user is admin
      if (!request.user || !request.user.email) {
        return handleResponse(response, 404, "error", "Not Found", "User account not found.");
      }
      const userEmail = request.user.email;
       // check if the user exists
       const existingUser = await User.findOne({ userEmail });
      
       if (!existingUser) {
         // if user does not exist, return a not found error
         return handleResponse(response, 404, "error", "Not Found", "User account not found.");
       }
  
       if (!existingUser.isAdmin){
        return handleResponse(response, 404, "error", "UnAuthorized" ,"Only Admin that has the permission");
       }
  
      const userId = request.params.id; // Assuming `user` is added to `request` by auth middleware
  
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return handleResponse(response, 404, "error", "Not Found", "User account not found.");
      }
  
      handleResponse(response, 200, "success", "OK", "User deleted successfully.");
    } catch (error) {
      console.error(error)
      handleResponse(response, 500, "error", "Internal Server Error", "Failed to delete user.");
    }
  }

  export const getAllUsers = async (request: Request, response: Response) => {
    try {
        //check the user is admin
        if (!request.user || !request.user.email) {
          return handleResponse(response, 404, "error", "Not Found", "User account not found.");
        }
        const userEmail = request.user.email;
         // check if the user exists
         const existingUser = await User.findOne({ userEmail });
        
         if (!existingUser) {
           // if user does not exist, return a not found error
           return handleResponse(response, 404, "error", "Not Found", "User account not found.");
         }
    
         if (!existingUser.isAdmin){
          return handleResponse(response, 404, "error", "UnAuthorized" ,"Only Admin that has the permission");
         }

         const users = await User.find({})
         
         // return a success response with the jwt token
         response.status(200).json({ 
            "statusCode": 200,
            "success": "OK",
            "message": "Users retrieved successfully.",
            "Users": users
          });
        ;
    } catch (error) {
      console.error(error)
      handleResponse(response, 500, "error", "Internal Server Error", "Failed to delete user.");
    }
  }

