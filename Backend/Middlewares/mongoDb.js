const mongoose=require('mongoose')
mongoose.set('strictQuery',true)
mongoose.connect('mongodb+srv://Ayisha123:ayisha123@cluster0.puomspg.mongodb.net/ChatAppDB?retryWrites=true&w=majority',{
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(()=>{  
    console.log("Connected to database");  
  })  
  .catch(()=>{  
    console.log("Connection Failed");  
  }); 
   