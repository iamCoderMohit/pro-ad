import type { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/apiResponse";
import jwt from "jsonwebtoken"
import type {JwtPayload} from "jsonwebtoken"

export default async function verifyUser(req:Request, res: Response, next: NextFunction) {
    const {token} = req.cookies

    if(!token) {
        return errorResponse(res, "Token not provided")
    }

    const result = jwt.verify(token, process.env.JWT_SECRET!)

    if(!result) {
        return errorResponse(res, "Invalid token")
    }

    req.user = result as JwtPayload | { id: string; email: string; } | undefined;

    next()
}