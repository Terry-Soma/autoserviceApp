import { StyleSheet, Text, ScrollView, View, Alert, RefreshControl } from 'react-native'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import Search from '../components/Search'
import Spinner from '../components/Spinner';

import useCategory from '../hooks/useCategory';
import CategoryProductList from '../components/CategoryProductList';
import TopProduct from '../components/TopProduct';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mainColor } from '../../Constants';
import { Button } from 'react-native-paper';
const HomeScreen = ({ navigation, route }) => {
  const [refreshCatId, setRefreshCatId] = useState(null)
  const [localSearchText, setLocalSearchText] = useState("");
  const [serverSearchText, setServerSearchText] = useState("");
  const [refreshing, setRefreshing] = useState(false)
  const [categories, error, loading] = useCategory();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <Button title="Hel" />
        </View>
        // <HeaderButtons HeaderButtonComponent={MyHeaderButton}>
        //   <Item
        //     title="Цэс"
        //     iconName="ios-menu"
        //     onPress={() => navigation.toggleDrawer()}
        //   />
        // </HeaderButtons>
      ),
      title: "Амазон номын дэлгүүр",
      // headerShown: false,
    });
  }, [navigation, localSearchText]);


  if (route.params && route.params.createdProduct) {
    Alert.alert(route.params.createdProduct.ner + " нэртэй бараа нэмэгдлээ!");
    setRefreshCatId(route.params.createdProduct.categoryId);/* refresh controller */
    delete route.params.createdProduct;
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const searchFromServer = () => {
    if (localSearchText == null) {
      return;
    }

    console.log("first")
    console.log(localSearchText);
  }
  return (
    <SafeAreaView style={css.container}>
      {loading ? (<Spinner />) : (
        <>
          <Search
            value={localSearchText}
            onValueChange={setLocalSearchText}
            onFinishEnter={searchFromServer} />
          {/* neg scroll View mash ih erelttei */}
          <ScrollView style={{
            marginTop: 16, borderTopColor: "red",
            borderTopWidth: 2
          }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#DE4839", "#383CC1", "#6EC72D"]}
                // progressBackgroundColor={mainColor}
                // size="large"
                title="Hello"
              />
            }
          >
            <View style={{ marginHorizontal: 12, marginVertical: 6, backgroundColor: "#F8C94F", paddingHorizontal: 6, paddingVertical: 6, borderRadius: 12, maxWidth: "50%" }}>
              <Text style={{ fontSize: 24, fontWeight: "500", color: "#100E0D", width: "100%", textAlign: "center" }}>Их эрэлттэй </Text>
            </View>

            <TopProduct />

            {categories ? categories.map(category => (
              <CategoryProductList
                key={category.id}
                searchLocalValue={localSearchText}
                searchServerValue={serverSearchText}
                stopRefresh={setRefreshCatId}
                refreshCatId={refreshCatId}
                style={{ marginVertical: 10, }}
                data={category}
              />)) : null}
          </ScrollView>
        </>)}


    </SafeAreaView>
  )
}

export default HomeScreen

const css = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    backgroundColor: "#fafafa",

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