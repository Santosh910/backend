import express from 'express'
import { Hello } from './Controllers/GlobalControllers.js'

const app = express()

app.get ("/", function(req, res){
    res.send('hello...')
})

app.get('/Hello',Hello)

app.listen(8000,() =>console.log("app is running on 8000"))