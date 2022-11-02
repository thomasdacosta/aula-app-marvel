import { Button, Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import Estilos from "../estilos/Estilos";
import React from "react";

const App = ({route, navigation}) => {
  const { item } = route.params;

  return (
    <SafeAreaView style={Estilos.safeAreaView}>
      <ScrollView>
        <Text style={Estilos.detalhePersonagem}>História</Text>
        <Text style={Estilos.detalhePersonagem}>{item.name}</Text>
      </ScrollView>
    </SafeAreaView>
  )
}
export default App;
