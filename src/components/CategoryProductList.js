import { StyleSheet, Text, View,FlatList, TouchableOpacity } from 'react-native'
import React,{ useState} from 'react'
import useProduct from '../hooks/useProduct';
import Product from './Product';
import Spinner from './Spinner';

const CategoryProductList = props => {
  const [products, error, searchProduct,loading]= useProduct(props.data.id);

  const filteredItems = products.filter(el =>
      el.ner.toLowerCase().includes(props.searchLocalValue.toLowerCase())
  );

  return (
    <View>
      <Text style={styles.catText}>{props.data.ner} - {filteredItems.length}</Text>
      {error && (
        
        <Text style={styles.errorText}>
          {error}
        </Text>
         
      )}
      {loading && <Spinner  />}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={filteredItems}
        keyExtractor={product => product.id}
        renderItem={({ item, index }) => <Product data={item}/>}
      />
    </View>
  )
}

export default CategoryProductList

const styles = StyleSheet.create({
  errorText :{
    marginHorizontal: 20,
     marginTop:20,
      color: "red" 
  },
  catText :{
    marginLeft: 15,
    fontWeight: "bold",
    fontSize: 18,
    marginTop:20,
    backgroundColor : "#18f9a1",
  }
})