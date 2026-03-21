import type { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/apiResponse";

export default function verifyAdmin(req: Request, res: Response, next: NextFunction) {
    const user = req.user

    if(user?.role !== "admin") {
        return errorResponse(res, "Operation not permitted")
    }

    next()
}