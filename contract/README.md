# Smart Contract 

If you're new to smart contract development, Remix will be a better option to develop solidity smart contract. 
This repo develops the smart contract using truffle.

## Requirements
Truffle: ```npm install -g truffle```  
celo-cli: ```npm install -g @celo/celocli```

## Setup
Make a new celo crypto account: ``` celocli account:new ```  

Output would loook like this:
> **mnemonic: turtle cash neutral drift brisk young swallow raw payment drill mail wear penalty vibrant entire adjust near chapter mistake size angry planet slam demand  
accountAddress: 0x5986ac413fA0C4A0379A674Cb986A59a962FC84e  
privateKey: 8cab22c2bb08f0d20bd9e1109a156e87219d63a2c0b40b027483decf194bd787  
publicKey: 024baaae61bab2a6e16ccb008c78dddb7132fc48d082e2a6166f8cc52d8d7a5289**   

Copy the account address and fund the account using alfajores [faucet](https://celo.org/developers/faucet)

## Deploy
Check **truffle.config.js** for the desired network.  
We'll be using **alfajores testnet** for this project.  

run to deploy: ```truffle migrate --reset --network alfajores```

## Debug
Other commands:  
Compile solidity code: ```truffle compile```  
local Truffle testnet: ```truffle develop```

## Connecting with FrontEnd
Navigate to rn_celo_dapp > src > services to manage your smart contract calls.  
Read calls are fairly simple.  
Write functions require you to sign the transaction with your crypto account (Valora/ Alfajores)
