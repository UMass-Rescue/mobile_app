# Mobile App

 ## Motivation

 Every person today has a phone, and why not? It is very convenient to carry, and it has amazing capabilities. If every detective has a phone, why can we not connect each detective with each other for better communication? Why can we not have a feature that can record interviews, and give us automated transcriptions? Why can we not have a map that can show us the location of each detective to further detect danger? We can do this and a lot more by making a mobile app specifically for detectives which will enable them to get interview transciprtions and a lot more. 


 ## Features

 This mobile app currently has the feature to record an interview, send the file to the backend services which inturn will send the recording to a Machine Learning model. The model will transcribe the entire voice recording into separate words and sentences. After the transcription is completed by the model, the text is sent returned to the backend and the backend returns this text in a json object to the frontend.


 ## Tech Stack

 We have developed the mobile app using a JavaScript based framework - React Native. React Native enables us to develop mobile applications that enable developers to code on a single code base and push code to both iOS and Android devices. External libraries have been used to add further functionality.

 Language:
 * JavaScript 

 Framework
 * React Native

 External Libraries:
 * react-native-paper
 * react-native-screens
 * react-native-navigation
 * react-native-search-bar
 * react-native-modal
 * expo-av


 ## Improvements

 In the future, the mobile app could be improved in the following ways:
 * Add chat functionality inside app which would enable detectives to chat with each other, make groups and communicate in a much more efficient manner
 * Add a map tracking feature which can track detectives on the field
 * Make a timeline of the entire project which would enable detectives to track the progress of the entire case
 * Make a canvas feature which would enable detectives to see a canvas on their mobile phone which can give them all details about their currently assigned case


 ## How to use

 We will provide with a .apk file which when clicked on an Android phone, will install the app on the phone. After entering the app, the user will see the 'Interview' screen by default. In the interview screen, when the user clicks on 'Record', the phone will start recording the sound, ie the interview. Upon clicking Stop, the recording will be saved and will be sent to the backend for processing. 