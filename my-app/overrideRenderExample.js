import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image, 
  Button, 
  TouchableOpacity,
  TextInput
} from 'react-native';
import Timeline from 'react-native-timeline-flatlist'
import Modal from "react-native-modal";
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native-web';



   const data = [
      {
        time: '09:00', 
        title: 'First Event', 
        description: 'Notes about the first Event ',
        lineColor:'#009688', 
        //icon: require('../img/archery.png'),
        imageUrl: 'https://www.filepicker.io/api/file/4C6yPDywSUeWYLyg1h9G'
      },
      {
        time: '10:45', 
        title: 'Second Event', 
        description: 'Notes about the Second Event ', 
       // icon: require('../img/badminton.png'),
        imageUrl: 'https://www.filepicker.io/api/file/4C6yPDywSUeWYLyg1h9G'
      },
      {
        time: '12:00', 
        title: 'Event', 
       // icon: require('../img/lunch.png'),
      },
      {
        time: '14:00', 
        title: 'Third Event', 
        description: 'Notes about the third Event  ',
        lineColor:'#009688', 
       // icon: require('../img/soccer.png'),
        imageUrl: 'https://www.filepicker.io/api/file/4C6yPDywSUeWYLyg1h9G'
      },
      {
        time: '16:30', 
        title: 'Fourth Event', 
        description: 'Notes about the fourth Event ', 
       //icon: require('../img/dumbbell.png'),
        imageUrl: 'https://www.filepicker.io/api/file/4C6yPDywSUeWYLyg1h9G'
      }, 
      {
        time: '09:10', 
        title: 'Fifth Event', 
        description: 'Notes about the fifth Event ',
        lineColor:'#009688', 
        //icon: require('../img/archery.png'),
        imageUrl: 'https://www.filepicker.io/api/file/4C6yPDywSUeWYLyg1h9G'
      },
      {
        time: '10:55', 
        title: 'Sixth Event', 
        description: 'Notes about the sixth Event ', 
       // icon: require('../img/badminton.png'),
        imageUrl: 'https://www.filepicker.io/api/file/4C6yPDywSUeWYLyg1h9G'
      },
      {
        time: '12:10', 
        title: 'Event', 
       // icon: require('../img/lunch.png'),
      },
      {
        time: '14:10', 
        title: 'Seventh Event', 
        description: 'Notes about the seventh Event  ',
        lineColor:'#009688', 
       // icon: require('../img/soccer.png'),
        imageUrl: 'https://www.filepicker.io/api/file/4C6yPDywSUeWYLyg1h9G'
      },
      {
        time: '16:40', 
        title: 'Eigth Event', 
        description: 'Notes about the eighth Event ', 
       //icon: require('../img/dumbbell.png'),
        imageUrl: 'https://www.filepicker.io/api/file/4C6yPDywSUeWYLyg1h9G'
      }
    ]
   const state = {selected: null}
  
/*
  const onEventPress = (data) =>  {
    this.setState({selected: data})
  }
*/
  const renderSelected = () => {
      if(state.selected)
        return <Text style={{marginTop:10}}>Selected event: {state.selected.title} at {state.selected.time}</Text>
  }


  const renderDetail = (rowData, sectionID, rowID) => {
    let title = <Text style={[styles.title]}>{rowData.title}</Text>
    var desc = null
    if(rowData.description && rowData.imageUrl)
      desc = (
        <View style={styles.descriptionContainer}>   
          <Image source={{uri: rowData.imageUrl}} style={styles.image}/>
          <Text style={[styles.textDescription]}>{rowData.description}</Text>
        </View>
      )
    
    return (
      <View style={{flex:1}}>
        {title}
        {desc}
      </View>
    )
  }
export default function TimeLineRender(){
  const [showModal, stateModal] = React.useState(false);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [titleChange, onChangetitle] = React.useState(null);
  const [detailChange, onChangeDetail] = React.useState(null);
  const [timeChange, onChangeTime] = React.useState(null);
  const [image, setImage] = React.useState(null);

  const addEvent = () => {
    if(detailChange && timeChange && image){
      data.push({
        time: timeChange, 
        title: titleChange, 
        description: detailChange,
        lineColor:'#009688', 
        //icon: require('../img/archery.png'),
        imageUrl: 'https://images.unsplash.com/photo-1534270804882-6b5048b1c1fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bmV3fGVufDB8fDB8fA%3D%3D&w=1000&q=80'
      });
    }
    else{
      Alert.alert("Error", "Fields Must Not Be Empty!")
    }
  }
const pickimage = async () => {
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


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

    return (
      
      <View style={styles.container}>
          {showModal ? (<View style={{ flex: 1 }}>
              <TextInput
          style={styles.input}
          onChangeText={onChangetitle}
          value={titleChange}
          placeholder="Event Title"
        />
          <TextInput
          style={styles.input}
          onChangeText={onChangeDetail}
          value={detailChange}
          placeholder="Event Details"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeTime}
          value={timeChange}
          placeholder="Time"
        />
             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Button title="Pick an image from camera roll" onPress={pickimage} />
              {image && <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />}
            </View>

          <TouchableOpacity onPress={() => addEvent()}>
            <Text>Add Event to Timeline</Text>
          </TouchableOpacity>
      
          <Button title="Show modal" onPress={toggleModal} />

        </View>
        ) : null}

        {renderSelected()}
        <Button title="Add Event"  onPress={() => stateModal(!showModal)}/>
        <Timeline 
          style={styles.list}
          data={data}
          circleSize={20}
          circleColor='rgba(0,0,0,0)'
          lineColor='rgb(45,156,219)'
          timeContainerStyle={{minWidth:52, marginTop: -5}}
          timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
          descriptionStyle={{color:'gray'}}
          options={{
            style:{paddingTop:5}
          }}

          onEventPress={toggleModal}
          
          innerCircle={'icon'}
          //onEventPress={onEventPress}
          renderDetail={renderDetail}
          columnFormat='single-column-right'
          detailContainerStyle={{marginBottom: 20, paddingLeft: 5, paddingRight: 5, backgroundColor: "#BBDAFF", borderRadius: 10}}
        />
          <Modal isVisible={isModalVisible}>
            <View style={{ flex: 1 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor: '#9FA8DA' }}>
            <Text>Title: </Text>
            <Text>Details: </Text>
            <Text>Time: </Text>
            <View style={{ flex: 1 }}> 
            <Image
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}
            />
            </View>
           
              <Button title="Hide modal" onPress={toggleModal} />
            </View>
             
            </View>
          </Modal>
      

      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
	paddingTop:65,
    backgroundColor:'white'
  },
  list: {
    flex: 1,
    marginTop:20,
  },
  title:{
    fontSize:16,
    fontWeight: 'bold'
  },
  descriptionContainer:{
    flexDirection: 'row',
    paddingRight: 50
  },
  image:{
    width: 50,
    height: 50,
    borderRadius: 25
  },
  textDescription: {
    marginLeft: 10,
    color: 'gray'
  }
});