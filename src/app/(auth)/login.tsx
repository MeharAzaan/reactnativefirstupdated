import { Color, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity
} from "react-native";

export default function LoginScreen() {
    const router = useRouter()
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.containor}>
        <Text style = {styles.title}>
          Welcome Back
        </Text>
          <Text style = {styles.subtitle}>
           Sign in to continue
        </Text>
        <View>
            <TextInput placeholder="dede" placeholderTextColor={"blue"} keyboardType="default" maxLength={12} style = {styles.input}/>
              <TextInput placeholder="dede" placeholderTextColor={"blue"} keyboardType="default" maxLength={12} secureTextEntry ={true} style = {styles.input}/>
              <TouchableOpacity onPress={()=>{}} style = {styles.button}>
              <Text style = {styles.beech} >
                Sign In
              </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{}} style = {styles.button}>
              <Text style = {styles.beech}>
                Sign Up 
              </Text>
              </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containor: {
    flex: 1,
    justifyContent: "center",
    padding:24,

    // alignItems: "center",
  },
  title:{
    fontSize:32,
    color:"black",
    fontWeight :"bold",
   marginBottom:6,
  },
  subtitle :{
    fontSize:18,
    color:"brown",
    fontWeight :"500",
   marginBottom:8,
   paddingLeft:1,
  },
  input:{
    width :"100%",
    backgroundColor:"#fff",
    padding:12,
    borderRadius:12,
    borderWidth:1,
     marginBottom:6,
     borderColor : "lightblue"
  },
 button :{
    alignItems : "center",
    justifyContent:"center",
    backgroundColor : "black",
    borderRadius : 10,
    marginBottom:10,
    height:"12%"
 }
,
beech:{
    color : "white"
}
});