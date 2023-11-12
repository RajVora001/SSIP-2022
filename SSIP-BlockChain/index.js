const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const Block = require("./block");
const Blockchain = require("./blockchain");
const PubSub = require("./publishsubscribe");

const app = express();
const blockchain = new Blockchain();
const pubsub = new PubSub({ blockchain });

const DEFAULT_PORT = 5000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;
setTimeout(() => pubsub.broadcastChain(), 1000);

app.use(bodyParser.json());
app.get("/api/blocks", (req, res) => {
  res.json(blockchain.chain);
});

app.post("/api/search", (req,res) => {
  const { BlockInd } = req.body;
  let Block_data
  console.log(Block_data = blockchain.chain[BlockInd])
  res.status(200).send(Block_data);
});

app.post("/api/mine", (req, res) => {
  const { data } = req.body;

  // blockchain.addBlock({ data });
  let hash = blockchain.addBlock({ data});
  pubsub.broadcastChain();
  // res.redirect("/api/blocks");
  res.status(200).send(" "+hash);
});

const synChains = () => {
  request(
    { url: `${ROOT_NODE_ADDRESS}/api/blocks` },
    (error, reposnse, body) => {
      if (!error && reposnse.statusCode === 200) {
        const rootChain = JSON.parse(body);
        console.log("Replace chain on sync with", rootChain);
        blockchain.replaceChain(rootChain);
      }
    }
  );
};

let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === "true") {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}
const PORT = PEER_PORT || DEFAULT_PORT;
app.listen(PORT, () => {
  console.log(`listening to PORT:${PORT}`);
  synChains();
});