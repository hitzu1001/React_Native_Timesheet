import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal'
import { Ionicons, Entypo } from '@expo/vector-icons';
import iconStyle from '../style/iconStyle';
import modalStyle from '../style/modalStyle';

const TimeOffNoteModal = ({ notes, setNotes }) => {
  const [modalVisible, setmodalVisible] = useState(false);
  const [content, setContent] = useState(notes);

  const toggleModal = () => {
    setmodalVisible(!modalVisible);
  };

  return (
    <>
      <TouchableOpacity onPress={() => toggleModal()}>
        {notes === '' ? (
          <View style={styles.emptyNote}>
            <Ionicons style={styles.addIcon} name='ios-add' />
            <Text style={styles.emptyNoteText}>Add timesheet note</Text>
          </View>
        ) : (
            <Text
              style={styles.noteContent}
              numberOfLines={3}
              ellipsizeMode='tail'
            >
              {notes}
            </Text>
          )}
      </TouchableOpacity>
      <Modal
        style={{ margin: 0 }}
        isVisible={modalVisible}
        backdropOpacity={0.5}
        coverScreen={true}
      >
        <View style={modalStyle.screenCenter} >
          <View style={{ ...modalStyle.container, width: 300 }}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalText}>Time Off Notes</Text>
              <TouchableOpacity
                style={iconStyle.iconTouchLeft}
                onPress={() => {
                  toggleModal();
                  setNotes(content);
                }}>
                <Entypo style={iconStyle.crossIcon} name='cross' />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.modalNotes}
              value={content}
              onChangeText={content => setContent(content)}
              multiline={true}
              autoFocus={true}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  emptyNote: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  addIcon: {
    fontSize: 22,
    color: '#20b2aa',
    marginRight: 5
  },
  emptyNoteText: {
    color: '#20b2aa'
  },
  noteContent: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 3
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    flex: 1,
    marginLeft: 35,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalNotes: {
    marginHorizontal: 10,
    marginBottom: 5,
    padding: 10,
    width: 280,
    height: 130,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 8,
  },
});
export default TimeOffNoteModal;