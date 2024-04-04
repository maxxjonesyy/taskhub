require("dotenv").config({ path: __dirname + "/../.env" });
const { MongoClient, ServerApiVersion } = require("mongodb");

const url = process.env.MONGO;

const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB.");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

module.exports = { run };
