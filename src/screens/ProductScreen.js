import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';

import useOneProduct from '../hooks/useOneProduct';

const ProductScreen = props => {
  console.log("ProductScreen ====>", props);
  // const { id } = props.route?.params;

  // const [product, error, loading] = useOneProduct(id);


  return (
    <ScrollView>
      <Text>ProductScreen</Text>
    </ScrollView>
  )
}

export default ProductScreen;

const css = StyleSheet.create({});