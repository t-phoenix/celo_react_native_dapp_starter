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
import {setContractValueTxn, getContractValue} from '../services/SimpleStorageServices';


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

  async function fetchContractValue(){
    await getContractValue().then((result)=>{
      console.log("Contract value :", result);
      setContractValue(result);
    }).catch((err) => {
      console.error("Error while fetching Value :", err);
    })
  }

  async function sendTransaction() {
    console.log("Creating transaction for value:", inputValue);
    setContractValueTxn(connector, inputValue).then((result) => {
      console.log("Transaction Hash :", result);
    }).catch((err)=>{
      console.error("Error while sending Trasaction :", err);
    })
    

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
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '100%',
          padding: 4,
        }}>
        {!isConnected ? (
          <View style={styles.headerView}>
            <View>
              <Text> </Text>
            </View>
            <Text>Dapp Starter Kit</Text>
            <TouchableOpacity onPress={handleConnect}>
              <Text>Connect</Text>
              {/* Connect/ Disconnect button */}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.headerView}>
            <TouchableOpacity onPress={() => navigation.navigate('Account')}>
              <Text>Account</Text>
              {/* Show button only when account connected */}
            </TouchableOpacity>
            <Text>Dapp Starter Kit</Text>
            <TouchableOpacity onPress={handleDisconnect}>
              <Text>Disconnect</Text>
              {/* Connect/ Disconnect button */}
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.bodyView}>
          <Text>Add Instructions and contract interaction</Text>
          <View>
          <Text>Simple Storage Contract</Text>
          <TouchableOpacity onPress={fetchContractValue}>
            <Text>Get Value</Text>
          </TouchableOpacity>
          <Text>Value: {contractValue}</Text>

          </View>
          <View>
            <Text>Input a number:</Text>
            <TextInput 
              onChangeText={setInputValue}
              value={inputValue}
              placeholder="Enter a number"
              keyboardType="number-pad"
            />
            <TouchableOpacity onPress={sendTransaction}>
              <Text>Update smart Contract</Text>
            </TouchableOpacity>
          </View>
          


        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 8,
  },
  bodyView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingHorizontal: 8
  }
});
