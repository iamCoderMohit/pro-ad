import express from "express";
import { errorResponse, successResponse } from "../utils/apiResponse";
import { User } from "../zod/auth";
import bcrypt from "bcrypt";
import { db } from "../config/drizzle";
import { users } from "../db/schema";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const body = req.body;

    const result = User.safeParse(body);

    if (!result.success) {
      return errorResponse(res, "Invalid input");
    }

    const hash = await bcrypt.hash(body.password, 10)

    const [user] = await db.insert(users).values({
        name: body.name,
        email: body.email,
        password_hash: hash,
      }).returning();

      const token = jwt.sign({userId: user?.id, email: user?.email}, process.env.JWT_SECRET!);
      //set token to cookit and make login route
    return successResponse(res, "User created");
  } catch (error: any) {
    console.error(error);

    if(error.code === "23505") {
        return errorResponse(res, "Email already exists")
    }
    return errorResponse(res, "can't create user");
  }
});

export default authRouter;
