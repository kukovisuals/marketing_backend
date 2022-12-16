import express from "express";
import { MongoClient } from "mongodb";
import * as fs from 'fs';
import axios from "axios";
require('dotenv').config();
const PORT = 3001;
const app = express();

app.get("/", (req: any, res: any) => res.json({ status: "NTask API" }));

/*******************************************************************
 * Data coming from when the user is changing section D
 * GET, POST, UPDATE, DELETE  
 * /api/profiles/...
 *  
 ******************************************************************
*/
app.get("api/profiles", (req, res) => {
 
});

app.get("api/profiles/:pid", (req, res) => {
  
});

app.delete("api/profiles/:pid", (req, res) => {
  
});

app.patch("api/profiles/:pid", (req, res) => {
  
});

/*******************************************************************
 * Data coming from when the user is changing the Date
 * GET, POST, UPDATE, DELETE  
 * /api/monthViews/...
 *  
 ******************************************************************
*/
app.get("api/monthViews", (req, res) => {
 
});

app.get("api/monthViews/:pid", (req, res) => {
  
});

app.delete("api/monthViews/:pid", (req, res) => {
  
});

app.patch("api/monthViews/:pid", (req, res) => {
  
});

app.listen(PORT, () => console.log(`NTask API- Port ${PORT}`));
console.log("Hello world!");

const allProducts = JSON.parse(fs.readFileSync('./products.json', 'utf8'));
// console.log(allProducts)
// axios.get('https://eby-by-sofia-vergara.myshopify.com/admin/api/2022-10/products.json',{
//   headers:{
//     'Content-Type': 'application/json',
//     'X-Shopify-Access-Token': ``
//   }
// })
//   .then(response => {
//     // handle the response data
    
//     console.log(response)
//   })
//   .catch(error => {
//     // handle the error
//     console.error('ERROR -> ', error)
//   });

const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASSWORD
const db_path = process.env.DB_PATH

const uri =
  `mongodb+srv://${db_user}:${db_pass}@${db_path}.net/?retryWrites=true&w=majority`;

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    await listDatabases(client);

    // Get a reference to the database
    const db = client.db("products");

    // Create a collection
    // await db.createCollection("pdps");

    // Insert a document into the collection
    // await db.collection("pdps").insertOne({name: 'something', size: 'xs'});

    // Update a document in the collection
    // await db
    //   .collection("pdps")
    //   .updateOne({ name: "gray bralettee" }, { $set: { size: 'md' } });

    // Delete a document from the collection
    // await db.collection("users").deleteOne({ name: "John" });
    // await db.collection('pdps').deleteMany({})
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function listDatabases(client: any) {
  const databaseList = await client.db().admin().listDatabases();

  console.log("Database: ");
  databaseList.databases.forEach((db: any) => console.log(` - ${db.name}`));
}

main().catch(console.error);
