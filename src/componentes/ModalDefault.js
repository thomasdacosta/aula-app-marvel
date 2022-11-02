import { Button, Modal, Text, View } from "react-native";
import Estilos from "../estilos/Estilos";
import React, { useState } from "react";

const [modalDefaultVisible, setModalDefaultVisible] = useState(false);

export const ShowModal = (visible) => {
  setModalDefaultVisible(visible);
}

export default (mensagem) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalDefaultVisible}>
      <View style={Estilos.centeredView}>
        <View style={Estilos.modalView}>
          <Text style={Estilos.modalTextTitle}>Marvel App</Text>
          <Text
            style={Estilos.modalText}>{mensagem}</Text>
          <View style={Estilos.alignVertical}>
            <Button onPress={() => setModalDefaultVisible(!modalDefaultVisible)} title="Fechar" />
          </View>
        </View>
      </View>
    </Modal>
  );
}
