const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require('uuid').v4;
//port tells to go to 2nd arg in package.json scripts
const port = process.argv[2];
//request-promise library used in node register/broadcast
const rp = require('request-promise');

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
//register-and-broadcast-node hits one existing node then through
//that broadcasts creation of new node to all other existing node endpoints
app.post('/register-and-broadcast-node', function(req,res){
    //pass in url to req.body
    const newNodeUrl = req.body.newNodeUrl;
    //register node with url by pushing to networkNodes array
    //only want to do if newNodeUrl isn't already in array (hence if stmt)
    if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1) bitcoin.networkNodes.push(newNodeUrl);

    const regNodesPromises = [];

    //want to hit register-node endpoint for each node
    //already in array, using request-promise library
    //making request to each other node through '/register-node'
    bitcoin.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            //what url do we want to hit? all existing urls
            uri: networkNodeUrl + '/register-node',
            //define method we want to use--would be 'post'
            method: 'POST',
            //what data being passed to body? new url
            body: { newNodeUrl: newNodeUrl},
            json: true
        };
        //request-promising the above object
        regNodesPromises.push(rp(requestOptions));
    });
    //because we don't know how long the above will take, we 
    //make the below promise when above is fully complete (.all)
    Promise.all(regNodesPromises)
        .then(data => {
            //have to hit register-nodes-bulk
            const bulkRegisterOptions = {
                uri: newNodeUrl + '/register-nodes-bulk',
                method: 'POST',
                //all existing nodes and current url
                body: { allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl]},
                json: true
            }
            return rp(bulkRegisterOptions);
        })
        .then(data => {
            res.json({ note: 'New node registered with network successfully'})
        })
})

//since new node was already broadcasted above, register-node
//only registers the node with each of the other nodes that
//received the broadcast (no additional broadcasting)
app.post('/register-node', function(req,res){
    const newNodeUrl = req.body.newNodeUrl;
    //if index of newnodeurl is -1 (nonexistent in network),
    //then below variable is true, otherwise false
    const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
    const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
    //register new node with node we're currently on if nodeNotAlreadyPresent
    //and if not the current node
    if (nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(newNodeUrl);
    res.json({ note: 'New node registered successfully with node.' })
})

//register all the existing nodes that received broadcast
//with the newly created node
app.post('/register-nodes-bulk', function(req,res){
    const allNetworkNodes = req.body.allNetworkNodes;
    allNetworkNodes.forEach(networkNodeUrl => {
        const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
        const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
        if (nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(networkNodeUrl);
    });

    res.json({ note: 'Bulk registration successful.' });
})

app.listen(port, function(){
    console.log(`Listening on port ${port}...`);
})