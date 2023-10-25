import express from 'express'
// import { Hello } from './Controllers/GlobalControllers.js'
import router from './Routes/index.js'

const app = express()

app.get("/", function (req, res) {
    res.send('hello santosh...')
})

app.use("/api/v1", router)

app.listen(8000, () => console.log("app is running on 8000"))