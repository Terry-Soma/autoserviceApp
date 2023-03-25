import React, { useEffect, useState } from "react";
import { Text, View, FlatList, SafeAreaView, Pressable } from "react-native";
import Search from "../components/Search";
import useCategory from "../hooks/useCategory";
import { Feather } from '@expo/vector-icons';
import { fontVar } from "../../Constants";
import { FAB } from "react-native-paper";
const ManageCategoryScreen = ({ navigation }) => {


  const [searchValue, setSearchValue] = useState("")

  const [categories, setCategories, setError, error, loading] = useCategory();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // if (route.params?.refresh) {
      //   setLoading(true)
      //   axios.get(`${restUrl}/api/calls/`).then(result => {
      //     setCalls(result.data.data)
      //     setLoading(false)
      //   }).catch((err) => {
      //     console.log('err', err)
      //   })
      //   delete route.params.refresh
      // }
      if (route.params?.createdCat) {
        setCategories(prev => [...prev, ...createdCat])
        delete route.params?.createdCat
      }


      // do something
      // refetch calls
    });

    return unsubscribe;
  }, [navigation, route.params]);
  // category with products
  const filteredItems = categories?.filter(el => el.ner.toLowerCase().includes(searchValue.toLowerCase()));
  return (
    <SafeAreaView style={{ marginHorizontal: 12, flex: 1 }}>
      <Search placeholder="Категорийн нэр"
        value={searchValue}
        onValueChange={setSearchValue} />

      <FlatList data={filteredItems} renderItem={({ item }) => {
        return (
          <Pressable onPress={() => navigation.navigate("CategoryProducts", { category: item })}
            style={({ pressed }) => [{ height: 36, backgroundColor: "white", marginVertical: 4, borderRadius: 12, elevation: 5, padding: 2, justifyContent: "center" }, pressed && {
              opacity: 0.5,
              backgroundColor: "#ECECEC",
              borderRadius: 4,
            }]}
            android_ripple={{ color: "#ccc" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 6 }}>
              <Text style={{ marginLeft: 12, fontFamily: fontVar.Mont.sb, fontSize: 16 }}>{item.ner}</Text>
              <Feather name="chevron-right" size={24} color="black" />
            </View>
          </Pressable>
        )
      }}
        keyExtractor={(item) => item.id} />

      {/* add category */}
      <FAB
        icon="plus"
        variant="secondary"
        mode="elevated"
        label="Категори нэмэх"
        style={{
          margin: 8,
          right: 0,
          bottom: 0,
        }}
        onPress={() => navigation.navigate("AddCategory")}
      />
    </SafeAreaView >
  )

}

export default ManageCategoryScreen