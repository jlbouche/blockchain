function Blockchain() {
    this.chain = [];
    this.newTransactions = [];
}

Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash) {
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transactions: this.newTransactions,
        //nonce is proof that newBlock was created legitimately using proof of work method
        nonce: nonce,
        //hash is the data from the new/current block, hashed into a string
        hash: hash,
        //previousBlockHash is data from previous block, hashed into a string
        previousBlockHash: previousBlockHash
    }
    //clearing newTransactions
    this.newTransactions = [];
    //adding new block to blockchain array
    this.chain.push(newBlock);

    return newBlock;
}

Blockchain.prototype.getLastBlock = function() {
    return this.chain[this.chain.length - 1];
}

//export constructor

module.exports = Blockchain;