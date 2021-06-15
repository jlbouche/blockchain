const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();

bitcoin.createNewBlock(2389, 'OINA90SDNF90N', '90ANSD9F0N9009N');
bitcoin.createNewBlock(1236, 'AI6a5wef0vbew', '90ANSD9F0N9009N');
bitcoin.createNewBlock(5648, 'OINA90SDNF90N', '90ANSD9F0N9009N');

console.log(bitcoin);