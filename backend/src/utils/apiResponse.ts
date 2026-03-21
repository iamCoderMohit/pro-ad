import type { Response } from "express";
import { success } from "zod";

export const successResponse = (res: Response, data: {}, msg = "success", status = 200) => {
    res.status(status)
    return res.json({
        success: true,
        msg,
        data
    })
}

export const errorResponse = (res: Response, msg = "error", status = 500) => {
    res.status(status)
    return res.json({
        success: false,
        msg
    })
}
