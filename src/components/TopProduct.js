import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import useTopProduct from '../hooks/useTopProduct';

const TopProduct = props => {
  const navigation = useNavigation();
  const [topProducts, loading, error] = useTopProduct();

  return (

    <View style={{ marginLeft: 8, flex: 1, padding: 2, marginBottom: 12 }}>
      {loading && <Spinner showText={false} />}
      {error && (
        <Text style={{ marginLeft: 15, color: "red" }}>{error}</Text>
      )}
      {
        topProducts.length > 0 && topProducts ? (
          <FlatList data={topProducts}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={
              ({ item, index }) => <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate("Барааны мэдээлэл", { product: item })
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
                    <Image style={css.proImage} source={{ uri: item.img }} />)
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
    fontWeight: '600'
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