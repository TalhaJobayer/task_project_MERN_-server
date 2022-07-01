const express = require('express');
app=express();
require('dotenv').config()

cors = require('cors')
port=process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middle Ware
app.use(cors());
app.use(express.json())

// mongo Connect============

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.z4bsa.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// mongo Connect end============
async function run() {
  try {
    await client.connect();
    const dataCollection = client.db("task").collection("data");
    app.get('/api/billing-list', async  (req,res)=>{
      // console.log('query',req.query);
      const ActivePage=parseInt(req.query.Activepage)
      
      const query = {};
     const cursor = dataCollection.find(query);
     let data;
     if(ActivePage){
          data= await cursor.skip(ActivePage*10).limit(10).toArray();
     }else{
       data= await cursor.toArray();
     }
     
     res.send(data)
    })
    // All data loaded done===================================
    app.post('/api/billing-list' ,async (req,res)=>{
      const NewBill=req.body;
      const result=await dataCollection.insertOne(NewBill)
       res.send(result)
})
 // specific data api========
 app.get('/api/billing-list/:id', async(req,res)=>{
  const id=req.params.id;
  const query={_id:ObjectId(id)}
  const singleData= await dataCollection.findOne(query)
  res.send(singleData)
 })
// api for singeldelete===============
app.delete('/api/billing-list/:id', async (req,res) => {
  const id=req.params.id
     const query={_id:ObjectId(id)}
     
     const result= await dataCollection.deleteOne(query)
     res.send(result)
});
// singelSearch===============
app.put('/api/billing-list/:email', async (req, res) => {
  const email = req.params.Email;
  console.log(email);
  const{ Email,FullName,Phone,PaidAmmount} = req.body;
  console.log(Email,FullName,Phone,PaidAmmount);
  console.log(Phone,PaidAmmount);
  // const Update={Email,FullName,Phone,PaidAmmount}
  const filter = { email: email };
  const updateDoc = {
    $set: {
      Email:req.body.Email,
      FullName:req.body.FullName,
      Phone:req.body.Phone,
      PaidAmmount:req.body.PaidAmmount
    },
  };
  console.log(updateDoc);
  const result = await dataCollection.updateOne(filter, updateDoc);
  
  res.send(result);
})
    
// pagination====
app.get('/dataCount',async(req,res)=>{
//   const query={};
//  const cursor= dataCollection.find(query)
 const allData= await dataCollection.estimatedDocumentCount();
 res.send({allData})
})
    

  } finally {
    // await client.close();
  }
}
run().catch(console.dir);
// data load======================
;


app.get('/', (req, res) => {
  res.send(' you are doing great!')
})

app.listen(port, () => {
  console.log(`talha the server is one the way to serve you ${port}`)
})