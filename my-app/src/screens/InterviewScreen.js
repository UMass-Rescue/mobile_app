import React from "react";
import { Audio } from 'expo-av';
import * as FileSystem from "expo-file-system";
import { EAzureBlobStorageFile } from 'react-native-azure-blob-storage';
import {View, StyleSheet, Button, Text} from "react-native";

export default function InterviewScreen() {
  console.log("InterviewScreen");
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [text, setText] = React.useState("");
  const FLASK_BACKEND = "http://127.0.0.1:8000";
  const [transcriptScripts, setTranscriptScripts] = React.useState(["Transcript"]);

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });
        
        const { recording } = await Audio.Recording.createAsync({
          android: {
            extension: ".mp4",
            audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
            outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
          },
          ios: {
            extension: ".wav",
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
            audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
            outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM,
          },
        });

        setRecording(recording);
      } else {
        setMessage("Please grant permission to app to access microphone");
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });

    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    var r_ = {
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI()
    }
    console.log(r_)
    updatedRecordings.push(
      r_
    );
    const uri = recording.getURI(); 
    console.log('Recording stopped and stored at', uri);
    setRecordings(updatedRecordings);
    try {
      const response = await FileSystem.uploadAsync(
        FLASK_BACKEND,
        uri
      );
      const body = JSON.parse(response.body);
      setText(body.text);
    } catch (err) {
      console.error(err);
      console.log('Flask Did not Work');
    }
    setTranscriptScripts(transcriptScripts => [...transcriptScripts, "Transcript"])

  }

  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  function getRecordingLines() {
    //const [transcription, setTranscription] = useState("Transcribe interview by clicking transcribe button");
    const [numbers, setnumbers] = React.useState([0]);
 

    async function transcribeRecording(index){
      transcriptScripts[index] = "This is where the transcription will go"
      //const blob_key = uuid();
      //const blockBlobClient = containerClient.getBlockBlobClient(blob_key);
      
      console.log(recordings[index])
      //console.log(blob_key)


      const data = new FormData();
      //data.append('audioObject', new Blob([recordings[index]]));
      console.log(typeof(data))
     // await blockBlobClient.upload(Buffer.from(data));

    console.log("Before Audio File")
    console.log(recordings[index]['file'])
    console.log("After Audio File")

    React.useEffect(() => {
      EAzureBlobStorageFile.configure(
        "https://jagathrescue.blob.core.windows.net/596e-backend", //Account Name
        "sp=racwdli&st=2022-03-02T18:39:33Z&se=2022-06-02T01:39:33Z&spr=https&sv=2020-08-04&sr=c&sig=7hdLnsjVUTPNmfzV2RJBkZdUP%2BrkVKrWlcEibwvKeIA%3D", //Account Key
        "596e-backend", //Container Name
         false //SAS Token 
      )
    }, []); 
   
    console.log(recordings[index]['file']);
    console.log("Sucessful Upload");
    EAzureBlobStorageFile.uploadFile(recordings[index]['file'])

      console.log(index)
      setnumbers(numbers => [...numbers, index]);
      //setTranscription("This is where the transcription will go");
    }
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <View style={{ flexDirection: "row" ,marginLeft: 20, justifyContent: 'space-evenly' }}>
            <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration} </Text>
            <Button style={styles.button_transcribe} onPress={() => transcribeRecording(index)} title="Transcribe"></Button>
           </View>
           <Text style={styles.titleText}>
              {"\n"}
              {transcriptScripts[index]}
              {"\n"}
              {numbers[index]}
              {"\n"}
              {"\n"}
            </Text>
          <Button style={styles.button} onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
        </View>
      );
    });
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Button
      title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording} />
      {getRecordingLines()}
    </View>
  );
}

const styles = StyleSheet.create({
  button_transcribe: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'red',
  },
});