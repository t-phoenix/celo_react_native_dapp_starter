# React-Native Celo Dapp

This folder contains the react-native code.  
Clone the repo [celo_react_native_dapp_starter](https://github.com/t-phoenix/celo_react_native_dapp_starter) to get started


## Requirements
 * xcode for ios development
 * android studio for android emulator
 * yarn
 
 
## Setup
cd in to this folder "rn_celo_dapp" through your working terminal

``` yarn install ```

> NOTE: After every "yarn install" the following code resets, hence changes to be done manually everytime.


### For android
navigate to node_modules/@walletconnect/react-native-dapp/dist/providers/WalletConnectProvider.js

comment the code snippet as shown below:
``` 
if (Platform.OS === 'android') {

            const canOpenURL = await Linking.canOpenURL(uri);
            
            // if (!canOpenURL) {
            
            // Linking.openURL('https://walletconnect.org/wallets');
            
            //     throw new Error('No wallets found.');
            
            // }
await Linking.openURL(uri);
}
```

Run application
``` yarn android ```


### For ios
Install pod:
``` cd ios/ && pod install && cd .. ```

open xcode:
``` xed -b ios ```.  
Or use "_.xcworkspace_" while opening manually

Navigate to pods > TcpSockets > Build Phases > Compile Sources
> Remove GCDAsyncSocket.m

and to pods > react-native-udp > Build Phases > Compile Sources 
> Remove GCDAsyncSocket.m

Run application: 
``` yarn ios ```



## How to use
* App.js -> Entry File: WalletConnect Configurations and Screen Navigations.  
WalletConnect use [react-context](https://reactjs.org/docs/context.html) to pass down data in component tree without having to manually do it at every level
* src/ABIs -> store smart contract ABI, helps in connecting to services
* src/screens -> Manage UI Screen with components.
* src/services -> setting up read and write calls to our smart contract (deployed on alfajores)



## What next?
Put tutorial link: walkthrough setting smart contract and connecting using services.  
Test for more android devices.  
Develop for ios devices (NOT TESTED YET)


## debug
``` cd android ```  
``` ./gradlew clean or sudo ./gradlew clean ```


## Resources
[Setting up react-native environment](https://reactnative.dev/docs/environment-setup).  
[Config web3 environment for react-native, medium](https://levelup.gitconnected.com/tutorial-how-to-set-up-web3js-1-x-with-react-native-0-6x-2021-467b2e0c94a4).  
[WalletConnect 1.0](https://docs.walletconnect.com/quick-start/dapps/react-native).  
[celo/ContractKit](https://docs.celo.org/developer-guide/contractkit).  
