const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cewig2g.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();

    const db = client.db("eventFlowDB");
    const usersCollection = db.collection("users");
    const eventCollection = db.collection("events");

    app.post("/users", async (req, res) => {
      const user = req.body;
      const existingUser = await usersCollection.findOne({
        userId: user.userId,
      });
      if (existingUser) {
        return res.send({ message: "User already exists" });
      }
      user.createdAt = new Date();
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    // Events API
    app.get("/recent-event", async (req, res) => {
      const cursor = eventCollection
        .find({ status: "Upcoming" })
        .sort({
          created_at: -1,
        })
        .limit(6);
      const result = await cursor.toArray();
      res.send(result);
    });
    // My Events API
    app.get("/my-events", async (req, res) => {
      try {
        const ownerEmail = req.query.email;

        if (!ownerEmail) {
          return res.status(400).send({ message: "Owner email is required" });
        }

        const result = await eventCollection.find({ ownerEmail }).toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Server error", error });
      }
    });
    // Event Get API
    app.get("/events", async (req, res) => {
      const cursor = eventCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    // Event Get Details
    app.get("/events/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const cursor = await eventCollection.findOne(query);
      res.send(cursor);
    });
    // Event Create API
    app.post("/events", async (req, res) => {
      const event = req.body;
      // event Create Time
      event.createAt = new Date();
      const result = await eventCollection.insertOne(event);
      res.send(result);
    });
    // Event Delete API
    app.delete("/events/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await eventCollection.deleteOne(query);
      res.send(result);
    });

    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("event management application !");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
