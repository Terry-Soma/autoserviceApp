import { StyleSheet, SafeAreaView, Text, ScrollView, View, Alert, RefreshControl } from 'react-native'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import Search from '../components/Search'
import Spinner from '../components/Spinner';

import useCategory from '../hooks/useCategory';
import CategoryProductList from '../components/CategoryProductList';
import TopProduct from '../components/TopProduct';

const HomeScreen = ({ navigation, route }) => {
  const [localSearchText, setLocalSearchText] = useState("");
  const [serverSearchText, setServerSearchText] = useState("");
  const [refreshing, setRefreshing] = useState(false)
  const [categories, error, loading] = useCategory();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Сэлбэг худалдаа",
    });
  }, [navigation]);


  if (route.params && route.params.createdProduct) {
    Alert.alert(route.params.createdProduct.ner + " нэртэй бараа нэмэгдлээ!");
    setRefreshing(true);/* refresh controller */
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
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (<Spinner />) : (
        <>
          <Search
            value={localSearchText}
            onValueChange={setLocalSearchText}
            onFinishEnter={searchFromServer}
            placeHolder="Та хайх барааны нэрээ оруулна уу"
          />

          {/* neg scroll View mash ih erelttei */}
          <ScrollView style={{
            marginTop: 8,
          }}
            refreshControl={
              <RefreshControl
                // refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#DE4839", "#383CC1", "#6EC72D"]}
                // size="large"
                title="Hello"
              />
            }
          >
            <View style={{ marginHorizontal: 12, marginVertical: 6, backgroundColor: "#7DCEA0", paddingHorizontal: 6, paddingVertical: 6, borderRadius: 12, maxWidth: "50%" }}>
              <Text style={{ fontSize: 24, fontWeight: "500", color: "#2C3E50", width: "100%", textAlign: "center" }}>Их эрэлттэй </Text>
            </View>

            <TopProduct searchLocalValue={localSearchText} />

            {categories ? categories.map(category => (
              <CategoryProductList
                key={category.id}
                searchLocalValue={localSearchText}
                searchServerValue={serverSearchText}
                setRefreshing={setRefreshing}
                refresh={refreshing}
                style={{ marginVertical: 10, }}
                data={category}
              />)) : null}
          </ScrollView>
        </>)}


    </SafeAreaView>
  )
}

export default HomeScreen
