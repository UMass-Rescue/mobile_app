import {
  StyleSheet, View,
} from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SearchScreen from './src/screens/SearchScreen';
import TimeLineScreen from './src/screens/TimeLineScreen';
import ImagePickerScreen from './src/screens/ImagePickerScreen';
import MapScreen from './src/screens/MapScreen';
import InterviewScreen from './src/screens/InterviewScreen';


// const { BlobServiceClient } = require("@azure/storage-blob");

// const server_url = "http://localhost:8000/";
// const example_worker_endpoint = server_url + "predict_worker_example/";

// const blobSasUrl =
//   "https://jagathrescue.blob.core.windows.net/596e-backend?...";
// const blobContainer = "596e-backend";
// const blob_credential = "sp=racwdli&st=2022-03-02T18:39:33Z&se=2022-06-02T01:39:33Z&spr=https&sv=2020-08-04&sr=c&sig=7hdLnsjVUTPNmfzV2RJBkZdUP%2BrkVKrWlcEibwvKeIA%3D"
// const blobServiceClient = new BlobServiceClient(blobSasUrl);
// const containerClient = blobServiceClient.getContainerClient(blobContainer);

export default function App() {
  console.log("App Started")
  const Tab = createBottomTabNavigator();
  console.disableYellowBox = true;

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Interview" component={InterviewScreen} />
          <Tab.Screen name="TimeLine" component={TimeLineScreen} />
          <Tab.Screen name="Maps" component={MapScreen} />
          <Tab.Screen name="ImagePicker" component={ImagePickerScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
