import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from 'react-native';
import { restUrl } from '../../Constants';
const windowWidth = Dimensions.get('window').width;
const Product = ({ data }) => {
  const navigation = useNavigation();
  // console.log('data', data);

  // console.log(`./../../assets/${data.img}`)

  return (
    <TouchableOpacity style={css.proContainer}
      onPress={() => navigation.navigate("Барааны мэдээлэл", { product: data })}
    >

      <Text style={css.proName}>{data.ner}</Text>
      {/* <Image style={css.proImage} source={{ uri: restUri+"/upload/" + data.photo }} /> */}
      {/* zurag baigaa uguig shalgah */}
      {/* <Image style={css.proImage} source={{ uri: `${restUrl}/upload/${data.img}` }} /> */}
      <View style={{
        flex: 1,
        margin: 4
      }}>
        {data.img ? data.img.startsWith("https://firebasestorage") ?
          (<Image style={css.proImage} source={{ uri: data.img }} />) :
          (<Image style={css.proImage} source={{ uri: restUrl + "/upload/" + data.img }} />) : null}
        {/* {data.img.startsWith("https://firebasestorage") ?
          (<Image style={css.proImage} source={{ uri: data.img }} />) :
          (<Image style={css.proImage} source={{ uri: restUrl + "/upload/" + data.img }} />)
        } */}
        {/* <Image style={css.proImage} source={require(`../../assets/parado1.jpg`)} /> */}
      </View>
      <View style={css.flex}>
        <Text style={css.countText}>{data.shirheg} ш</Text>
        <Text style={css.priceText}>{data.une ? data.une : "123444₮"}₮</Text>
      </View>

    </TouchableOpacity>
  )
}

export default Product

const css = StyleSheet.create({
  proContainer: {
    marginLeft: 8,
    marginVertical: 16,
    width: (windowWidth / 2) - 12,
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    flex: 1,
    height: 240,
    paddingHorizontal: 4,
    marginRight: 6,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 2,
    overflow: "hidden"
  },
  proImage: {
    backgroundColor: "#111",
    height: "100%",
    width: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: 'cover'
  },
  proName: {
    marginLeft: 4,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: '600'
  },
  flex: {
    flexDirection: 'row',
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
  },
  priceText: {
    color: "#234588",
    fontWeight: "800",
    fontSize: 16,

  },
  countText: {
    fontSize: 16,
    fontWeight: "800"
  }

})