// import dotenv from 'dotenv';  
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import allRoutes from './routes/index.js';
import User from './models/User.js';
const app = express();

const PORT = process.env.PORT || 3000;
app.use(cors(
  { 
   origin: ["https://frontend-rouge-three-93.vercel.app/auth"],
   methods: ["POST","GET"],
   credentials: true
  }
  ));

mongoose.set('strictQuery', true);



// middleware
// app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api', allRoutes);

// error handler
// eslint-disable-next-line
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(status).json({ message, stack: err.stack });
});

main()
.then(()=>{
    console.log("connection successful")
})
.catch((err) => {
    console.log(err)
});

async function main() {
  await mongoose.connect(process.env.DB_CONNECTION_STRING);
}

// let user1 = new User({
//    name:"raj03",
//    email:"raj03@gmail.com",
//    password:"188818888"
// });

// user1.save().then((res)=>{
//   console.log(res);
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
