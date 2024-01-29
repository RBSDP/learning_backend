import dotenv from "dotenv"
import connectDB from "./db/indexdb.js"

import {app} from "./app.js"

dotenv.config({
    path: '../.env'

})

// here our condition is that we should run out server only if we are connected to database
// so we are using .then and .catch syntax

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`surver is running at port : ${process.env.PORT}`);

    })
}).catch((err) => {
    console.log("mongodb connection failed", err)
})
