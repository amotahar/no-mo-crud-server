const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json())


// user: atuhinbd
// password: vh6mJZP4fSt1p6iK

const uri = "mongodb+srv://atuhinbd:vh6mJZP4fSt1p6iK@cluster0.rdfuwua.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


async function run(){
  
  try{
    const userCollection = client.db("nodeMongoCrud").collection("users");
    const user = {
      name: "ok",
      email: "ok@test.com"
    }
    const result = await userCollection.insertOne(user);
    console.log(result);
  }
  
  finally{

  }
}

run().catch(err=>console.log(err))
  
app.get('/', (req, res, next) => {
  res.send('Hello CRUD!');
})

app.listen(port, () => {
  console.log('Listening on port ${port}');
});