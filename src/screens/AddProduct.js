import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Button, Platform, Alert, Image, Linking } from 'react-native'
// import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import ImagePickerExample from "../components/Test";
import { ActivityIndicator, } from "react-native-paper";
import { app, storage } from '../../firebaseConfig'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import * as Animatable from "react-native-animatable";
import FormText from "../components/FormText";
import { StatusBar } from "expo-status-bar";

export default function AddProduct() {
  const [image, setImage] = useState();
  const [uploading, setUploading] = useState(false);
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const takeImage = async () => {
    // ask Permission 
    // const result = await PermissionsAndroid.askAsync(PermissionsAndroid.PERMISSIONS.CAMERA);
    // if (result.status === "granted") {
    //   console.log('ssss')


    // } else {
    //   Alert.alert("Анхаар ", "Зураг авахын тулд эрхүүдийг нээх шаардлагатай", [{ text: "ЗА" }])
    //   return;
    // }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.7
    })
    if (!image.cancelled) {
      setImage(image.uri);
    }

  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.7,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const uploadImage = async () => {
    setUploading(true)
    const fileName = image.substring(image.lastIndexOf('/') + 1);
    const fileExt = fileName.substring(fileName.lastIndexOf('.') + 1);
    const metadata = { contentType: `image/${fileExt}` };
    const storageRef = ref(storage, `Upload/${fileName}`);

    const response = await fetch(image);
    const blob = await response.blob();
    const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.log('error', error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );
    setUploading(false)
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Анхаар!",
            "Уучлаарай, та утаснаас зураг сонгох эрхийг зөвшөөрч байж зураг оруулах боломжтой. Та утасныхаа тохиргооны цонхноос энэ апп-д зураг үзэх бичих эрхийг нээж өгнө үү.",
            [{
              text: "Тохиргоог нээх",
              onPress: () => {
                if (Platform.OS === "ios") Linking.openURL("app-settings:");
                else {
                  // android intent
                  IntentLauncher.startActivityAsync(
                    IntentLauncher.ACTION_APPLICATION_SETTINGS
                  );
                }
              }
            },
            { text: "Ok", onPress: () => { } }
            ]
          );
        }
      }
    })();
  }, []);
  // "categoryId": 1,
  //   "come_date": "2022-02-13",
  //         "location": "Гаражны хойд тавиур",
  //           "ner": "95 урд гэрэл",
  //             "serNum": "",
  //               "shirheg": 12,
  //                 "une": 100,
  //                   "cner": "Гэрэл дохио"

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#3498DB" }}>
      <StatusBar backgroundColor="#3498DB" barStyle="dark-content" />

      <View
        style={{
          flex: 1,
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: "tomato"
        }}
      >
        <Text style={{ fontSize: 30, color: "#05375a" }}>
          Шинээр бараа нэмэх
        </Text>
        <Text style={{ fontSize: 16, color: "#05375a", marginTop: 10 }}>
          Та барааны мэдээллээ оруулна уу
        </Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        duration={800}
        style={{
          flex: 5,
          paddingHorizontal: 20,
          paddingVertical: 30,
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: "#fff",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30
        }}
      >
        <ScrollView>
          {/* image picker */}
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <View style={{ flexDirection: "row", }}>
              <Button title="Галерейгээс зураг сонгох" onPress={pickImage} />
              <Button title="Зураг авах" onPress={takeImage} />
            </View>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          </View>
          {!uploading ? <Button title='Upload Image' onPress={uploadImage} /> : <ActivityIndicator size={'small'} color='black' />}
          {/* image picker */}

          {/* information  */}
          <FormText
            label="Номын нэрийг оруулна уу"
            placeholder="Номын нэр"
            icon="book-open"
            value={"sdfsdfsdf"}
            onChangeText={() => { }}
            errorText="Номын нэрийн урт 4-20 тэмдэгтээс тогтоно."
            errorShow={"sdfsfd"}
          />

        </ScrollView>

      </Animatable.View>
    </SafeAreaView>
  )
}