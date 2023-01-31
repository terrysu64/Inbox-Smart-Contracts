const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3') //constructor function
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile')
 
//get list of all accounts and use one to deploy contract
let accounts;
let inbox
beforeEach(async () => {
    accounts = await web3.eth.getAccounts()
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['hello contract']}) //deploy
        .send({ from: accounts[0], gas: '1000000'}) //transaction
})

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    })

    it('has a default message', async () => {
        const STRING = 'hello contract'
        const message = await inbox.methods.message().call()
        assert.equal(message, STRING)
    })

    it('can update the message', async () => {
        await inbox.methods.setMessage('bye').send({ from: accounts[0] })
        const message = await inbox.methods.message().call()
        assert.equal(message, 'bye')
    })

})

// class Car {
//     park() {
//         return 'stopped';
//     }

//     drive() {
//         return 'driving';
//     }
// }

// let car;

// beforeEach(() => {
//     console.log("before each running")
//     car = new Car();
// })

// describe('Car', () => {
//     it('can park', () => {
//         assert.equal(car.park(), 'stopped');
//     });
//     it('can drive', () => {
//         assert.equal(car.drive(), 'driving')
//     })
// })




