import { Text, View, StyleSheet } from "react-native";
import { Host } from '@expo/ui';
import { BottomSheet, VStack, Button, ColorPicker } from "@expo/ui/swift-ui";
import { useState } from "react";

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const [color,setColor]=useState("blue");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      {/* Host wraps the SwiftUI Button and BottomSheet */}
      <Host style={styles.swiftUIContainer}>
        <VStack>
          <Button onPress={() => setIsOpen(true)}>
            <Text>Open Bottom Sheet</Text>
          </Button>
            <ColorPicker selection={color} onSelectionChange={setColor} />
            
          <BottomSheet isPresented={isOpen} onIsPresentedChange={setIsOpen}>
            <View style={styles.sheetContent}>
              <Text style={{ fontSize: 20 }}>This is the Bottom Sheet!</Text>
            </View>
          </BottomSheet>
        </VStack>
      </Host>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",     // Centers items horizontally
    justifyContent: "center", // Centers items vertically
    gap: 16,                  // Adds spacing between Profile text and Host container
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  swiftUIContainer: {
    alignItems: "center",     // Centers the SwiftUI content inside Host horizontally
    justifyContent: "center",
    height:"40%" // Centers the SwiftUI content inside Host vertically
  },
  sheetContent: {
    padding: 24,
    alignItems: "center",
  },
});