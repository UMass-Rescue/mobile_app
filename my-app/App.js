import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react'; 
import StepIndicator from 'react-native-step-indicator';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const {width, height} = Dimensions.get("window");
const labels = ["Cart","Delivery Address","Order Summary","Cart","Delivery Address","Order Summary"];

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#00FFFF',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#00FFFF',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#00FFFF',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#00FFFF',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#00FFFF',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#00FFFF'
}



export default function App() {
  const [currentPosition, setCurrentPosition] = useState(0); 
  
  const nextStep = () => {
    if (currentPosition < 5) {
      setCurrentPosition(currentPosition + 1)
    }
    
  }
  const backStep = () => {
    if (currentPosition > 0) {
      setCurrentPosition(currentPosition - 1)
    }
  }

  const data = [
    {
        label: 'Started Investigation', 
        status : 'Notes about this',
        dateTime: 'Sat, 3rd Nov 11:49pm',
    },
    {
      label: 'Middle Investigation', 
      status : 'Notes about this',
      dateTime: 'Sun, 4th Nov 1:00am',
   },

    {
      label: 'More Investigation', 
      status : 'Notes about this',
      dateTime: 'Friday, 16th Nov 1:00pm',

    },
    {
      label: 'Penultimate Investigation', 
      status : 'Notes about this',
      dateTime: 'Sat, 20th Nov 11:49pm',
  },
  {
    label: 'End Investigation', 
    status : 'Notes about this',
    dateTime: 'Sun, 29th Nov 1:00am',
 },

  {
    label: 'End Investigation', 
    status : 'Notes about this',
    dateTime: 'Friday, 16th Nov 1:00pm',

  },


  ];

  function TimeLineScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar backgroundColor="#000" barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.headerText}>
              TimeLine
            </Text>
        </View>
        <View style={styles.indicatorContainer}>
              <StepIndicator
              customStyles={customStyles}
              currentPosition={currentPosition}
              labels={labels}
              direction = "vertical"
              renderLabel={({position, stepStaus, label, crntPosition})  => {
                return (
                  <View style = {styles.lblContainer}>  
                      <Text style={styles.lblText}>{data[position].label}</Text>
                      <Text style={styles.lblNotes}>{data[position].status}</Text>
                      <Text style={styles.lblNotes}>{data[position].dateTime}</Text>
                  </View>
                )
              }} 
          />
          <TouchableOpacity style={styles.nextBtn} onPress={() => nextStep()}>
            <Text style={styles.text}> 
              Next
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backBtn} onPress={() => backStep()}>
            <Text style={styles.text}> 
              Back
            </Text>
          </TouchableOpacity>
        </View>
     </View>
    </SafeAreaView>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
  console.disableYellowBox = true; 
  return (

    <View style={styles.container}>
      
        <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="TimeLine" component={TimeLineScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />

        </Tab.Navigator>
        </NavigationContainer>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : '#000',
  },
  header:{
    height : 90, 
    padding : 10,
    width: "100%",
    backgroundColor: '#000',
    elevation : 10, 
    justifyContent : "center", 
    alignItems : "center"
  }, 
  headerText : {
    color : "#00FFFF", 
    fontSize: 22, 
    fontWeight : 'bold'
  },
  indicatorContainer:{
      height: height - 170, 
      width: width - 30, 
      padding: 20, 
      margin: 15, 
      elevation: 10, 
      borderRadius: 20,
      backgroundColor: '#000',
  },
  lblContainer :{
    marginTop: 30, 
    padding: 10,
    paddingLeft : 5, 
    width: width - 100,
  }, 
  lblText :{
    fontSize: 17, 
    color: "#fff", 
    width: width - 100,
  }, 
  lblNotes :{
    fontSize: 12, 
    color: "#ffa", 
    width: width - 100,
  },
    nextBtn :{
        flexDirection: 'row-reverse',
        height: 30,
    },
    backBtn :{
      flexDirection: 'row', 
      height: 50,

  },
    text:{
      color: '#ff3232', 
      fontSize: 18,
    },


});
