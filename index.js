require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

const PORT = process.env.PORT || 8080 ;

app.use(cors())
app.use(express.json())

/* Database connection and server setup */

mongoose.connect(process.env.DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
    )
    .then(() => {
        console.log("Database connected succesfully")
    });

app.get("/", () =>{
        console.log("Successfully Deployed");
})
    
app.listen(PORT, () => {
        console.log("Server started on http://localhost:8080");
});
    




