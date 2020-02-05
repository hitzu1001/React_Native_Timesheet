import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal'
import { MaterialIcons } from '@expo/vector-icons';
import iconStyle from '../style/iconStyle';

const TimeOffModal = ({ task, setTask }) => {
  const [modalVisible, setmodalVisible] = useState(false);

  const toggleModal = () => {
    setmodalVisible(!modalVisible);
  };

  return (
    <>
      <TouchableOpacity onPress={() => toggleModal()}>
        <View style={styles.input}>
          {task === 'Select leave reason'
            && <MaterialIcons style={iconStyle.crossIcon} name='time-to-leave' />}
          <Text style={styles.taskInput}>{task}</Text>
          {/* <TextInput style={styles.input} value={task} placeholder='Select leave reason' editable={false} /> */}
        </View>
      </TouchableOpacity>
      <Modal
        style={{ margin: 0 }}
        isVisible={modalVisible}
        backdropOpacity={0.5}
        coverScreen={true}
      >
        <TouchableOpacity style={styles.modalContainer} onPress={() => toggleModal()}>
          <View style={styles.modalOptions}>
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
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskInput: {
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOptions: {
    width: 200,
    height: 150,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 15,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
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
export default TimeOffModal;