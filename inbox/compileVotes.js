const path = require('path');
const fs = require('fs');
const solc = require('solc');

const votePath = path.resolve(__dirname, 'contract', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

const compiledSolc = solc.compile(source ,1);
module.export = compiledSolc.contracts[':Voting'];