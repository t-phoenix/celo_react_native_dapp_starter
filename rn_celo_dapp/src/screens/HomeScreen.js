import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import {
  setContractValueTxn,
  getContractValue,
} from '../services/SimpleStorageServices';
import CommonStyles from '../CommonStyles';


export default function HomeScreen({navigation}) {
  const [isConnected, setIsConnected] = React.useState(false);
  const [contractValue, setContractValue] = React.useState('0');
  const [inputValue, setInputValue] = React.useState('0');

  const connector = useWalletConnect();
  //console.log('Connector:', connector);

  React.useEffect(() => {
    if (connector.connected) {
      // setUserData((x) => ({ ...x, address: connector.accounts[0] }));
      setIsConnected(true);
      // fetchBalance();
    }
  }, [setIsConnected]);

  async function fetchContractValue() {
    await getContractValue()
      .then(result => {
        console.log('Contract value :', result);
        setContractValue(result);
      })
      .catch(err => {
        console.error('Error while fetching Value :', err);
      });
  }

  async function sendTransaction() {
    console.log('Creating transaction for value:', inputValue);
    setContractValueTxn(connector, inputValue)
      .then(result => {
        console.log('Transaction Hash :', result);
      })
      .catch(err => {
        console.error('Error while sending Trasaction :', err);
      });
  }

  const handleConnect = () => {
    if (!connector.connected) {
      // not connected
      connector
        .connect()
        .then(res => {
          console.log('Connector Result:', res);
          setIsConnected(true);
        })
        .catch(err => {
          console.log('Connection Request Failed: ', err);
        });
    } else {
      setIsConnected(true);
    }
  };

  const handleDisconnect = () => {
    connector.killSession();
    setIsConnected(false);
  };

  return (
    <SafeAreaView>
      <View style={CommonStyles.screenView}>
        {/* Header Changes on Connection/ Disconnection */}
        {!isConnected ? (
          <View style={CommonStyles.headerView}>
            <View style={{width: 20}} />
            <Text>Dapp Starter Kit</Text>
            <TouchableOpacity style={CommonStyles.button} onPress={handleConnect}>
              <Text>Connect</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={CommonStyles.headerView}>
            <TouchableOpacity
              style={CommonStyles.button}
              onPress={() => navigation.navigate('Account')}>
              <Text>Account</Text>
            </TouchableOpacity>
            <Text>Dapp Starter Kit</Text>
            <TouchableOpacity
              style={styles.buttonRed}
              onPress={handleDisconnect}>
              <Text>Disconnect</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Body Components Start Here */}
        <View style={styles.bodyView}>
          <Text style={CommonStyles.dataView}>Simple Storage Contract</Text>
          <View>
            <Text style={CommonStyles.dataView}>Value: {contractValue}</Text>
            <TouchableOpacity
              style={CommonStyles.button}
              onPress={fetchContractValue}>
              <Text>Get Value</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={CommonStyles.dataView}>Input a number:</Text>
            <TextInput
              onChangeText={setInputValue}
              value={inputValue}
              placeholder="Enter a number"
              keyboardType="number-pad"
              style={styles.inputStyle}
            />
            <TouchableOpacity style={CommonStyles.button} onPress={sendTransaction}>
              <Text>Update smart Contract</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bodyView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingHorizontal: 8,
  },
  buttonRed: {
    borderColor: '#cc2525',
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
    borderRadius: 18,
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  inputStyle: {
    borderWidth: 1,
    padding: 4,
    margin: 8
  }
});
