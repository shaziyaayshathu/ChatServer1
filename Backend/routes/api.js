const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
//const libraryData=require('../models/library')
const userData=require('../models/user')

function verifyToken(req,res,next)
{
    if(!req.headers.authorization)
    {
        return res.status(401).send('Unauthorized request')
    }
    let token=req.headers.authorization.split(' ')[1]
    if(token==null)
    {
        return res.status(401).send('Unauthorized request')
    }
    let payload=jwt.verify(token,'secretkey')
    console.log(payload)
    if(!payload)
    {
        return res.status(401).send('Unauthorized request') 
    }
    req.username=payload.subject
    next()

}

router.post('/login', (req,res)=>{
   
        let item=req.body
        if(item.email==' ')
        {
            console.log("Email cannot be empty !")
            return res.status(401).json({
                message: 'Email cannot be empty !'
            });  
        }
        console.log(req.body)
       userData.findOne({email:item.email}).then(user=>{
        console.log(user.email)
        console.log(user.password)
        if (!user) {
            console.log("User not found")
            // return res.status(401).json({
            //     message: 'User not found !'
            // });
            res.json({message: "User not found ! ",status:false}) 
          }
       
        // if(item.username != user.username)
        // {
        // return res.status(401).json({
        //     error: new Error('User not found!')
        //   });
        // }
        else if(item.password != user.password)
        {
            // return res.status(401).json({
            //     message: 'Invalid login credentials !'
            //   });  
            res.json({message: "Invalid login credentials !",status:false})
        }
        else
        {
            // let payload={subject:user.email+user.password}
            // let token=jwt.sign(payload,'secretkey')
            // res.status(200).send({token});
            res.json({message: "signed in successfully", id: user._id, name:user.name, status: true})
        }
        
    } ).catch (
        (error) => {
          res.status(500).json({
            error: error
          });
        }
      );

})

router.post('/register', (req,res)=>{
    try {
        let item={
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
        }
        console.log(item)
        userData.findOne({email:item.email}).then(user=>{
            if(user)
            {
                
                return res.json({
                    message: 'Email already exists.... !',
                    status:false
                    
                });
            }
            else
            {
                const newUser=new userData(item)
                newUser.save((error,data)=>{
                    if(error)
                    {
                        res.json({message:"Error",status:false})
                    }
                    else{
                        console.log(res)
                        res.json({message:"success",data:data,status:true})
                    }
                })
                
            }
        })


       
        
    } catch (error) {
        console.log(error)
        
    }

})
module.exports = router;