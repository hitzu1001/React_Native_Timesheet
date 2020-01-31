import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';

const NoteEditScreen = ({ navigation }) => {
  const [content, setContent] = useState(navigation.state.params.notes);

  useEffect(() => {
    navigation.setParams({ content });
  }, [content]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.note}
        value={content}
        onChangeText={content => {
          setContent(content);
          navigation.state.params.setNotes(content);
        }}
        multiline={true}
        autoFocus={true}
      />
    </View>
  );
};

NoteEditScreen.navigationOptions = ({ navigation }) => {
  const { notes, setNotes, content } = navigation.state.params;
  return {
    title: 'Timesheet Note',
    headerLeft: <TouchableOpacity onPress={() => {
      (content === notes)
        ? navigation.pop()
        : Alert.alert('Discard changes?', '',
          [
            {
              text: 'Keep Editing',
              style: 'cancel'
            },
            {
              text: 'Discard',
              onPress: () => {
                setNotes(notes);
                navigation.pop();
              }
            }
          ],
          { cancelable: false },
        )
    }}>
      <Feather style={styles.backIcon} name='arrow-left' />
    </TouchableOpacity>,
    headerRight: <TouchableOpacity onPress={() => navigation.pop()}>
      <FontAwesome style={styles.saveIcon} name='save' />
    </TouchableOpacity>
  };
};



const styles = StyleSheet.create({
  container: {
    height: 400
  },
  note: {
    margin: 20,
    lineHeight: 20,
    // borderColor: 'red',
    // borderWidth: 2,
  },
  backIcon: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#20b2aa',
    marginLeft: 20,
  },
  saveIcon: {
    fontSize: 20,
    color: '#20b2aa',
    marginRight: 20,
  },
});

export default NoteEditScreen;


