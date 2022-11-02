import { BackHandler } from "react-native";

export const desabilitarBotaoBackAndroid = () => {
  const backHandler = BackHandler.addEventListener("hardwareBackPress", () => true);
  return () => backHandler.remove();
}
