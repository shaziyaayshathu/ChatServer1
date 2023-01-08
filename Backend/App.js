const express=require('express');
const cors=require('cors');
const logger=require('morgan');//for seeing api calls in the terminal
const bodyParser=require('body-parser')



const app=new express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

require('./Middlewares/mongoDb') // to initialise mongoose
io.on('connection', (socket) => {  
    console.log('a user connected'); 
 });
const PORT=3200
app.use(bodyParser.json())
app.use(cors())          //to connect frontend and backend without any disturbances
app.use(express.json())       //to receive data from front end
app.use(express.urlencoded({extended:true}))
app.use(logger('dev'))


const api=require('./routes/api')
app.use('/api',api)

app.listen(PORT,()=>{
    console.log(`.......Server is listening at port ${PORT}........`)

})