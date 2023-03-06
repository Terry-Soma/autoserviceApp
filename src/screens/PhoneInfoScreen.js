import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import PhoneList from "./../components/PhoneList/PhoneList";
import useCallNumber from "../hooks/useCallNumber";
import Search from "../components/Search";

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Toast from "./../components/Toast/Toast";
import Spinner from "../components/Spinner";

const PhoneInfoScreen = () => {
  const toastRef = useRef(null)
  const [searchValue, setSearchValue] = useState("");
  const [calls, loading, error] = useCallNumber();

  const filteredItems = calls?.filter(el =>
    el.ner.toLowerCase().includes(searchValue.toLowerCase()) ||
    el.dugaar.includes(searchValue)
  );

  if (loading) {
    return <Spinner />
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Search Bar */}
      {error && (
        <Text style={{ color: "red", fontSize: 16 }}>
          {error}
        </Text>
      )}
      <Toast ref={toastRef} />
      <Search placeholder="Нэр болон утасны дугаар"
        value={searchValue}
        onValueChange={setSearchValue} />

      <PhoneList calls={filteredItems} toastRef={toastRef} />
      {/* Phone and Info list 
    // zurag baival gargana
    
    // dugaar ner 
    
    // icon, copy , zalgah geh met
    
    */}
    </GestureHandlerRootView>)
}

export default PhoneInfoScreen;