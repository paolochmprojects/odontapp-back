import { NextFunction, Request, Response } from "express"
import jwt, { JsonWebTokenError } from "jsonwebtoken"
import settings from "../settings"

interface RequestExt extends Request {
    user?: {
        id: string
    }
}

export const authValidator = () => {
    return async (req: RequestExt, res: Response, next: NextFunction) => {
        const authorization = req.headers.authorization
        if (!authorization) return res.status(401).json({ message: "Not authorized" })
        const [_, token] = authorization.split(" ")
        
        try {
            const data = jwt.verify(token, settings.JWT_KEY)
            const { id } = data as any
            req.user = id
            return next()
        } catch (err) {
            if (err instanceof JsonWebTokenError) {
                return res.status(400).json({ message: err.message })
            }
            return res.status(400).json({ message: "Something goes wrong." })
        }
    }
}