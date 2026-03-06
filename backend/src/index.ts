
import express from 'express';
import cors from 'cors'
import { ENV } from "./config/env"; 
import { clerkMiddleware,  } from '@clerk/express'
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import commentRoutes from './routes/commentRoutes';
const app = express()


// middleware request coolies and header for jwt (auth obj wil be attached to the req)
app.use(cors({origin: ENV.FRONTEND_URL}));
app.use(clerkMiddleware());
app.use(express.json());
app.use(express.urlencoded({extended:true})); 

// corss(cross-origin resource sharing) : browse security rule


app.get("/",(req,res)=>{
  res.json({
    message: "Welcome to Productify API - Powered by PostgreSQL, Drizzle ORM & Clerk Auth",
    endpoint:{
      users: "/api/users",
      products:"/api/products",
      comments: "/api/comments"
    }
  });
});

app.use("/api/users",userRoutes);
app.use("/api/products",productRoutes);
app.use("/api/comments",commentRoutes);

app.listen(ENV.PORT,()=>{
  console.log("Server is up and running on PORT:",ENV.PORT);
})