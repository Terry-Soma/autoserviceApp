import React, { useState } from "react";
import { Text, View } from "react-native";
import { Searchbar } from "react-native-paper";
import PhoneList from "./../components/PhoneList/PhoneList";
import useCallNumber from "../hooks/useCallNumber";
import Search from "../components/Search";

const PhoneInfoScreen = () => {
  const [searchValue, setSearchValue] = useState(null);
  const [calls, loading, error] = useCallNumber();
  console.log('cla', calls)

  return (
    <View>
      {/* Search Bar */}
      <Search placeholder="Нэр болон утасны дугаар" />

      <PhoneList calls={calls} />
      {/* Phone and Info list 
    // zurag baival gargana
    
    // dugaar ner 
    
    // icon, copy , zalgah geh met
    
    */}

    </View>)
}

export default PhoneInfoScreen;