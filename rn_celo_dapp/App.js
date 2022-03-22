/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import './shim';

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity
} from 'react-native';
import Web3 from 'web3';


const App = () => {
  const web3 = new Web3("https://alfajores-forno.celo-testnet.org");
  //const web3 = new Web3('http://127.0.0.1:7545');
  console.log("web3 instance:", web3);
  const newWallet = web3.eth.accounts.wallet.create(1);
  const newAccount = newWallet[0];
  console.log(newAccount);

  return (
    <SafeAreaView>
      <View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%', padding: 4}}>
      
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width:'100%', padding: 8}}>
          <TouchableOpacity>
            <Text>Account</Text>
            {/* Show button only when account connected */}
          </TouchableOpacity>
          <Text>Dapp Starter Kit</Text>
          <TouchableOpacity>
            <Text>Connect</Text>
            {/* Connect/ Disconnect button */}
          </TouchableOpacity>
        </View>


      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
