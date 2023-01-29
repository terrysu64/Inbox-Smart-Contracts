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
        .deploy({ data: bytecode, arguments: ['hello contract']})
        .send({ from: accounts[0], gas: '1000000'})
})

describe('Inbox', () => {
    it('deploys a contract', () => {
        console.log(accounts)
        console.log(inbox)
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




