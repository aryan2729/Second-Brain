import express from "express";
import jwt from "jsonwebtoken";
import z, { string } from "zod";
import { ContentModel, LinkModel, UserModel } from "./db";
import {JWT_SECRET } from "./config";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import cors from "cors";
import { FRONTEND_URL } from "./config";


const app = express();

// CORS options
const corsOptions = {
  origin: FRONTEND_URL, 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());        

app.get('/', (req, res) => {
    res.send('Backend is running!');
  });

  
app.post("/api/v1/signup", async function(req , res ){                

   const requireBody = z.object({
    username : z.string().min(4,"Username must be at least 4 characters  ").max(20 ),
    password : z.string().min(4 , "Passowrd must be at least 4 characters ").max(20)

   })

   const parsedDataWithSuccess = requireBody.safeParse(req.body);           

   if(!parsedDataWithSuccess.success){
    
        res.json({
            message : "Incorrect Format",
            error : parsedDataWithSuccess.error
        })
        return ;          
   }

    const username = req.body.username;
    const password = req.body.password;

    try {
            
        await UserModel.create({
        username:username,
        password:password
        })

        res.json({
            message:"User signed up"
        })

    } catch (error) {
        res.json({
            message: "Username already exists , kindly use different username"
        
        }) 
    }

    
})

app.post("/api/v1/signin" , async function(req , res){

    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await UserModel.findOne({
        username,
        password
    })

    if(existingUser){

        const token = jwt.sign({
            id : existingUser._id

        } , JWT_SECRET);         
        
        res.json({
            token
        })
    }
    else{
        res.status(403).json({           
            message : "Incorrect Credentials"
        })
    }
})

app.post("/api/v1/content" , userMiddleware , async function(req , res){

    const title = req.body.title;
    const link = req.body.link;
    const text = req.body.text;
    const type = req.body.type;

    await ContentModel.create({
        title,
        type ,
        text,
        link , 
        //@ts-ignore
        userId : req.userId,
        tags: []
    })

    res.json({
        message :"Content added"
    })


})

app.get("/api/v1/content" ,userMiddleware ,async (req , res) =>{

    //@ts-ignore
    const userId = req.userId;
    
    const content = await ContentModel.find({
        
        userId : userId

    }).populate("userId","username")        

    res.json({
        content
    })
})

app.delete("/api/v1/content", userMiddleware ,async (req, res)=>{

    const contentId = req.body.contentId;

    await ContentModel.deleteMany({             
        _id : contentId,
        //@ts-ignore
        userId : req.userId
    })

    res.json({
        message :"Content deleted"
    })
    

})

app.post("/api/v1/brain/share", userMiddleware , async (req , res) => {      

    const share = req.body.share;

    
    if(share){

        const exsistingLink = await LinkModel.findOne({
            //@ts-ignore
            userId : req.userId
        });
        
        if(exsistingLink){

            res.json({
                hash : exsistingLink.hash
            })
            return ;
        }
        

        const hash = random(8);
        console.log("Generated hash:", hash); 
        await LinkModel.create({
            //@ts-ignore                        
            userId : req.userId,                     
            hash: hash 
        })

        res.json({
            hash : hash
        })

    }else{
        await LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId,
        })
        res.json({
            message : "Removed Link"
        })
    }
    

})

app.get("/api/v1/brain/:sharelink",async (req , res) =>{     

    const hash = req.params.sharelink;

    const link = await LinkModel.findOne({
        hash : hash, 
    })

    if(!link){
        res.status(411).json({
            message : "Sorry incorrect input"
        })
        return ;            
    }


    const content = await ContentModel.find({
        userId : link.userId,
    })

    const user = await UserModel.findOne({
        _id : link.userId               
    })

    if(!user){
        res.status(411).json({
            message : "User not found , error should ideally not happen"
        })
        return;
    }

    res.json({                              
        username : user.username,   
        content : content 
    })

})


app.listen(3000);