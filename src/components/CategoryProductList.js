import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState } from 'react'
import useProduct from '../hooks/useProduct';
import Product from './Product';
import Spinner from './Spinner';

const CategoryProductList = props => {
  const [products, error, searchProduct, loading] = useProduct(props.data.id);


  // const filteredItems = products.filter(el =>
  //   el.ner.toLowerCase().includes(props.searchLocalValue.toLowerCase())
  // );

  return (
    <View style={{ marginLeft: 8, }}>
      <View style={{ marginHorizontal: 6, marginTop: 24, backgroundColor: "#F8C94F", paddingVertical: 6, borderRadius: 12, width: "64%" }}>
        <Text style={css.catText}>{props.data.ner} - {products.length}ш  </Text>
      </View>
      {/* {error && ( }
             <Text style={css.errorText}>
               {error}
            </Text>
          )}
      {loading && <Spinner /> */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={products}
        keyExtractor={product => product.id}
        renderItem={({ item }) => <Product data={item} />}
      />

    </View>
  )
}

export default CategoryProductList

const css = StyleSheet.create({
  errorText: {
    marginHorizontal: 20,
    marginTop: 20,
    color: "red"
  },
  catText: {
    fontWeight: '400',
    fontSize: 18,
    color: "#100E0D",
    textAlign: "center"
  }
})