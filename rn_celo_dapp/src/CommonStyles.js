import { StyleSheet } from "react-native";

export default StyleSheet.create({
    screenView: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        padding: 6,
      },
      headerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 8,
        borderWidth: 0.4,
      },
      dataView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 6,
      },
      button: {
        borderColor: '#29A47E',
        backgroundColor: 'rgba(41,164,126,0.6)',
        borderRadius: 18,
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
      }
})