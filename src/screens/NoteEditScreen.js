import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import iconStyle from '../style/iconStyle';

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
    headerLeft: <TouchableOpacity style={iconStyle.iconTouchLeft}
      onPress={() => {
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
      <Ionicons style={iconStyle.backIcon} name='ios-arrow-back' />
    </TouchableOpacity>,
    headerRight: <TouchableOpacity style={iconStyle.iconTouchRight}
      onPress={() => navigation.pop()}>
      <Ionicons style={iconStyle.saveIcon} name='ios-save' />
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

});

export default NoteEditScreen;


