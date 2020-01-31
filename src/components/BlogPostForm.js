import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { navigate } from '../navigationRef';
import TimeForm from './TimeForm';
import AttachPhotos from '../components/AttachPhotos';
import { Entypo } from '@expo/vector-icons';

const BlogPostForm = ({ id, initialValues, onSubmit, isChange, isCreate }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [notes, setNotes] = useState(initialValues.notes);
  const [startTime, setStartTime] = useState(initialValues.startTime);
  const [endTime, setEndTime] = useState(initialValues.endTime);
  const change = (title !== initialValues.title) || (notes !== initialValues.notes);

  useEffect(() => {
    isChange(change);
  }, [title, notes]);

  return (
    <ScrollView>
      <View style={styles.subContainer}>
        {/* <Text style={styles.lable}>TIME</Text> */}
        <TimeForm startTime={startTime} endTime={endTime} setStartTime={setStartTime} setEndTime={setEndTime} />
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.lable}>TASK</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={title => setTitle(title)}
        />
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.lable}>NOTES</Text>
        <TouchableOpacity
          onPress={() => {
            navigate("NoteEdit", { notes, setNotes });
          }}
        >
          {notes === '' ? (
            <View style={styles.emptyNote}>
              <Entypo style={styles.addIcon} name='plus' />
              <Text style={styles.emptyNoteText}>Add timesheet note</Text>
            </View>
          ) : (
              <Text style={styles.noteContent} numberOfLines={3} ellipsizeMode='tail'>
                {notes}
              </Text>
            )}
        </TouchableOpacity>
      </View>
      {!isCreate && <AttachPhotos id={id} />}
      <Button
        title="Save Timesheet"
        onPress={() => onSubmit(title, notes, startTime, endTime)}
      />
    </ScrollView>
  );
};

BlogPostForm.defaultProps = {
  initialValues: {
    title: "",
    notes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n\nFaucibus pulvinar elementum integer enim neque volutpat. Ut lectus arcu bibendum at varius. Lorem donec massa sapien faucibus et molestie."
  }
};

const styles = StyleSheet.create({
  subContainer: {
    marginHorizontal: 20,
    marginVertical: 20
  },
  lable: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 3
  },
  emptyNote: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addIcon: {
    fontSize: 22,
    color: '#20b2aa',
    marginRight: 5,
  },
  emptyNoteText: {
    color: '#20b2aa',
  },
  noteContent: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 3,
  }
});

export default BlogPostForm;
