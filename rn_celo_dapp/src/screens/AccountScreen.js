import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import Web3 from 'web3';
import {newKitFromWeb3} from '@celo/contractkit';
import {useWalletConnect} from '@walletconnect/react-native-dapp';

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
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '100%',
          padding: 4,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: 8,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text>Back</Text>
            {/* Show button only when account connected */}
          </TouchableOpacity>
          <Text>Account Screen</Text>
          <View>
            <Text>Connected</Text>
            {/* Connect/ Disconnect button */}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            padding: 8,
          }}>
          <Text>
            Account only apprears after connected. Fetching coin balance and
            more.
          </Text>
          <Text>Network: </Text>
          <Text>{userData.network}</Text>
          <Text>chain Id: </Text>
          <Text>{userData.chainId}</Text>
          <Text>Address: </Text>
          <Text>{userData.address}</Text>
        </View>

        <TouchableOpacity onPress={fetchBalance}>
          <Text>Get Balance</Text>
        </TouchableOpacity>
        <View>
          <Text>
            CELO: {<Text>{formatTokenValue(balance.CELO)}</Text>}
          </Text>
          <Text>
            cUSD: {<Text>{formatTokenValue(balance.cUSD)}</Text>}
          </Text>
          <Text>
            cEUR: {<Text>{formatTokenValue(balance.cEUR)}</Text>}
          </Text>
          <Text>
            lockedCELO: {<Text>{formatTokenValue(balance.lockedCELO)}</Text>}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
