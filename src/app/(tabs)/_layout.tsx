import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{tabBarActiveTintColor: "coral"}}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({color, size, focused}) => <Ionicons name={focused?"home":"home-outline"} size={20}  />,
        }}
      />

      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon:()=><Ionicons name="information-circle" size={20} />
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon:()=><Ionicons name = "person" size = {20}/>
        }}
      />
    </Tabs>
  );
}