import dotenv from "dotenv"

dotenv.config()

export default {
    PORT: process.env["PORT"] as string,
    JWT_KEY: process.env["JWT_KEY"] as string,
    DEGUG: process.env["DEBUG"] === "true"
}