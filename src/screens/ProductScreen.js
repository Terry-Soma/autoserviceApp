import { Button, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { restUrl } from '../../Constants';
import MyButton from '../components/MyButton';
import MyInput from '../components/ProductInput';

const ProductScreen = props => {
  const { product } = props.route?.params;

  const [quantity, setQuantity] = useState("1");
  // const [product, error, loading] = useOneProduct(id);
  const sellProduct = () => {

  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ marginLeft: 8 }}>
      {product.img ? (
        <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10
        }}>
          <Image style={css.proImage} source={{ uri: restUrl + "/upload/" + product.img }} />
        </View>
      ) : (
        null
        // imagepicker
      )}
      {/* admin baival  */}
      {/* <MyInput title="Барааны нэр" data={product.ner} />
      <MyInput title="Байршил" data={product.location} />
      <MyInput title="Тоо ширхэг" keyboardType="numeric" data={product.shirheg + ""} />
      <MyInput title="үнэ" keyboardType="numeric" data={product.une + ""} /> */}




      {/* bish bol */}

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={{ flex: 2 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", padding: 10 }}>{product.ner}</Text>
          <Text style={{ fontSize: 14, fontWeight: 300, }}>Категорийн нэр - {product.categoryId}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", padding: 10 }}>Үнэ : {product.une}₮</Text>
        </View>
      </View>
      <Icon />
      <Text style={{ fontSize: 18, fontWeight: "bold", padding: 10 }}>Байршил : {product.location}</Text>
      <Text style={{ fontSize: 18, fontWeight: "bold", padding: 10 }}>Үлдэгдэл : {product.shirheg}</Text>
      <Text style={{ fontSize: 14, fontWeight: "300" }}>Ирсэн огноо : {product.come_date}</Text>


      {/* <View
        style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}
      >
        <MyInput keyboardType="number-pad" value={quantity} onChangeText={setQuantity} />
        <MyButton title="Авах" style={{ flex: 2, }} onPress={sellProduct} />
      </View> */}




    </ScrollView>
  )
}

export default ProductScreen;

const css = StyleSheet.create({
  proImage: {
    backgroundColor: "#111",
    height: 250,
    width: 250,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: 'cover'
  },
});