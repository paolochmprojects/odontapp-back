import { NextFunction, Request, Response } from "express"
import jwt, { JsonWebTokenError } from "jsonwebtoken"
import settings from "../settings"


export const authValidator = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const authorization = req.headers.authorization
        if (!authorization) return res.status(401).json({ message: "Not authorized" })
        const [_, token] = authorization.split(" ")

        try {
            jwt.verify(token, settings.JWT_KEY)
            return next()
        } catch (err) {
            if (err instanceof JsonWebTokenError) {
                return res.status(400).json({ message: err.message })
            }
            return res.status(400).json({ message: "Something goes wrong." })
        }
    }
}