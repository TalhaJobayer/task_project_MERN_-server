const express = require('express');
app=express();
require('dotenv').config()
cors = require('cors')
port=process.env.PORT || 5000

// middle Ware
app.use(cors());
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})