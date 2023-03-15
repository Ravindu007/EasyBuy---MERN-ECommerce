require("dotenv").config()
const mongoose = require("mongoose")

// routes
const sellerRoutes = require("./routes/users/sellerRoutes")

const express = require("express")

const app = express()


// routes
// seller routes
app.use("/api/users",sellerRoutes )



// database connection
mongoose.connect(process.env.DB_URI)
  .then(()=>{
    // listening to the port 
    app.listen(process.env.PORT,()=>{
      console.log("listening on PORT: ", process.env.PORT, " and connected to DB");
    })
  })
  .catch((error)=>{
    console.log(error);
  })