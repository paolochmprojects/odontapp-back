import { Request, Response } from "express"
import { authService } from "./service"

export const signUp = async (req: Request, res: Response) => {
    const result = await authService.signUp(req.body)
    if (!result) return res.status(400).json({ message: "Invalid credentials" })
    return res.status(201).json({ users: "usersDB" })
}

export const signIn = async (req: Request, res: Response) => {
    const result = await authService.signIn(req.body)
    if (!result) return res.status(400).json({ message: "Invalid credentials" })
    return res.status(200).json({ token: result })
}