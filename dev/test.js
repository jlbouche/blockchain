const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

bitcoin.createNewBlock(2389, 'OINA90SDNF90N', '90ANSD9F0N9009N');

console.log('createNewBlock test log', bitcoin);

bitcoin.createNewTransaction(100, 'ALEX89ANSD90F0WN', 'NUNU89ANSD90F0WN');

bitcoin.createNewBlock(6718, 'AWEF1351A351F8', 'AWE68198Q651E3BA5');

console.log('createnewtransaction test log', bitcoin);

console.log('index[1] of blockchain test log', bitcoin.chain[1])


//testing hash
const previousBlockHash = 'OINAISDFN0951681WAWEF'
const currentBlockData = [
    {
        amount: 10,
        sender: 'APWOEIN927894RTSZK',
        recipient: 'APWOEIJNPAEB98472',
    },
    {
        amount: 30,
        sender: 'APW930485Y3QPWIO4UEH',
        recipient: 'PQ9083457AEJKRBGG'
    }
]


console.log('proofOfWork function test to find node', bitcoin.proofOfWork(previousBlockHash, currentBlockData))

console.log('proofOfWork test with found node number in hashBlock function', bitcoin.hashBlock(previousBlockHash, currentBlockData, 6244))