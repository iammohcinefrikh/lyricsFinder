// import necessary modules and utilities
import { Request, Response } from "express";
import { hashPassword } from "../utils/hashPasswordUtil";
import { verifyPassword } from "../utils/comparePasswordUtil";
import { generateToken } from "../utils/generateTokenUtil";
import { User, PasswordReset } from "../models/databaseModel";
import { generateUniqueCode } from "../utils/generateUniqueCodeUtil";
import { sendPasswordResetEmail } from "../utils/sendPasswordResetEmailUtil";
import { handleResponse } from "../helpers/handleResponseHelper";

// define the request body for user registration
interface RegisterRequestBody {
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPassword: string;
  isSubscribed: boolean;
}

// define the request body for user login
interface LoginRequestBody {
  userEmail: string;
  userPassword: string;
}

// define the request body for password reset
interface PasswordResetBody {
  userCode: number;
  oldPassword: string;
  newPassword: string;
}

// function to handle user registration
export const userRegister = async (request: Request, response: Response) => {
  try {
    // extract user details from the request body
    const { userFirstName, userLastName, userEmail, userPassword, isSubscribed }: RegisterRequestBody = request.body;

    // check if the user already exists
    const existingUser = await User.findOne({ userEmail });

    if (existingUser) {
      // if user exists, return a conflict error
      return handleResponse(response, 409, "error", "Conflict", "User already exists.");
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
        isAdmin: false,
        isSubscribed: isSubscribed
      });

      // save the new user to the database
      await newUser.save();

      // return a success response
      handleResponse(response, 201, "success", "Created", "User registered successfully.");
    }
  } 
  
  catch (error) {
    // handle any errors
    handleResponse(response, 500, "error", "Internal Server Error", "Failed to register user.");
  }
};

// function to handle user login
export const userLogin = async (request: Request, response: Response) => {
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
}

// function to handle password reset request
export const userPasswordResetRequest = async (request: Request, response: Response) => {
  try {
    if (request.user) {
      // get the user email from the request
      const userEmail = request.user.email;

      // check if the user exists
      const existingUser = await User.findOne({ userEmail });
    
      if (!existingUser) {
        // if user does not exist, return a not found error
        return handleResponse(response, 404, "error", "Not Found", "User account not found.");
      }

      // check if a password reset request already exists
      const existingPasswordResetRequest = await PasswordReset.findOne({ userId: existingUser._id });

      if (existingPasswordResetRequest) {
        // if a password reset request exists, return a conflict error
        return handleResponse(response, 409, "error", "Conflict", "Password reset already requested.");
      }

      // generate a unique code for password reset
      const code = generateUniqueCode();

      // create a new password reset request
      const passwordReset = new PasswordReset({
        userId: existingUser._id,
        code: code,
        createdAt: Date.now(),
      });

      // save the password reset request to the database
      const passwordResetMessage = await passwordReset.save();

      // send a password reset email to the user
      await sendPasswordResetEmail(existingUser.userEmail, code);

      // return a success response
      handleResponse(response, 200, "success", "OK", "Password reset request successful.");
    }
  }

  catch (error) {
    // handle any errors
    handleResponse(response, 500, "error", "Internal Server Error", "Failed to request password reset.");
  }
}

// function to handle password reset
export const userPasswordReset = async (request: Request, response: Response) => {
  try {
    if (request.user) {
      // get the user email from the request
      const userEmail = request.user.email;
      // get the reset code and new password from the request body
      const { userCode, oldPassword, newPassword }: PasswordResetBody = request.body;

      // check if the user exists
      const existingUser = await User.findOne({ userEmail });
    
      if (!existingUser) {
        // if user does not exist, return a not found error
        return handleResponse(response, 404, "error", "Not Found", "User account not found.");
      }

      // check if a password reset request exists
      const existingPasswordResetRequest = await PasswordReset.findOne({ userId: existingUser._id });

      if (!existingPasswordResetRequest) {
        // if no password reset request exists, return a gone error
        return handleResponse(response, 410, "error", "Gone", "Password reset request expired.");
      }

      else {
        // if a password reset request exists, verify the reset code and old password
        if (existingPasswordResetRequest.code === userCode && verifyPassword(oldPassword, existingUser.userPassword)) {
          // if verification is successful, hash the new password
          const hashedNewPassword = hashPassword(newPassword);

          // update the user's password in the database
          await User.findByIdAndUpdate(existingUser._id, { userPassword: hashedNewPassword }, { new: true });
          // delete the password reset request from the database
          await PasswordReset.findByIdAndDelete(existingPasswordResetRequest._id);

          // return a success response
          handleResponse(response, 200, "error", "OK", "Password changed successfully.");
        }
      }
    }
  }

  catch (error) {
    // handle any errors
    handleResponse(response, 500, "error", "Internal Server Error", "Failed to reset password.");
  }
}