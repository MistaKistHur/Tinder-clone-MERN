import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js";
import Cors from "cors";
import dotenv from "dotenv";

// app config
const app = express();
dotenv.config();
const port = process.env.PORT || 8001;

// middlewares
app.use(express.json());
app.use(Cors());

// DB config
mongoose.connect(process.env.connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// API endpoints
app.get("/", (req, res) => {
  res.status(200).send(" hellooooo gooys");
});

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // console.log('success')
      res.status(201).send(data);
    }
  });
});
app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//Listener
app.listen(port, () => {
  console.log(`listening on localhost ${port}`);
});
