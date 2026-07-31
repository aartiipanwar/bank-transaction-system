const mongoose = require("mongoose");


async function connectToDB(){
       try{
          await mongoose.connect(process.env.MONGO_URI)
          console.log("MongoDB connected successfully");
       }
       catch (err) {
          console.log("Error connecting to MongoDB:", err);
          process.exit(1);  //server bnd krdo
       };
}

module.exports = connectToDB;




