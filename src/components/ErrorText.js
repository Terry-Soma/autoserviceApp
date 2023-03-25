import { View, Text } from 'react-native'

export default function ErrorText({ errorMsg }) {
  return <View style={{ marginHorizontal: 12 }}>
    <Text style={{ color: "red", fontSize: 16, textAlign: "center" }}>
      {errorMsg}
    </Text>
  </View>
}