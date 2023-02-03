require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');


const provider = new HDWalletProvider(
    process.env.MNEMONIC,
    'https://goerli.infura.io/v3/27650ab97b774c2d825f664a4d7d4c53',  
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log(`currently deploying from account: ${accounts[0]}`)
    
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['deployed to Goreli!']})
        .send({ gas: '1000000', from: accounts[0] })

    console.log(`deployed to: ${result.options.address}`)

    provider.engine.stop()

};
deploy()