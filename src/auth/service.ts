import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import settings from "../settings"
import db from "../database/db"

interface userLogin {
    email: string,
    password: string,
}

interface userRegister extends userLogin {
    name: string
    confirmPassword: string
}

export const authService = {
    saltRounds: 10,
    async signUp(data: userRegister): Promise<boolean> {
        let { confirmPassword, ...dataToSave } = data
        if (confirmPassword !== dataToSave.password) return false
        const userInDB = await db.user.findUnique({
            where: {
                email: dataToSave.email
            }
        })
        if (userInDB) return false
        dataToSave.password = await bcrypt.hash(dataToSave.password, this.saltRounds)
        await db.user.create({ data: dataToSave })
        return true
    },

    async signIn(data: userLogin): Promise<boolean | string> {
        const userInDB = await db.user.findUnique({
            where: {
                email: data.email
                //jg
            }
        })
        if (!userInDB) return false
        const matched = await bcrypt.compare(data.password, userInDB.password as string)
        if (!matched) return false
        const payload = {
            id: userInDB.id,
            name: userInDB.name
        }
        return jwt.sign(payload, settings.JWT_KEY, { expiresIn: "1h" })
    }
}