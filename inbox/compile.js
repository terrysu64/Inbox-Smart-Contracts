// compile code will go here
const path = require('path'); //for cross-platform compatability
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

// console.log(solc.compile(source, 1))
const compiledSolc = solc.compile(source, 1);
module.exports = compiledSolc.contracts[':Inbox'];




















