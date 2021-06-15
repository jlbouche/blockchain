function Blockchain() {
    this.chain = [];
    //transactions in newTransactions aren't recorded until we create new block,
    //more like 'pending' until we use createNewBlock, so changed name to 
    //pendingTransactions
    this.pendingTransactions = [];
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
    }
    //push the newtransaction object into newtransactions array
    this.pendingTransactions.push(newTransaction);

    //return number of block that this transaction will be added to
    return this.getLastBlock()['index'] + 1;
}

//export constructor

module.exports = Blockchain;