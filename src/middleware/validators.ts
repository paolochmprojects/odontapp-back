import { NextFunction, Request, Response } from "express"


export function schemaBodyValidator(schema: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { success, error } = schema.safeParse(req.body)
        if (!success) {
            res.status(400).json(error)
        } else {
            next()
        }
    }

}