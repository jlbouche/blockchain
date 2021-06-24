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
		amount: amount,
		sender: sender,
		recipient: recipient,
		transactionId: uuid().split('-').join('')
	};
    return newTransaction;
};

Blockchain.prototype.addTransactionToPendingTransactions = function(transactionObj) {
	this.pendingTransactions.push(transactionObj);
	return this.getLastBlock()['index'] + 1;
};

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

//determine whether blockchain is valid compared to other chains
Blockchain.prototype.chainIsValid = function(blockchain) {
    let validChain = true;

    //iterate through every block and make sure hashes line up
    for (let i = 1; i < blockchain.length; i++) {
        const currentBlock = blockchain[i];
        const prevBlock = blockchain[i - 1];
        const blockHash = this.hashBlock(prevBlock['hash'], { transactions: currentBlock['transactions'], index: currentBlock['index']}, currentBlock['nonce'])
        if (blockHash.substring(0,4) !== '0000') validChain = false;
        if (currentBlock['previousBlockHash'] !== prevBlock['hash']) validChain = false;

        console.log('currentBlockHash =>', currentBlock['hash']);
        console.log('previousBlockHash =>', prevBlock['hash']);
    };

    const genesisBlock = blockchain[0];
    const correctNonce = genesisBlock['nonce'] === 100;
    const correctPreviousBlockHash = genesisBlock['previousBlockHash'] === '0';
    const correctHash = genesisBlock['hash'] === '0';
    const correctTransactions = genesisBlock['transactions'].length === 0;

    if (!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions) validChain = false;

    return validChain;

}

//export constructor
module.exports = Blockchain;