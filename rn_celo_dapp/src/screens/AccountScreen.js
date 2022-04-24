import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Web3 from 'web3';
import {newKitFromWeb3} from '@celo/contractkit';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import CommonStyles from '../CommonStyles';

// celo-mainnet --> https://forno.celo.org
// celo-alfajores --> https://alfajores-forno.celo-testnet.org
export default function AccountScreen({navigation}) {
  const connector = useWalletConnect();
  const [userData, setUserData] = React.useState({
    network: 'error',
    chainId: '000',
    phone: '9999988888',
    address: '0x21i2nd9i3nd923jd9n2394nd93d9323d23ddw6df',
  });
  const [balance, setBalance] = React.useState({
    CELO: '0',
    cEUR: '0',
    cUSD: '0',
    lockedCELO: '0',
    pending: '0',
  });

  React.useEffect(() => {
    if (connector.chainId == 44787) {
      setUserData(x => ({
        ...x,
        network: 'celo-alfajores',
        chainId: connector.chainId,
      }));
    } else if (connector.chainId == 42220) {
      setUserData(x => ({
        ...x,
        network: 'celo-mainnet',
        chainId: connector.chainId,
      }));
    }
    setUserData(x => ({...x, address: connector.accounts[0]}));
  }, []);

  // const web3 = new Web3("https://forno.celo.org");
  const web3 = new Web3('https://alfajores-forno.celo-testnet.org');
  const kit = newKitFromWeb3(web3);

  const fetchBalance = async () => {
    let allBalance = await kit.getTotalBalance(connector.accounts[0]);
    console.log('CELO Balance: ', allBalance);
    setBalance(allBalance);
  };

  const formatTokenValue = value => {
    let val = String(value);
    let bd = val.slice(0, -18);
    let ad = val.slice(bd.length, -15);
    return bd + '.' + ad;
  };

  return (
    <SafeAreaView>
      <View style={CommonStyles.screenView}>
        <View style={CommonStyles.headerView}>
          <TouchableOpacity style={CommonStyles.button} onPress={() => navigation.goBack()}>
            <Text>Back</Text>
          </TouchableOpacity>
          <Text>Account Screen</Text>
          <View>
            <Text>Connected</Text>
          </View>
        </View>
        <View style={styles.bodySection1}>
          <Text style= {CommonStyles.dataView}>Network: {userData.network}</Text>
          <Text style= {CommonStyles.dataView}>chain Id: {userData.chainId}</Text>
          <Text style= {CommonStyles.dataView}>Address: {userData.address}</Text>
        </View>

        <View style={styles.bodySection2}>
          <Text >YOUR BALANCE</Text>
          <Text style= {CommonStyles.dataView}>CELO: {formatTokenValue(balance.CELO)}</Text>
          <Text style= {CommonStyles.dataView}>cUSD: {formatTokenValue(balance.cUSD)}</Text>
          <Text style= {CommonStyles.dataView}>cEUR: {formatTokenValue(balance.cEUR)}</Text>
          <Text style= {CommonStyles.dataView}>lockedCELO: {formatTokenValue(balance.lockedCELO)}</Text>
          <TouchableOpacity style={CommonStyles.button} onPress={fetchBalance}>
            <Text>Get Balance</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bodySection1: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 8,
    marginVertical: 12,
  },
  bodySection2: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    padding: 12
  },
  
});
