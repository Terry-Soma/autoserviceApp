import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { restUrl } from '../../Constants';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Feather } from '@expo/vector-icons'
import thousandify from 'thousandify';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import MyButton from '../components/MyButton';
import Spinner from '../components/Spinner';
import { useNavigation } from '@react-navigation/native';


const ProductScreen = props => {
  const { product } = props.route?.params;
  const navigate = useNavigation();

  const [quantity, setQuantity] = useState("1");
  // const [price, setPrice] = useState(product.une)
  const [loading, setLoading] = useState(false)
  const [productInfo, setProductInfo] = useState(product)
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
    if (quantity > productInfo.shirheg) {
      // aldaa garga
      Alert.alert("Алдаа", "Та байгаа нөөцөөс их бараа зарах гэж байна");
    }
    else {
      Alert.alert(
        'Мэдээлэл баталгаажуулалт',
        `${productInfo.ner} \n Нийт үнэ ${productInfo.une}₮ X ${quantity} = ${thousandify(productInfo.une * quantity)}₮`,
        [
          {
            text: 'Буцах',
            style: 'cancel',
          },
          {
            text: 'Зарах',
            onPress: sellProduct,
            style: "destructive"
          },
        ],
      );
      // done
    }
  };

  const sellProduct = () => {
    setLoading(true)
    axios.put(`${restUrl}/api/products/${productInfo.id}`, {
      shirheg: quantity
    }).then(({ data }) => {
      // clean up and reset state
      setProductInfo(data.data)
      setQuantity("1")
      // navigate();
      navigate.navigate("Home", { refresh: true });

    }).catch(({ response }) => {
      console.log('err', response.data.error.message)
      // show error
      Alert.alert(response.data.error.message)
    }
    ).finally(() => setLoading(false));
  }
  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: 12, }}>
      <ScrollView showsVerticalScrollIndicator={false} style={[{ marginLeft: 8, }]}>
        <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
          {productInfo.img ? (
            <Image style={css.proImage} source={{ uri: productInfo.img }} />
          ) : (
            <Image style={css.proImage} source={require("../../assets/parado1.jpg")} />)}
        </View>
        {/* admin baival  */}
        {/* <MyInput title="Барааны нэр" data={product.ner} />
      <MyInput title="Байршил" data={product.location} />
      <MyInput title="Тоо ширхэг" keyboardType="numeric" data={product.shirheg + ""} />
      <MyInput title="үнэ" keyboardType="numeric" data={product.une + ""} /> */}

        <Text style={{ fontSize: 24, textTransform: 'capitalize', marginLeft: 14, marginTop: 16 }}>{productInfo.ner}</Text>
        <Text style={{ color: "#555", fontSize: 16, marginLeft: 16 }}>{productInfo.location}</Text>

        {/* product main info */}
        <View style={[{ flexDirection: "row", justifyContent: "space-evenly", marginHorizontal: 12 }]}>
          <View style={[{ height: 100, flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", }, css.card]}>
            <Feather name="box" size={48} color="#234599" />

            <View style={[{ marginLeft: 4 }]}>
              <Text style={{ color: "#212121", fontSize: 24 }}>Ширхэг</Text>
              <Text style={{ color: "#1e1e1e", fontSize: 16 }}>{productInfo.shirheg} </Text>
            </View>
          </View>
          <View style={{ width: 10 }}></View>
          <View style={[{ height: 100, flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", }, css.card,]}>
            <Feather name="dollar-sign" size={48} color="#234599" />
            <View style={{ marginLeft: 4 }}>
              <Text style={{ color: "#212121", fontSize: 24, marginRight: 8 }}>Үнэ /Ш</Text>
              <Text style={{ color: "#1e1e1e", fontSize: 16 }}>{thousandify(productInfo.une)}₮ </Text>
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
        {/* overlay modal or spinner */}

        {loading ? <Spinner showText={false} /> : (<MyButton style={css.button} onPress={purchaseProduct}>Авах</MyButton>)}

        {/* bish bol */}




      </ScrollView >
    </SafeAreaView>
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
  },
  button: {
    marginHorizontal: 22
  }
});