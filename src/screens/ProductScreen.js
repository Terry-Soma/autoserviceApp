import { Button, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { restUrl } from '../../Constants';
import MyButton from '../components/MyButton';

import { Feather } from '@expo/vector-icons'
import thousandify from 'thousandify';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const ProductScreen = props => {
  const { product } = props.route?.params;
  // useLayoutEffect(() => {
  //   props.navigation.setOptions({
  //     title: "Сэлбэг худалдаа",
  //   });
  // }, [props.navigation]);

  const [quantity, setQuantity] = useState("1");
  // const [price, setPrice] = useState(product.une)
  const price = product.une * quantity;
  const incQuantity = () => {
    setQuantity(prevVal => {
      let temp = +prevVal;
      if (temp < product.shirheg)
        return (temp + 1).toString();
      else return prevVal;
    })
  };
  const decQuantity = () => {
    setQuantity(prevVal => {
      let temp = +prevVal;
      if (temp - 1 > 0)
        return (temp - 1).toString();
      else return "1";
    })
  }
  // const [product, error, loading] = useOneProduct(id);
  const purchaseProduct = async () => {
    if (quantity > product.shirheg) {
      // aldaa garga
    }
    else {

      // done
      axios.put(`${restUrl}/api/products/${product.id}`, {
        shirheg: quantity
      }).then((response) => {
        console.log('res', response.data)

      }).catch(({ response }) => {
        console.log('err', response.data.error.message)
      }
      ).finally(() => {
      });

    }

  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} style={[{ marginLeft: 8 }]}>
        <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
          {product.img ? (
            <Image style={css.proImage} source={{ uri: product.img }} />
          ) : (
            <Image style={css.proImage} source={require("../../assets/parado1.jpg")} />)}
        </View>
        {/* admin baival  */}
        {/* <MyInput title="Барааны нэр" data={product.ner} />
      <MyInput title="Байршил" data={product.location} />
      <MyInput title="Тоо ширхэг" keyboardType="numeric" data={product.shirheg + ""} />
      <MyInput title="үнэ" keyboardType="numeric" data={product.une + ""} /> */}

        <Text style={{ fontSize: 24, textTransform: 'capitalize', marginLeft: 14, marginTop: 16 }}>{product.ner}</Text>
        <Text style={{ color: "#555", fontSize: 16, marginLeft: 16 }}>{product.location}</Text>

        {/* product main info */}
        <View style={[{ flexDirection: "row", justifyContent: "space-evenly", marginHorizontal: 12 }]}>
          <View style={[{ height: 100, flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", }, css.card]}>
            <Feather name="box" size={48} color="#234599" />

            <View style={[{ marginLeft: 4 }]}>
              <Text style={{ color: "#212121", fontSize: 24 }}>Ширхэг</Text>
              <Text style={{ color: "#1e1e1e", fontSize: 16 }}>{product.shirheg} </Text>
            </View>
          </View>
          <View style={{ width: 10 }}></View>
          <View style={[{ height: 100, flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", }, css.card,]}>
            <Feather name="dollar-sign" size={48} color="#234599" />
            <View style={{ marginLeft: 4 }}>
              <Text style={{ color: "#212121", fontSize: 24, marginRight: 8 }}>Үнэ /Ш</Text>
              <Text style={{ color: "#1e1e1e", fontSize: 16 }}>{thousandify(product.une)}₮ </Text>
            </View>
          </View>
        </View>


        {/* зарах хэсэг */}
        {/* <MyInput keyboardType="number-pad" value={1} /> */}
        <View style={[{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }]}>
          {/* төлбөрийн үнэ */}
          <View style={[{ padding: 12 }, css.card]}>
            <Text style={{ fontSize: 24, color: "#122", marginBottom: 6 }}>Төлөх үнэ</Text>
            <Text style={{ color: "#1e1e1e", fontSize: 16, textAlign: "center" }} >{thousandify(price)}₮</Text>
          </View>

          {/* авах тоо */}
          <View style={[{ width: 150, flexDirection: 'row', justifyContent: "space-around", alignItems: "center", backgroundColor: "#212121", padding: 4, borderRadius: 24 }, css.card]}>
            <TouchableOpacity style={{ borderRadius: 50, padding: 8 }}
              onPress={incQuantity}><Ionicons name="add" size={32} color="#234599" /></TouchableOpacity>
            <TextInput keyboardType='number-pad' value={quantity} defaultValue='1' onChangeText={setQuantity} style={[{ flex: 1, fontSize: 22 }]} textAlign="center" />
            <TouchableOpacity style={{ borderRadius: 50, padding: 4 }}
              onPress={decQuantity}><Feather name="minus" size={32} color="#234599" /></TouchableOpacity>
          </View>
        </View >
        <MyButton title='Авах' onPress={purchaseProduct} />
        {/* bish bol */}




      </ScrollView >
    </SafeAreaView>
  )
}
ProductScreen.headerTitle = "asdfasf"
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
  border: {
    borderColor: "red",
    borderWidth: 2
  },
  card: {
    marginVertical: 12,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "#fefefe",
    overflow: "hidden"
  }
});