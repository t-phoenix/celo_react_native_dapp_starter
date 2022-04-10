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

export default function AccountScreen({navigation}) {
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
        <View>
            <Text>Account only apprears after connected. Fetch coin balance and more.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
