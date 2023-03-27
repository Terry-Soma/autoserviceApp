import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import useTopProduct from '../hooks/useTopProduct';
import Spinner from './Spinner';
import { fontVar } from '../../Constants';

const TopProduct = props => {
  const navigation = useNavigation();
  const [topProducts, loading, error] = useTopProduct();
  const filteredItems = topProducts.filter(el =>
    el.ner.toLowerCase().includes(props.searchLocalValue.toLowerCase())
  );

  // if (filteredItems.length <= 0) {
  //   return ;
  // }
  return (

    <View style={{ marginLeft: 8, flex: 1, padding: 2, marginBottom: 12 }}>
      {filteredItems.length > 0 && (
        <View style={{ marginHorizontal: 4, marginVertical: 6, backgroundColor: "#7DCEA0", paddingHorizontal: 6, paddingVertical: 6, borderRadius: 12, maxWidth: "50%" }}>
          <Text style={{ fontSize: 24, fontWeight: "500", color: "#2C3E50", width: "100%", textAlign: "center" }}>Их эрэлттэй </Text>
        </View>
      )}

      {loading && <Spinner showText={false} circleColor="#333" />}
      {error && (
        <Text style={{ marginLeft: 15, color: "red" }}>{error}</Text>
      )}
      {
        filteredItems.length > 0 && filteredItems ? (
          <FlatList data={filteredItems}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={
              ({ item, index }) => <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate("ProductDetail", { product: item })
                }}
                style={{ paddingHorizontal: 4, }}
              >
                <View style={css.proContainer}>
                  <Text style={css.proName}>{item.ner}</Text>
                  <View style={{
                    flex: 1,
                    paddingHorizontal: 4,
                    margin: 4
                  }}>
                    {item.img ? (<Image style={css.proImage} source={{ uri: item.img }} />) : (<Image style={css.proImage} source={require("../../assets/parado1.jpg")} />)}
                  </View>
                  <View style={css.flex}>
                    <Text style={css.countText}>{item.shirheg} ш</Text>
                    <Text style={css.priceText}>{item.une ? item.une : "123444₮"}₮</Text>
                  </View>
                </View>
              </TouchableOpacity>
            }
          />
        ) : null}
    </View >
  )
}

export default TopProduct

const css = StyleSheet.create({
  proContainer: {
    flex: 1,
    height: 240,
    paddingTop: 12,
    paddingHorizontal: 6,
    marginRight: 6,
    width: 264,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: "#fefefe",
    marginBottom: 6,
    overflow: "hidden"
  },
  proImage: {
    backgroundColor: "#111fff",
    height: "100%",
    width: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: 'cover'
  },
  proName: {
    marginLeft: 12,
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: fontVar.Mont.b
  },
  flex: {
    flexDirection: 'row',
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingBottom: 4,
    marginVertical: 6,

    alignItems: "center"
  },
  priceText: {
    color: "#234588",
    fontWeight: "800"
  },
  countText: {
    fontSize: 16,
    fontWeight: "600"
  },


})