instantiateContract = (args) => {
const infura = `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`;
const web3 = new Web3(new Web3.providers.HttpProvider(infura));
web3.eth.defaultAccount = process.env.ACCOUNT_ADDRESS;
var abi = process.env.ABI;
var pk  = process.env.PRIVATEKEY;  // private key of your account
var toadd = process.env.WALLET_DESTINATION;
var address = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; //Contract Address
web3.eth.getTransactionCount(web3.eth.defaultAccount, function (err, nonce) {
console.log(“nonce value is “, nonce);
const contract = new web3.eth.Contract(JSON.parse(abi), address, {
from: web3.eth.defaultAccount ,
gas: 3000000,
})
const functionAbi = contract.methods.mymethodname(args).encodeABI();
var details = {
“nonce”: nonce,
“gasPrice”: web3.utils.toHex(web3.utils.toWei('47', ‘gwei’)),
“gas”: 300000,
“to”: address,
“value”: 0,
“data”: functionAbi,
};
const transaction = new EthereumTx(details);
transaction.sign(Buffer.from(pk, ‘hex’) )
var rawData = ‘0x’ + transaction.serialize().toString(‘hex’);
web3.eth.sendSignedTransaction(rawData)
.on(‘transactionHash’, function(hash){
console.log([‘transferToStaging Trx Hash:’ + hash]);
})
.on(‘receipt’, function(receipt){
console.log([‘transferToStaging Receipt:’, receipt]);
})
.on(‘error’, console.error);
});
}