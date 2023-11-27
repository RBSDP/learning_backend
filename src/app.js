import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"})) //setting a limit to accept json data so that you server does not crash due to lage files.

app.use(express.urlencoded({extended:true, limit: "16kb"})) // data also might come from url, 
//like when we search in goole the search is displayed in url liek "https://www.google.com/search?q=hitesh+chowdary+github&rlz="
//I searched hitesh chowdary on google now the search is converted like "hitesh+chowdart+github" so we should tell our express application that
//we will receive this kind of data also so we need to configure for that

app.use(express.static("public")) // it makes asssets in public folder accessiable to everyone

app.use(cookieParser()) // allows us to do crud operatins on cookies


export { app }


