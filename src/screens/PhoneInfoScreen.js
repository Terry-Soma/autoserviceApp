import React, { useCallback, useEffect, useRef, useState } from "react";
import { Text, } from "react-native";
import PhoneList from "./../components/PhoneList/PhoneList";
import useCallNumber from "../hooks/useCallNumber";
import Search from "../components/Search";
import { FAB } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Toast from "./../components/Toast/Toast";
import Spinner from "../components/Spinner";
import axios from "axios";
import { restUrl } from "../../Constants";

const PhoneInfoScreen = ({ navigation, route }) => {
  const toastRef = useRef(null)
  const [searchValue, setSearchValue] = useState("");
  const [calls, setCalls, setLoading, loading, , error] = useCallNumber();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route.params?.refresh) {
        setLoading(true)
        axios.get(`${restUrl}/api/calls/`).then(result => {
          setCalls(result.data.data)
          setLoading(false)
        }).catch((err) => {
          console.log('err', err)
        })
        delete route.params.refresh
      }
      if (route.params?.deletedPhone) {
        setCalls(prev => prev.filter((el) => el.id !== route.params.deletedPhone?.id))
        delete route.params?.deletedPhone
      }


      // do something
      // refetch calls
    });

    return unsubscribe;
  }, [navigation, route.params]);
  const filteredItems = calls?.filter(el =>
    el.ner.toLowerCase().includes(searchValue.toLowerCase()) ||
    el.dugaar.includes(searchValue)
  );
  if (loading) {
    return <Spinner />
  }
  if (error) {
    return <Text style={{ color: "red", fontSize: 16 }}>
      {error}
    </Text>
  }
  return (
    <GestureHandlerRootView
      style={{ flex: 1, }}
    >
      <Toast ref={toastRef} />
      <Search placeholder="Нэр болон утасны дугаар"
        value={searchValue}
        onValueChange={setSearchValue} />
      <PhoneList calls={filteredItems} toastRef={toastRef} />
      <FAB
        icon="plus"
        variant="secondary"
        mode="elevated"
        label="Дугаар нэмэх"
        style={{
          margin: 8,
          right: 0,
          bottom: 0,
        }}
        onPress={() => navigation.navigate("ManagePhoneInfo")}
      />
    </GestureHandlerRootView>)
}

export default PhoneInfoScreen;
