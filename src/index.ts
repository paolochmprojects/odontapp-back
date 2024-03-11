import express, { Express } from "express"
import morgan from "morgan"
import settings from "./settings"
import mainRouter from "./router"


const app: Express = express()

app.use(express.json())
app.use(morgan("combined"))

app.use("/api", mainRouter)

app.listen(settings.PORT, ()=>{
    console.log(`serving on port -> ${settings.PORT}`)
})
