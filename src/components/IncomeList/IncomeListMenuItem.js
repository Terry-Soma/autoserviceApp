import React from "react";
import { Pressable, Text, View } from "react-native";

const IncomeListMenuItem = (filterOption, item, setFilterOption) => {
  return (
    <View style={[{ marginHorizontal: 4, marginVertical: 2, borderRadius: 12, paddingVertical: 4, paddingHorizontal: 8, elevation: 4 }, { backgroundColor: filterOption === item.option ? "#f49cae" : "#F4B69C" }]}>
      <Pressable
        style={({ pressed }) => [pressed && { opacity: 0.4 }]}
        onPress={() => setFilterOption(item.option)}
      >
        <Text style={{ color: "#333" }}>{item.title}</Text>
      </Pressable>
    </View>
  )
}
export default IncomeListMenuItem