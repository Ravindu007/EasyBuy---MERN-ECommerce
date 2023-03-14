require("dotenv").config()

const express = require("express")

const app = express()

// listening to the port 
app.listen(process.env.PORT,()=>{
  console.log("listening on PORT: ", process.env.PORT);
})