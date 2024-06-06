import { Request, Response } from "express";
import { hashPassword } from "../utils/hashPasswordUtil";
import { verifyPassword } from "../utils/comparePasswordUtil";
import { generateToken } from "../utils/generateTokenUtil";
import { User, PasswordReset } from "../models/databaseModel";
import { generateUniqueCode } from "../utils/generateUniqueCodeUtil";
import { sendPasswordResetEmail } from "../utils/sendPasswordResetEmailUtil";
import crypto from "crypto";

interface RegisterRequestBody {
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPassword: string;
  isSubscribed: boolean;
}

interface LoginRequestBody {
  userEmail: string;
  userPassword: string;
}

export const userRegister = async (request: Request, response: Response) => {
  try {
    const { userFirstName, userLastName, userEmail, userPassword, isSubscribed }: RegisterRequestBody = request.body;

    const existingUser = await User.findOne({ userEmail });

    if (existingUser) {
      return response.status(409).json({
        "statusCode": 409,
        "error": "Conflict",
        "message": "User already exists."
      });
    }

    else {
      const hashedPassword = hashPassword(userPassword);

      const newUser = new User({
        userFirstName: userFirstName,
        userLastName: userLastName,
        userEmail: userEmail,
        userPassword: hashedPassword,
        isAdmin: false,
        isSubscribed: isSubscribed
      });

      await newUser.save();

      response.status(201).send({
        "statusCode": 201,
        "success": "Created",
        "message": "User registered successfully."
      });
    }
  } 
  
  catch (error) {
    console.error(error);
    response.status(500).send({
      "statusCode": 500,
      "error": "Internal Server Error",
      message: "Failed to register user."
    });
  }
};

export const userLogin = async (request: Request, response: Response) => {
  try {
    const { userEmail, userPassword}: LoginRequestBody = request.body;

    const existingUser = await User.findOne({ userEmail });

    if (!existingUser) {
      return response.status(409).json({
        "statusCode": 404,
        "error": "Not Found",
        "message": "User account not found."
      });
    }

    else {
      const isPasswordValid = verifyPassword(userPassword, existingUser.userPassword);

      if (!isPasswordValid) {
        return response.status(403).json({
          "statusCode": 403,
          "error": "Forbidden",
          "message": "Invalid login credentials, please try again."
        });
      }

      else {
        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
          throw new Error("JWT_SECRET is not defined.");
        }

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
    response.status(500).send({
      "statusCode": 500,
      "error": "Internal Server Error",
      message: "Failed to login user."
    });
  }
}

export const userPasswordResetRequest = async (request: Request, response: Response) => {
  try {
    if (request.user) {
      const userEmail = request.user.email;

      const existingUser = await User.findOne({ userEmail });
    
      if (!existingUser) {
        return response.status(404).json({
          "statusCode": 404,
          "error": "Not Found",
          "message": "User account not found."
        });
      }

      const existingPasswordResetRequest = await PasswordReset.findOne({ userId: existingUser._id });

      if (existingPasswordResetRequest) {
        return response.status(409).json({
          "statusCode": 409,
          "error": "Conflict",
          "message": "Password reset already requested, please check your email for the code."
        });
      }

      const code = generateUniqueCode().toString();
      const hashedCode = crypto.pbkdf2Sync(code, crypto.randomBytes(16).toString("hex"), 1000, 64, "sha512").toString("hex");

      const passwordReset = new PasswordReset({
        userId: existingUser._id,
        code: hashedCode,
        createdAt: Date.now(),
      });

      const passwordResetMessage = await passwordReset.save();

      await sendPasswordResetEmail(existingUser.userEmail, code);

      response.status(200).json({
        "statusCode": 200,
        "success": "OK",
        "message": "Password reset request successful."
      });
    }
  }

  catch (error) {
    response.status(500).send({
      "statusCode": 500,
      "error": "Internal Server Error",
      message: "Failed to request password reset."
    });
  }
}

export const userPasswordReset = async (request: Request, response: Response) => {
  try {

  }

  catch (error) {

  }
}