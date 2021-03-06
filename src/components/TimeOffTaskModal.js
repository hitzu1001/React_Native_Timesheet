import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal'
import { Ionicons } from '@expo/vector-icons';
import containerStyle from '../style/containerStyle';
import iconStyle from '../style/iconStyle';
import modalStyle from '../style/modalStyle';

const TimeOffTaskModal = ({ task, setTask }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <TouchableOpacity onPress={() => toggleModal()}>
        <View style={styles.input}>
          {task === 'Select time off reason'
            && <Ionicons style={iconStyle.cafeIcon} name='ios-cafe' />}
          <Text style={{
            ...styles.taskInput, color: task === 'Select time off reason' ? '#8e8e8e' : '#000',
          }}>
            {task}
          </Text>
        </View>
      </TouchableOpacity>
      <Modal
        style={{ margin: 0 }}
        isVisible={modalVisible}
        backdropOpacity={0.5}
        coverScreen={true}
      >
        <TouchableOpacity style={modalStyle.screenCenter} onPress={() => toggleModal()}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => {
              toggleModal(); setTask('Sick leave');
            }}>
              <Text style={styles.option}>Sick leave</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              toggleModal(); setTask('Holiday');
            }}>
              <Text style={styles.option}>Holiday</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              toggleModal(); setTask('Vacation');
            }}>
              <Text style={styles.option}>Vacation</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  input: {
    ...containerStyle.rowNullCenter,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 3,
  },
  taskInput: {
    marginLeft: 5,
  },
  modalContent:{
    ...modalStyle.shadowContainer8, 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    width: 200
  },
  option: {
    paddingVertical: 10,
    width: 200,
    textAlign: 'center',
    fontSize: 18,
    color: "#20b2aa",
    // borderColor: 'green',
    // borderWidth: 1,
  },
});
export default TimeOffTaskModal;