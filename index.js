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
async function run(){
  
  try{
    const userCollection = client.db('nodeMongoCrud').collection('users');

    app.get('/users', async(req,res) => {
        const query = {};
        const cursor = userCollection.find(query);
        const user = await cursor.toArray();
        res.send(user);
    })
    app.get('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const user = await userCollection.findOne(query);
      res.send(user);
  })

    app.post('/users', async(req, res) => {
      const user = req.body;
      console.log(user);
      const result = await userCollection.insertOne(user);
      res.send(result);
    })

    app.put('/users/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const user = req.body;
      const option = {upsert: true};
      const updatedUser = {
          $set: {
              name: user.name,
              address: user.address,
              email: user.email
          }
      }
      const result = await userCollection.updateOne(filter, updatedUser, option);
      res.send(result);
  })

  app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      // console.log('trying to delete', id);
      const query = { _id: ObjectId(id) }
      const result = await userCollection.deleteOne(query);
      console.log(result);
      res.send(result);
  });
   
  }
  
  finally{

  }
}

run().catch(err=>console.log(err))
  
app.get('/', (req, res,) => {
  res.send('Hello CRUD!');
})

app.listen(port, () => {
  console.log('Listening on port ${port}');
});