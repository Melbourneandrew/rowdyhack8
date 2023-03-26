import React, {useState, useEffect} from 'react';
import { Text, Button, View, SafeAreaView, StyleSheet, FlatList} from 'react-native';
import { Audio } from "expo-av";



export default function App (){

  const [recordingList, setRecordingList] = useState([])
  const [sound, setSound] = useState()
  const [recording, setRecording] = useState()
  const [isPlaying, setIsPlaying] = useState(false)

  async function playSound({ uri }) {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync({uri: uri})

    setSound(sound)

    console.log('Playing Sound')

    await sound.playAsync()

  }
  useEffect(() => {

    return sound ? () => {
      console.log("Unloading Sound")
      sound.unloadAsync()
    }
    : undefined
  }, [sound])

  useEffect(() => {
    console.log(recordingList)
  }, [recordingList])

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();

    setRecordingList([
      ...recordingList,
    {
      id: recordingList.length + 1,
      title: `Recording ${recordingList.length + 1}`,
      uri: `${uri}`

    }])

    console.log('Recording stopped and stored at', recordingList);
  }

  
      return(

        <SafeAreaView style={styles.container} >
          <View><Text style={{textAlign: 'center', marginTop: '30%', marginBottom: '20%'}}>TutorAI</Text></View>
           <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
        />
        <View>
        <FlatList 
        style={styles.records}
        data={recordingList}
        renderItem={({item}) => (

          <View style={styles.recording}>
          <Text style={styles.title}>{item.title}</Text>
          <Button style={styles.play} title={isPlaying == true ? "Pause" : "Play"}
          onPress={() => playSound(item)}></Button>
          </View>


      )}
        keyExtractor={recording => recording.id}
      />
        </View>
        </SafeAreaView>
      )

    
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 8,
  },
  records: {

    height: '70%',
    borderTopWidth: 2,
    borderTopColor: 'gray',
    marginTop: '10%'


  },
  recording: {

    width: '100%',
    borderBottomWidth: 2,
    height: 80,
    borderBottomColor: 'gray',
    textAlign: 'center',


  },

  title: {
    color: 'black',
    textAlign: 'center'
  },

  play: {

    backgroundColor: 'green',
    color: 'white',
    fontSize: 16
  }
});