import { ScrollView, Alert, RefreshControl, SafeAreaView } from 'react-native'
import React, { useCallback, useState } from 'react'


import useCategory from '../hooks/useCategory';
import CategoryProductList from '../components/CategoryProductList';
// import TopProduct from '../components/TopProduct';
import axios from 'axios';
import { restUrl } from '../../Constants';
import ErrorText from '../components/ErrorText';
import { useFocusEffect } from '@react-navigation/native';
import Search from '../components/Search'
import Spinner from '../components/Spinner';
import { FAB } from 'react-native-paper';
const HomeScreen = ({ navigation, route }) => {
  const [localSearchText, setLocalSearchText] = useState("");
  const [serverSearchText, setServerSearchText] = useState("");
  const [refreshing, setRefreshing] = useState(false)
  const [categories, setCategories, setError, error, loading] = useCategory();


  if (route.params && route.params.createdProduct) {
    Alert.alert(route.params.createdProduct.ner + " нэртэй бараа нэмэгдлээ!");
    setRefreshing(true);/* refresh controller */
    delete route.params.createdProduct;
  }
  if (route.params && route.params.refresh) {
    setRefreshing(true);
    delete route.params.refresh;
  }
  // call each focus 
  useFocusEffect(
    useCallback(() => {
      if (!refreshing) {
        return;
      }
      console.log(route.params)
      setCategories([])
      //improve 
      axios.get(`${restUrl}/api/categories`)
        .then(result => {
          setCategories(result.data.data);
          setError(null);
          console.log('res', result.data)
        })
        .catch(err => {
          console.log("err", err.response);
          let message = err.message;
          if (message === "Request failed with status code 404")
            message = "Уучлаарай сэрвэр дээр энэ өгөгдөл байхгүй байна...";
          else if (message === "Network Error")
            message =
              "Сэрвэр ажиллахгүй байна. Та түр хүлээгээд дахин оролдоно уу.";
          setError(message);
        }).finally(() => setRefreshing(false));

    }, [refreshing]))

  const searchFromServer = () => {
    if (localSearchText == null) {
      return;
    }

    console.log("first")
    console.log(localSearchText);
  }
  if (loading) {
    return <Spinner circleColor='gray' />;
  }
  if (error) {
    <ErrorText errorMsg={error} />
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>

      <Search
        value={localSearchText}
        onValueChange={setLocalSearchText}
        onFinishEnter={searchFromServer}
        placeholder="Барааны нэрээ оруулна уу"
      />

      {/* neg scroll View mash ih erelttei */}
      <ScrollView style={{
        // marginTop: 8,
      }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
            colors={["#DE4839", "#383CC1", "#6EC72D"]}
          />
        }
      >

        {/* <TopProduct searchLocalValue={localSearchText} refresh={refreshing} /> */}

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
      {/* fab */}
      <FAB
        icon="archive-search"
        mode="elevated"
        label=""
        size='medium'
        style={{
          backgroundColor: "#7DCEA0",
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        onPress={() => navigation.navigate("QR Screen")}
      />
      <FAB
        icon="archive-plus"
        mode="elevated"
        label=""
        size='medium'
        style={{
          // backgroundColor: "#7DCEA0",
          position: 'absolute',
          margin: 16,
          right: 64,
          bottom: 0,
        }}
        onPress={() => navigation.navigate("Insert QR Screen")}
      />
    </SafeAreaView>
  )
}

export default HomeScreen
