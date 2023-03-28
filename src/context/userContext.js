import axios from "axios";
import React, { useEffect, useState } from "react";
import { restUrl } from "../../Constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { async } from "@firebase/util";

const UserContext = React.createContext()
export const UserStore = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  // token dotroo userId and role aguulagdsan baigaa uchir iluu medeelel 
  // yvuulahgui shiidye tegvel app dotroo yaj serialize hiihiin

  useEffect(() => {
    const getItem = async () => {
      const token = await AsyncStorage.getItem("token")
      let userInfo = await AsyncStorage.getItem('userInfo')
      console.log('type of ', typeof userInfo)

      userInfo = userInfo != null ? JSON.parse(userInfo) : null
      if (userInfo == null || token == null) {
        return;
      }

      loginStateChange(token, userInfo)

      // await AsyncStorage.clear()
    }
    getItem()

  },
    []);

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userInfo");

    // await axios.get(`${restApiUrl}/api/v1/users/logout`);
    setIsLoggedIn(false);
    setToken(null);
    setUserName(null);
    setUserRole(null);
  };
  const loginStateChange = (token, userInfo = {}) => {
    setIsLoggedIn(true)
    setToken(token)
    setUserName(userInfo.ner)
    setUserRole(userInfo.role)
    setError(null)
  }
  const setAsyncStorage = async (token, userInfo) => {
    try {
      await AsyncStorage.setItem('token', token)
      await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
    } catch (error) {
      alert("Утас руу хадгалж чадсангүй...");
      setError(error)
    }

  }
  const Login = async (phone, pass) => {
    setLoading(true)
    try {
      const { data } = await axios.post(restUrl + "/api/auth/login", {
        phone, pass
      });
      console.log('result', data)
      if (data.success) {
        console.log('data', data.data)
        loginStateChange(data.token, { ner: data.data.ner, role: data.data.role })
        setAsyncStorage(data.token, { ner: data.data.ner, role: data.data.role })
      } else {
        setError("SOME ERROR LOGIN FUNCTION ((( !!!! )))")
      }

    } catch (error) {
      console.log('error', error)
      setError(error.response.data.message)
      console.log('result', error.response.data.message)
    }
    setLoading(false)
  }
  return (
    <UserContext.Provider value={{ isLoggedIn, token, userRole, userName, Login, error, loading, logout }}>
      {props.children}
    </UserContext.Provider>
  )
}
export default UserContext;