import { requireNativeViewManager } from "expo-modules-core";
import React from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { fontVar } from "../../Constants";
import ErrorText from "../components/ErrorText";
import Product from "../components/Product";
import Spinner from "../components/Spinner";
import useProduct from "../hooks/useProduct";

const windowWidth = Dimensions.get('window').width;
const CategoryProductsScreen = ({ navigation, route }) => {
  const cat = route.params?.category;
  console.log('cat', cat)

  //  useCategoryProducts 
  const [products, error, loading] = useProduct(cat.id)
  console.log('products', products)
  console.log('loading', loading)
  console.log('products', products[0])



  if (loading) {
    return <Spinner />
  }
  if (error) {
    return <ErrorText errorMsg={error} />
  }
  return (
    <SafeAreaView style={{ flex1: 1, marginHorizontal: 8 }}>

      {products.length > 0 &&
        (<FlatList
          showsHorizontalScrollIndicator={false}
          data={products}
          keyExtractor={product => product.id}
          numColumns={2}
          horizontal={false}
          renderItem={({ item }) => {
            let data = item;
            return (
              <View style={css.proContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ProductDetail", { product: data })}
                  style={{ flex: 1, }}
                >
                  <View style={{
                    flex: 1,
                  }}>
                    <Text style={css.proName}>{data.ner}</Text>
                  </View>
                  {/* <Image style={css.proImage} source={{ uri: restUri+"/upload/" + data.photo }} /> */}
                  {/* zurag baigaa uguig shalgah */}
                  {/* <Image style={css.proImage} source={{ uri: `${restUrl}/upload/${data.img}` }} /> */}
                  <View style={{
                    flex: 3,
                    margin: 4,
                    alignItems: "flex-end"
                    // borderColor: "red", borderWidth: 1
                  }}>
                    {data.img ? data.img.startsWith("https://firebasestorage") ?
                      (<Image style={css.proImage} source={{ uri: data.img }} />) :
                      (<Image style={css.proImage} source={{ uri: restUrl + "/upload/" + data.img }} />) : (<Image style={css.proImage} source={require("../../assets/parado1.jpg")} />)}

                  </View>
                  <View style={[css.flex,]}>
                    <Text style={css.countText}>{data.shirheg} ш</Text>
                    <Text style={css.priceText}>{data.une ? data.une : "123444₮"}₮</Text>
                  </View>

                </TouchableOpacity>
              </View>
            )
          }}
        />
        )

      }
    </SafeAreaView>
  )

}
export default CategoryProductsScreen


const css = StyleSheet.create({
  proContainer: {
    margin: 6,
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    height: 200,
    paddingHorizontal: 4,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    flex: 1,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
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
    marginTop: 6,
    fontSize: 14,
    fontFamily: fontVar.Mont.sb
  },
  flex: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingHorizontal: 12,
    alignItems: "center",
  },
  priceText: {
    color: "#234588",
    fontSize: 16,
    fontFamily: fontVar.Mont.b,

  },
  countText: {
    fontSize: 16,
    fontFamily: fontVar.Mont.m,
  }

})