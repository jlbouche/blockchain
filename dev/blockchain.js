const sha256 = require('sha256');
//refers to package.json urls in each node path
const currentNodeUrl = process.argv[3];
const uuid = require('uuid').v4;


function Blockchain() {
    this.chain = [];
    this.pendingTransactions = [];

    this.currentNodeUrl = currentNodeUrl;
    //networknodes keeps all nodes aware of other nodes
    this.networkNodes = [];
    //genesisblock is first block in block chain, so no 
    //previousblockhash or proof/nonce/hash, so throwing in arbitrary vals below
    //only okay for genesis block, otherwise blockchain won't work
    this.createNewBlock(100, '0', '0')

}

Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash) {
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transactions: this.pendingTransactions,
        //nonce is proof that newBlock was created legitimately using proof of work method
        nonce: nonce,
        //hash is the data from the new/current block, hashed into a string
        hash: hash,
        //previousBlockHash is data from previous block, hashed into a string
        previousBlockHash: previousBlockHash
    }
    //clearing newTransactions
    this.pendingTransactions = [];
    //adding new block to blockchain array
    this.chain.push(newBlock);

    return newBlock;
}

Blockchain.prototype.getLastBlock = function() {
    return this.chain[this.chain.length - 1];
}

Blockchain.prototype.createNewTransaction = function(amount, sender, recipient) {
    const newTransaction = {
        //data is same as passed into function
        amount: amount,
        sender: sender,
        recipient: recipient,
        //refactor to broadcast newtransactions to all nodes
        transactionId: uuid().split('-').join('')
    }
    
    return newTransaction;
}

Blockchain.prototype.addTransactionToPendingTransactions = function(transactionObj) {
    this.pendingTransactions.push(transactionObj);

    return this.getLastBlock()['index'] + 1;
}

//pass block/data into method and return fixed length randomized string
Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce) {
    //concat data intostring, JSONstringify turns currentBlockData into string
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    //create hash using sha256 of concatinated data
    const hash = sha256(dataAsString);
    return hash;
}

Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData) {
    let nonce = 0;
    // uses current and previous block data for hash
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    // repeatedly hash block until it finds correct hash (example is 4 0000 beginning)
    while (hash.substring(0, 4) !== '0000') {
        // continuously changes nonce val until finds correct hash
        nonce++;
        //continuously runs hash until finds correct val
        hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    }
    // returns nonce value that creates correct hash
    return nonce;
}


//export constructor
module.exports = Blockchain;