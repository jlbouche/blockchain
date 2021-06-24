const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

const bc1 = {
    "chain": [
    {
    index: 1,
    timestamp: 1624574887885,
    transactions: [ ],
    nonce: 100,
    hash: "0",
    previousBlockHash: "0"
    },
    {
    index: 2,
    timestamp: 1624575074380,
    transactions: [ ],
    nonce: 18140,
    hash: "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100",
    previousBlockHash: "0"
    },
    {
    index: 3,
    timestamp: 1624575158299,
    transactions: [
    {
    amount: 12.5,
    sender: "00",
    recipient: "0f445a8db0914df1a2ed557a9fc1c5ff",
    transactionId: "d0c57d4b28434b75aa1d3d21c0ac5aae"
    },
    {
    amount: 30,
    sender: "APWOEING2345PUIN3246Q3",
    recipient: "P2OI2YH3G51I5OI3N51P25UN",
    transactionId: "779138b9e0834473bacc1b87cb7654c9"
    },
    {
    amount: 20,
    sender: "APWOEING2345PUIN3246Q3",
    recipient: "P2OI2YH3G51I5OI3N51P25UN",
    transactionId: "ef3147be9a304da899dab67ee5969a9f"
    },
    {
    amount: 10,
    sender: "APWOEING2345PUIN3246Q3",
    recipient: "P2OI2YH3G51I5OI3N51P25UN",
    transactionId: "840527ad556d4d82881923a05fb5cadd"
    }
    ],
    nonce: 31596,
    hash: "0000da6b68377e2afcade9ecdcaafecbdde234e077b7dcaaf31b8ae63823a61f",
    previousBlockHash: "0000b9135b054d1131392c9eb9d03b0111d4b516824a03c35639e12858912100"
    },
    {
    index: 4,
    timestamp: 1624575204947,
    transactions: [
    {
    amount: 12.5,
    sender: "00",
    recipient: "0f445a8db0914df1a2ed557a9fc1c5ff",
    transactionId: "93f7be31ab0c495b9f3a538a3fdb56bd"
    },
    {
    amount: 40,
    sender: "APWOEING2345PUIN3246Q3",
    recipient: "P2OI2YH3G51I5OI3N51P25UN",
    transactionId: "593afb19d8c94242bf183403b19e3c97"
    },
    {
    amount: 50,
    sender: "APWOEING2345PUIN3246Q3",
    recipient: "P2OI2YH3G51I5OI3N51P25UN",
    transactionId: "f01c900aba9e4e349f3de9acca4e21cf"
    },
    {
    amount: 60,
    sender: "APWOEING2345PUIN3246Q3",
    recipient: "P2OI2YH3G51I5OI3N51P25UN",
    transactionId: "5f72170c139a42f4a78607dc299e552e"
    },
    {
    amount: 70,
    sender: "APWOEING2345PUIN3246Q3",
    recipient: "P2OI2YH3G51I5OI3N51P25UN",
    transactionId: "13fe7a25bf72445884efd95e0aedbcd8"
    }
    ],
    nonce: 51279,
    hash: "0000640b4a04ed0eb490536482b28edfdf1a87ab1ccf615db3a73e1320665137",
    previousBlockHash: "0000da6b68377e2afcade9ecdcaafecbdde234e077b7dcaaf31b8ae63823a61f"
    },
    {
    index: 5,
    timestamp: 1624575220117,
    transactions: [
    {
    amount: 12.5,
    sender: "00",
    recipient: "0f445a8db0914df1a2ed557a9fc1c5ff",
    transactionId: "6d80cf9d994f4bc598e166f8cf2cf8ca"
    }
    ],
    nonce: 19707,
    hash: "000072dcb69d6a49e3b0838a5bceee760a07b61f98589bcb452e789b367c62fa",
    previousBlockHash: "0000640b4a04ed0eb490536482b28edfdf1a87ab1ccf615db3a73e1320665137"
    },
    {
    index: 6,
    timestamp: 1624575225576,
    transactions: [
    {
    amount: 12.5,
    sender: "00",
    recipient: "0f445a8db0914df1a2ed557a9fc1c5ff",
    transactionId: "a301c3872390493fba4b2d2868449a49"
    }
    ],
    nonce: 100529,
    hash: "0000e13560b09184b1d5baf288622eb5d533c56aec8e4d0c63f987aca795e7ce",
    previousBlockHash: "000072dcb69d6a49e3b0838a5bceee760a07b61f98589bcb452e789b367c62fa"
    }
    ],
    pendingTransactions: [
    {
    amount: 12.5,
    sender: "00",
    recipient: "0f445a8db0914df1a2ed557a9fc1c5ff",
    transactionId: "bfc63c06b17c4a74a7aa7fd8845a4e12"
    }
    ],
    currentNodeUrl: "http://localhost:3001",
    networkNodes: [ ]
    }

// bitcoin.createNewBlock(2389, 'OINA90SDNF90N', '90ANSD9F0N9009N');

// console.log('createNewBlock test log', bitcoin);

// bitcoin.createNewTransaction(100, 'ALEX89ANSD90F0WN', 'NUNU89ANSD90F0WN');

// bitcoin.createNewBlock(6718, 'AWEF1351A351F8', 'AWE68198Q651E3BA5');

// console.log('createnewtransaction test log', bitcoin);

// console.log('index[1] of blockchain test log', bitcoin.chain[1])


// //testing hash
// const previousBlockHash = 'OINAISDFN0951681WAWEF'
// const currentBlockData = [
//     {
//         amount: 10,
//         sender: 'APWOEIN927894RTSZK',
//         recipient: 'APWOEIJNPAEB98472',
//     },
//     {
//         amount: 30,
//         sender: 'APW930485Y3QPWIO4UEH',
//         recipient: 'PQ9083457AEJKRBGG'
//     }
// ]


// console.log('proofOfWork function test to find node', bitcoin.proofOfWork(previousBlockHash, currentBlockData))

// console.log('proofOfWork test with found node number in hashBlock function', bitcoin.hashBlock(previousBlockHash, currentBlockData, 6244))

console.log('VALID: ', bitcoin.chainIsValid(bc1.chain))