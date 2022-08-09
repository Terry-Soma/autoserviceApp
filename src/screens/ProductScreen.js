import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';

const ProductScreen = props => {
  console.log("ProductScreen ====>", props);

  return (
    <ScrollView>
      <Text>ProductScreen</Text>
    </ScrollView>
  )
}

export default ProductScreen;

const styles = StyleSheet.create({})