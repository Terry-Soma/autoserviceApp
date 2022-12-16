import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from "@react-navigation/native";

import { restUrl } from '../../Constants';
const Product = ({ data }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={css.proContainer}
      onPress={() => navigation.navigate("Бүтээгдэхүүн", { id: data.id })}
    >
      <Text style={css.proName}>{data.ner}</Text>
      {/* <Image style={css.proImage} source={{ uri: restUri+"/upload/" + data.photo }} /> */}
      {/* zurag baigaa uguig shalgah */}
      <Image style={css.proImage} source={{ uri: `${restUrl}/upload/${data.img}` }} />
      <View style={css.flex}>
        <Text style={css.countText}>{data.shirheg} ш байна</Text>
        <Text style={css.priceText}>{data.une ? data.une : "123444₮"}₮</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Product

const css = StyleSheet.create({
  proContainer: {
    marginLeft: 16,
    marginVertical: 16,
    width: 220,
    height: 250,
    flex: 1,
    backgroundColor: "#E07C24"
  },
  proImage: {
    width: 216,
    height: "60%",

    marginRight: 15,
    borderWidth: 2,
    borderColor: "#413883",
    borderRadius: 12
  },
  proName: {
    marginLeft: 4,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: '600'
  },
  flex: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 12,
    alignItems: "center"
  },
  priceText: {
    color: "#234588",
    fontWeight: "800"
  },
  countText: {
    fontSize: 16,
    fontWeight: "600"
  }

})