import prisma from "../config/db";
import { Request, Response } from "express";
import { signupSchema } from "../validations/userSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUpController = async (request: Request, response: Response):Promise<void> => {
  try {
    const body = request.body;

    const validation = signupSchema.safeParse(body);

    if (!validation.success) {
      const errorMsg = validation.error.errors[0].message; 
      response.status(400).json({ message: errorMsg });
      return;
    }

    // Check if user already exists
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (user) {
      response.status(401).json({ error: "User already exists. Try a different email." });
      return; 
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const createUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });


    const token = jwt.sign({ id: createUser.id }, process.env.JWT_SECRET!, { expiresIn: "3d" });

    response.status(201).json({
      message: "User created successfully",
      createUser,
      token,
    });
    return;

  } catch (error) {
    console.error("Error in signUpController:", error);
    response.status(500).json({ message: "Internal Server Error" });
    return; 
  }
};
