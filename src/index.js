const express =require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const studentRoute=require("./routes/student.route");
const cors=require("cors");
dotenv.config()
const  port=process.env.PORT||5000;


app.use(express.json());
app.use(cors())

mongoose.connect(process.env.URI,{

})
.then(()=>{
    console.log("MongoDB is  connection Successfully");

})
.catch((error)=>{
    console.log("MongoDb connection failed")
})

app.use("/",studentRoute);

app.listen(port,()=>{
    console.log("Server is connection on Port no ",port)
})

