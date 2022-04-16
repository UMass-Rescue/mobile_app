import MapView from 'react-native-maps';
import { View, Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get("window")

export default function MapScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.container_map}>
      <MapView initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }}style={styles.map} />
        </View>
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
    width: width,
    height: height,
  },
});