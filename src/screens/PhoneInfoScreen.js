import React, { useRef, useState } from "react";
import { SafeAreaView, Text, TouchableWithoutFeedback, View } from "react-native";
import PhoneList from "./../components/PhoneList/PhoneList";
import useCallNumber from "../hooks/useCallNumber";
import Search from "../components/Search";

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Toast from "./../components/Toast/Toast";
const PhoneInfoScreen = () => {
  const toastRef = useRef(null)
  const [searchValue, setSearchValue] = useState(null);
  const [calls, loading, error] = useCallNumber();
  console.log('cla', calls)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView >
        {/* Search Bar */}
        <Toast ref={toastRef} />
        <Search placeholder="Нэр болон утасны дугаар" />
        <TouchableWithoutFeedback onPress={() => toastRef.current.show({ type: 'success', text: "Success Toast!!!", duration: 1500 })
        }>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Success Toast</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => toastRef.current.show({ type: 'warning', text: "Warning Toast!!", duration: 1000 })
        }>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Warning Toast</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => toastRef.current.show({ type: 'error', text: "Error Toast!", duration: 2000 })
        }>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Error Toast</Text>
          </View>
        </TouchableWithoutFeedback>

        <PhoneList calls={calls} />
        {/* Phone and Info list 
    // zurag baival gargana
    
    // dugaar ner 
    
    // icon, copy , zalgah geh met
    
    */}
      </SafeAreaView>
    </GestureHandlerRootView>)
}

export default PhoneInfoScreen;