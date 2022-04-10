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
import {useWalletConnect} from '@walletconnect/react-native-dapp';

export default function HomeScreen({navigation}) {
  const [isConnected, setIsConnected] = React.useState(false);
  const connector = useWalletConnect();
  console.log("Connector:", connector);

  const handleConnect = () => {
    if (!connector.connected) {
      // not connected
      connector.connect().then((res) => {
        console.log('Connector Result:', res);
        setIsConnected(true);
      }).catch((err) => {
        console.log("Connection Request Failed: ", err);
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
        <View>
          <Text>Home Screen Add contract interaction</Text>
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
});
