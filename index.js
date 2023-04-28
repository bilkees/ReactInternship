const express=require("express");

const CourseInfo=require('./model/courseDB')
//2. Initializing Express
const app=new express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
//3. API Creation
app.get('/',(req,res)=>{
    res.send("congratulations!!! Server is up")
})



// app.get('/api',(req,res)=>{
//     res.json({"name":"meera","place":"clt"})
// })
//create
app.post('/api/create',(req,res)=>{
    try{
    console.log(req.body);//server data
   let ictcourse= new CourseInfo(req.body);//passing the data to db
   ictcourse.save();//save data into db 
   res.send("Data Added");
    }
    catch(error){
        res.status(500).send(error);
    }
})

//read
app.get('/api/view',async (req,res)=>{
    try{
        let result=await CourseInfo.find();
        res.json(result);

    }
    catch(error){
        res.status(500).send(error);
    }
})

//update
app.post('/api/update',async (req,res)=>{
    try{
let result=await CourseInfo.findByIdAndUpdate(req.body._id,req.body)
res.send("Data Updated")   
}
    catch(error){
        res.status(500).send(error);
    }
})

//Delete
app.post('/api/delete', async (req, res) => {
    // const id = req.params.id
    // const query = { _id: ObjectId(id) }
    try{
    //     let result = await dataCollection.deleteOne(query)
    //     res.send(result)
    //
    let result=await CourseInfo.findByIdAndDelete(req.body._id);
    res.json({"success":"Deleted"})

}
catch(error){
res.status(500).send(error);
}
   
})

//4. Setting PORT Number
app.listen(3001,()=>{
    console.log("Server is at port 3001")
})