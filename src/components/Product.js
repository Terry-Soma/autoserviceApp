import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from "@react-navigation/native";

const Product = ({data}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.proContainer}
      onPress={()=> navigation.navigate("Бүтээгдэхүүн", {id : data.id})}
    >
      <Text style={styles.proName}>{data.ner}</Text>
      <Image style={styles.proImage} source={require("../../assets/icon.png")}/>
      <View style={styles.flex}>
        <Text style={styles.countText}>{data.shirheg} ш байна</Text>
        <Text style={styles.priceText}>{data.une ? data.une : "123444₮"}₮</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Product

const styles = StyleSheet.create({
  proContainer : {
    marginLeft: 16,
    marginVertical: 16,
    width: 216
  },
  proImage : {
    width: 216,
    height : 250,
    marginRight: 15
  },
  proName:{
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
    alignItems: "center"
  },
  priceText: {
    color: "#234588",
    fontWeight: "900"
  },
  countText:{
    fontSize : 16,
    fontWeight:"600"
  }

})