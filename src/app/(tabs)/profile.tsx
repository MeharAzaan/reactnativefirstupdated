
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text>Welcome to Profile Screen</Text>

      <Image
        style={styles.image}
        source={{
          uri: "https://i.pinimg.com/474x/c7/d5/1b/c7d51b69e121c9b9dc17628c1ab5651b.jpg",
        }}
      />

      <TextInput
        placeholder="dedebode"
        style={styles.textinput}
      />

      <ActivityIndicator size="large" color="blue" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 200,
    width: 200,
  },
  textinput: {
    borderWidth: 1,
    width: 200,
    padding: 10,
  },
});
