const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');

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

})

app.listen(3000, function(){
    console.log('Listening on port 3000...');
})