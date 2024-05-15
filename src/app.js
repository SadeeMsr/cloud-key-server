import express from "express";
import morgan from "morgan";
import cors from "cors";
import routes from './Routes/index.js'
const app = express();


app.use(express.json())
// app.use(express.urlencoded({extended:false}))
app.use(cors({
    origin: '*',
}));


app.use(morgan('combined'))

app.get("/", (req, res) => {
    return res.send('Server running')
})

app.use(routes)

export default app;