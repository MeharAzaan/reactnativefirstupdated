import { Redirect } from "expo-router";

export default function EntryPoint() {
  // Forces the app to open the (auth) group first
  return <Redirect href="/(auth)" />;
}