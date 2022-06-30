const express = require('express');
app=express();
require('dotenv').config()
cors = require('cors')
port=process.env.PORT || 5000
const { MongoClient, ServerApiVersion } = require('mongodb');

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
      const query = {};
     const cursor = dataCollection.find(query);
     const data= await cursor.toArray();
     res.send(data)
    })
    // All data loaded done===================================
  

    
    

  } finally {
    // await client.close();
  }
}
run().catch(console.dir);
// data load======================
;


app.get('/', (req, res) => {
  res.send('talha you are doing great!')
})

app.listen(port, () => {
  console.log(`talha the server is one the way to serve you ${port}`)
})