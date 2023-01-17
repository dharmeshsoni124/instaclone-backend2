require('dotenv').config();
const express=require("express")

const app=express();
const mongoose=require("mongoose")
const cors= require("cors")
port = process.env.PORT;
// port = process.env.PORT||3006;
const bodyParser=require("body-parser");


app.use(express.json({limit: "30mb",extended:true}));
app.use(express.urlencoded({extended:false}));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


const postSchema=new mongoose.Schema({
    author:String,
    location:String,
    likes:Number,
    description:String,
    image:String,
    date:String

});

const postModal =mongoose.model("postModal",postSchema);

app.listen(port, (err) => {
  if (!err) {
    console.log(`server started at port ${port}`);
  } else {
    console.log(err);
  }
});  

mongoose.connect(process.env.DB_URL,{ useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("successfully connected to db");
  },
  (err) => {
    console.log(err);
  }
);



  

app.post("/post",(req,res)=>{
  const {author ,location ,image ,description }=req.body;
  const date = new Date
      let finalDate = date + ""
      finalDate = finalDate.split(" ");
      finalDate = finalDate.splice(1, 3).join(" ");

  const user=new postModal({
    author,
    location,
    image,
    description,
    likes:Math.floor((Math.random() * 100) + 1),
    date:finalDate


  })
  user.save().then(()=>res.send('successfully uploaded')).catch((err)=>console.log(err));
  
})


 

  app.get("/PostView", (req,res) => {
    postModal.find().then((data) => {
      res.send({data : data})
    }).catch((err) => {
      console.log(err)
    })
  })
  
