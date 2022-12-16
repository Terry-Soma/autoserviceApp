import { StyleSheet, Text, ScrollView, View } from 'react-native'
import React, { useState } from 'react'
import Search from '../components/Search'
import { SafeAreaView } from 'react-native-safe-area-context'
import Spinner from '../components/Spinner';

import useCategory from '../hooks/useCategory';
import CategoryProductList from '../components/CategoryProductList';
import TopProduct from '../components/TopProduct';
const HomeScreen = props => {

  const [localSearchText, setLocalSearchText] = useState("");
  const [serverSearchText, setServerSearchText] = useState("");

  const [categories, error, loading] = useCategory();

  const searchFromServer = () => {
    if (localSearchText == null) {
      return;
    }

    console.log("first")
    console.log(localSearchText);
  }
  return (
    <SafeAreaView style={css.container}>
      <Search
        value={localSearchText}
        onValueChange={setLocalSearchText}
        onFinishEnter={searchFromServer} />
      {/* neg scroll View mash ih erelttei */}
      <TopProduct />

      <ScrollView >
        {categories ? categories.map(category => (
          <CategoryProductList
            searchLocalValue={localSearchText}
            searchServerValue={serverSearchText}
            key={category.id}
            style={{ marginVertical: 10 }}
            data={category}
          />)) : null}

      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const css = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 4
  }
})

/* loading ? (<Spinner />) :
          (
            <View style={css.container}>
              <Search
                value={localSearchText}
                onValueChange={setLocalSearchText}
                onFinishEnter={searchFromServer}
              />
              {error && (
                <Text style={{ marginHorizontal: 20, marginTop: 20, color: "red" }}>
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
          */