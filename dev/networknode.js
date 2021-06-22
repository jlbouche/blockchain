const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require('uuid').v4;
//port tells to go to 2nd arg in package.json scripts
const port = process.argv[2];

const nodeAddress = uuid().split('-').join('');

const bitcoin = new Blockchain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//get full blockchain
app.get('/blockchain', function (req, res) {
    res.send(bitcoin);
})

//post new transaction
app.post('/transaction', function (req, res) {
    const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    res.json({ note: `Transaction will be added in block ${blockIndex}.`})
})

//create new block
app.get('/mine', function(req, res){
    //because createNewBlock has 3 params, have to define these params below
    //and each function that requires params defined below

    //need previous block to get new block
    const lastBlock = bitcoin.getLastBlock();

    //get hash from previous block using hash property
    const previousBlockHash = lastBlock['hash'];

    //current block data needed due to proof of work params needed for nonce and hashblock below
    const currentBlockData = {
        transactions: bitcoin.pendingTransactions,
        index: lastBlock['index'] + 1
    }
    //get nonce using proof of work
    const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);

    //create hash for new block using params in hashBlock function, defined above
    const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

    //reward mine creator by giving new transaction for bitcoin, sender is "00" to
    //reflect it is a mining reward, recipient is this network node created using uuid
    bitcoin.createNewTransaction(12.5, "00", nodeAddress);

    //all params are now available to run createNewBlock
    const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);

    res.json({
        note: "New block mined successfully",
        block: newBlock
    })
})
//hits one existing node then through that broadcasts creation
//of new node to all other node endpoints
app.post('/register-and-broadcast-node', function(req,res){
    //pass in url to req.body
    const newNodeUrl = req.body.newNodeUrl
})

//broadcast earlier transfers to this to send new node
//url to all other existing nodes without rebroadcasting
app.post('/register-node', function(req,res){

})

//register existing nodes with newly created node
app.post('/register-nodes-bulk', function(req.res){

})

app.listen(port, function(){
    console.log(`Listening on port ${port}...`);
})