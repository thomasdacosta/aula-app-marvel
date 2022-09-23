import { Image, Pressable, Text, View } from "react-native";
import Estilos from "../estilos/Estilos";

export default ({item, evento, link}) => (
  <View>
    <Pressable onPress={evento}>
      <Image
        style={Estilos.imagemPersonagem}
        source={{
          uri: link,
        }}
      />
      <Text style={Estilos.paragraph}>{item.name}</Text>
    </Pressable>
  </View>
);
