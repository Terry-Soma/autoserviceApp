import { StyleSheet, Text, ScrollView,View } from 'react-native'
import React, {useState} from 'react'
import  Search from '../components/Search'
import { SafeAreaView } from 'react-native-safe-area-context'
import Spinner from '../components/Spinner';

import useCategory from '../hooks/useCategory';
import CategoryProductList from '../components/CategoryProductList';
const HomeScreen = props => {

    const [localSearchText, setLocalSearchText] = useState("");
    const [serverSearchText, setServerSearchText] = useState("");

    const [categories, error, loading] = useCategory();

    const searchFromServer = ()=>{
      if(localSearchText == null) {
        return;
      }

        console.log("first")
        console.log(localSearchText);
    }
  return (
    <SafeAreaView style={styles.container}>
      {
        loading ? (<Spinner />) : 
        (
      <View>
        <Search
          value={localSearchText}
          onValueChange={setLocalSearchText}
          onFinishEnter={searchFromServer}
        />
        {error && (
            <Text style={{ marginHorizontal: 20, marginTop:20, color: "red" }}>
              {error}
            </Text>
          )}
        <ScrollView style={{ marginTop: 20 }}>
            {categories.length > 0 && categories.map(category => (
              <CategoryProductList
                searchLocalValue={localSearchText}
                searchServerValue={serverSearchText}
                key={category.id}
                style={{ marginVertical: 10 }}
                data={category}
              />
            ))}
          </ScrollView>  
          </View>
        )
      }
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container : {
    flex: 1,
    marginHorizontal:4,
  }
})