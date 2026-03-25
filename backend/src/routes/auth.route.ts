import express from "express";
import { errorResponse, successResponse } from "../utils/apiResponse.js";
import { LoginUser, User } from "../zod/auth.js";
import bcrypt from "bcrypt";
import { db } from "../config/drizzle.js";
import { users } from "../db/schema/user.js";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import verifyUser from "../middleware/auth.js";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const body = req.body;

    const result = User.safeParse(body);

    if (!result.success) {
      return errorResponse(res, "Invalid input");
    }

    const hash = await bcrypt.hash(body.password, 10);

    const [user] = await db
      .insert(users)
      .values({
        name: body.name,
        email: body.email,
        password_hash: hash,
      })
      .returning();

    const token = jwt.sign(
      { id: user?.id, email: user?.email, role: user?.role },
      process.env.JWT_SECRET!,
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: '/'
    });

    return successResponse(res, "User created");
  } catch (error: any) {
    console.error(error);

    if (error.code === "23505") {
      return errorResponse(res, "Email already exists");
    }
    return errorResponse(res, "can't create user");
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const body = req.body;

    const result = LoginUser.safeParse(body);

    if (!result.success) {
      return errorResponse(res, "Invalid input");
    }

    const user = await db.query.users.findFirst({
      where: eq(users.email, body.email),
    });

    if (!user) {
      return errorResponse(res, "Email doesn't exist");
    }

    const password = await bcrypt.compare(body.password, user.password_hash!);

    if (!password) {
      return errorResponse(res, "Password is incorrect");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: '/'
    });

    return successResponse(res, "Logged in successfully");
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Can't log in");
  }
});

authRouter.post("/logout", verifyUser, (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
    });

    return successResponse(res, "Succesfully logged out");
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Can't log out");
  }
});

authRouter.get("/me", verifyUser, async (req, res) => {
  try {
    return successResponse(res, req.user!);
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Can't get user");
  }
});

export default authRouter;
