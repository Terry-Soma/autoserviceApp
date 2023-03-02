import React from "react";
import { FlatList, Pressable, TouchableHighlight, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { Avatar } from "react-native-paper";
const PhoneList = ({ calls }) => {
  return (
    <View>
      {/* flatlist */}
      <FlatList data={calls}
        renderItem={({ item, index }) => (
          <View key={index} style={{ marginHorizontal: 12 }}>
            {/* neg column */}
            <View style={{
              height: 60, flexDirection: "row", alignItems: "center"
            }}>
              <Avatar.Text size={48} label={item.ner[0]} color="#fff" />
              <View style={{ flexDirection: "column", alignItems: "flex-start", paddingLeft: 6 }}>
                <Text variant="titleMedium">{item.ner}</Text>
                <Text variant="titleMedium">{item.dugaar}</Text>
              </View>
              {/* pressable ICons */}
              <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                <Button icon={"content-copy"} mode="contained-tonal" onPress={() => console.log('Pressed')} />
                <Button icon="call-made" mode="contained-tonal" onPress={() => console.log('Pressed')} />
              </View>


            </View>


            {/* <Text>{item.dugaar}</Text>
            <Text>{item.dugaar}</Text>
            <Text>{item.dugaar}</Text>
            <Text>{item.dugaar}</Text>
            <Text>{item.dugaar}</Text> */}

          </View>
        )
        }
      />
    </View >
  )
}

export default PhoneList