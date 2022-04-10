import './shim';

import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';
import Web3 from 'web3';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AccountScreen from './src/screens/AccountScreen';

import {
  useWalletConnect,
  withWalletConnect,
  WalletService,
} from '@walletconnect/react-native-dapp';
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";
import AsyncStorage from '@react-native-async-storage/async-storage';

//import {ContractKitProvider} from '@celo-tools/use-contractkit';
//import "@celo-tools/use-contractkit/lib/styles.css";
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

const SimpleStack = createNativeStackNavigator();

function CustomBottomSheet({
  walletServices,
  visible,
  connectToWalletService,
  uri,
}) {
  const renderContent = React.useCallback(() => {
    return walletServices.map((walletService, i) => (
      <TouchableOpacity
        key={`i${i}`}
        onPress={() => connectToWalletService(walletService, uri)}>
        <Image source={{uri: walletService.logo}} />
        <Text>{walletService.name}</Text>
      </TouchableOpacity>
    ));
  }, [walletServices, uri]);
  return <BottomSheet renderContent={renderContent} {...etc} />;
}

const App = () => {
  //const web3 = new Web3('https://alfajores-forno.celo-testnet.org');
  //const web3 = new Web3('http://127.0.0.1:7545');
  //console.log('web3 instance:', web3);
  // const newWallet = web3.eth.accounts.wallet.create(1);
  // const newAccount = newWallet[0];
  // console.log(newAccount);

  return (
    <NavigationContainer>
      <SimpleStack.Navigator initialRouteName="Home">
        <SimpleStack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <SimpleStack.Screen
          name="Account"
          component={AccountScreen}
          options={{headerShown: false}}
        />
      </SimpleStack.Navigator>
    </NavigationContainer>
  );
};

export default withWalletConnect(App, {
  redirectUrl:
    Platform.OS === 'web' ? window.location.origin : 'rn_celo_dapp://Home',
  storageOptions: {
    asyncStorage: AsyncStorage,
  },
  rpc: {
    44787: 'https://alfajores-forno.celo-testnet.org',
    // 42220: "https://forno.celo.org",
  },
  // qrcodeModal: WalletConnectQRCodeModal
});

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
