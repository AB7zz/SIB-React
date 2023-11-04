import { Stack } from "expo-router";
import { StateContextProvider } from "../context/StateContext";

export const unstable_settings = {
  initialRouteName: "home",
};

const Layout = () => {
  return (
    <StateContextProvider>
      <Stack initialRouteName="home">
        <Stack.Screen name="home" />
      </Stack>
    </StateContextProvider>
  )
};

export default Layout;
