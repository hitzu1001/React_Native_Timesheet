import React, { useState } from 'react';
import { Modal, Text, TouchableHighlight, View, Alert } from 'react-native';

const ModalExample = () => {
  const [modalVisible, setmodalVisible] = useState(false);

  return (
    <View style={{ margin: 50 }}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
        presentationStyle='formSheet'
        onDismiss={()=>setmodalVisible(false)}
      >
        <View style={{ margin: 50 }}>
          <View style={{ width: 300, height: 300, backgroundColor: 'pink' }}>
            <Text>Hello World!</Text>

            <TouchableHighlight
              onPress={() => {
                setmodalVisible(!modalVisible);
              }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        onPress={() => {
          setmodalVisible(true);
        }}>
        <Text>Show Modal</Text>
      </TouchableHighlight>
    </View>
  );
}

export default ModalExample;