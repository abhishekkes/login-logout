import express from "express"
import 'dotenv/config';
import { User } from "./models/userModel.js";
import { connectDB } from './connectDB.js';
import cors from 'cors';
const app=express();
const PORT=process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.use(express.static("public"))



app.get("/",(req,res)=>{
  return res.status(234).send("Welcome to Login Logout Application");

});

app.post("/user", async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.username || !req.body.password )
     {
      res.status(400).json({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const newUser = {
      username: req.body.username,
      password: req.body.password,
      
    };
    const user = await User.create(newUser);
    res.status(201).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});


app.get("/user", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});







// Connect to MongoDB

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Database is connected");
    app.listen(PORT, () => {
      console.log(`App is listening on port : ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};



// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const pass = await User.findOne({ password });
  if (!user || !pass) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  else
    return res.status(201).json({ message: 'Login Success' });


  
});



// Start the server
start();
