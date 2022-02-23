import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, SafeAreaView, Button, Image, Platform} from 'react-native';
import React, {useState, useEffect} from 'react'; 
import StepIndicator from 'react-native-step-indicator';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const {width, height} = Dimensions.get("window");
const labels = ["Cart","Delivery Address","Order Summary","Cart","Delivery Address","Order Summary"];
import MapView from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import { Searchbar } from 'react-native-paper';

const MyComponent = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

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
  const [search, setSearch] = useState('');
  const [currentPosition, setCurrentPosition] = useState(0); 
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.id}
        {'.'}
        {item.title.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };

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
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
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

function MapScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.container_map}>
      <MapView style={styles.map} />
        </View>
    </View>
  );
}

function imagePicker() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}

function searchBar() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
     <Searchbar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Type Here..."
          value={search}
        />
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
          <Tab.Screen name="Maps" component={MapScreen} />
          <Tab.Screen name="ImagePicker" component={imagePicker} />
          <Tab.Screen name="Search" component={searchBar} />
        </Tab.Navigator>
        </NavigationContainer>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container_map: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
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
