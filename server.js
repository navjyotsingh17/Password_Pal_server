const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodypraser = require('body-parser')
const cors = require('cors')

dotenv.config()

const url = process.env.MONGO_URI      
console.log(url)
const client = new MongoClient(url);

// Database Name
const dbName = process.env.DB_NAME;  
const port = process.env.PORT
const app = express()
app.use(bodypraser.json())
app.use(cors())
 
client.connect()
console.log("----------------------Connected to MONGODB---------------------")
 
// to get all the passwords
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection(process.env.COLLECTION_NAME);
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

// to save the passwords
app.post('/addPassword', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection(process.env.COLLECTION_NAME);
    const findResult = await collection.insertOne(password);
    res.send({success:true, result:findResult})
  })

// to delete a password
app.delete('/deletePassword', async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection(process.env.COLLECTION_NAME);
    const findResult = await collection.deleteOne(password);
    res.send({success:true, result:findResult})
    })

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})  