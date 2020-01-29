import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const NoteScreen = ({ navigation }) => {
  const [content, setContent] = useState(navigation.state.params.notes);

  return (
    <ScrollView>
      <TextInput
        style={styles.note}
        value={content}
        onChangeText={content => {
          setContent(content);
          navigation.state.params.setNotes(content);
        }}
        multiline={true}
        numberOfLines={15}
        autoFocus={true}
      />
    </ScrollView>
  );
};

NoteScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Timesheet Note',
    headerLeft: <TouchableOpacity onPress={() => navigation.goBack()}>
      <Feather style={styles.backIcon} name='arrow-left' />
    </TouchableOpacity>,
    headerRight: <TouchableOpacity onPress={() => navigation.goBack()}>
      <Text style={styles.saveBtn}>Save</Text>
    </TouchableOpacity>
  };
};

const styles = StyleSheet.create({
  note: {
    margin: 10,
    lineHeight: 20,
    // borderColor: 'red',
    // borderWidth: 2,
  },
  backIcon: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0275d8',
    marginLeft: 20,
  },
  saveBtn: {
    fontWeight: 'bold',
    color: '#0275d8',
    marginRight: 20,
  },
});

export default NoteScreen;


