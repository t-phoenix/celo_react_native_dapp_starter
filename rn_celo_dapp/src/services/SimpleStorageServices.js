import Web3 from 'web3';
import {newKitFromWeb3} from '@celo/contractkit';
// import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {SimpleStorageABI} from '../ABIs/SimpleStorageABI';

//Configured for celo alfajores only
const contractAddress = '0x788cB31b7614668cAe0F89F8CA17655a3FFEaC88';
const web3 = new Web3('https://alfajores-forno.celo-testnet.org');
const kit = newKitFromWeb3(web3);
const SimpleStorageContract = new kit.connection.web3.eth.Contract(
  SimpleStorageABI,
  contractAddress,
);
console.log('Contract :', SimpleStorageContract);
// const connector = useWalletConnect();

export async function getContractValue() {
    let value = await SimpleStorageContract.methods.get().call();
    return value;
}

export async function setContractValueTxn(connector, value) {
    try {
        let contractValue = await SimpleStorageContract.methods.set(value);
      //Note: we didn't write .call() here
      let encodeData = contractValue.encodeABI();
      //creating Transaction Object
      const txObj = {
        from: connector.accounts[0],
        to: contractAddress,
        data: encodeData
      }
      const result = await connector.sendTransaction(txObj);
      return result;
      } catch (error) {
        console.log("ERROR on sending Transaction :", error);
        return error;
      }
}