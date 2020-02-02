import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { navigate } from '../navigationRef';
import TimeForm from './TimeForm';
import AttachPhotos from '../components/AttachPhotos';
import { Ionicons } from '@expo/vector-icons';

const BlogPostForm = ({ id, initialValues, onSubmit, isChange, isCreate }) => {
  const [startTime, setStartTime] = useState(initialValues.startTime);
  const [endTime, setEndTime] = useState(initialValues.endTime);
  const [task, setTask] = useState(initialValues.task);
  const [notes, setNotes] = useState(initialValues.notes);
  const [images, setImages] = useState(initialValues.images);
  const change = (task !== initialValues.task) || (notes !== initialValues.notes)
    || (images != initialValues.images);

  useEffect(() => {
    isChange(change);
  }, [task, notes, images]);

  console.log(images);

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
          value={task}
          onChangeText={task => setTask(task)}
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
              <Ionicons style={styles.addIcon} name='ios-add' />
              <Text style={styles.emptyNoteText}>Add timesheet note</Text>
            </View>
          ) : (
              <Text style={styles.noteContent} numberOfLines={3} ellipsizeMode='tail'>
                {notes}
              </Text>
            )}
        </TouchableOpacity>
      </View>
      {!isCreate && <AttachPhotos
        id={id}
        images={images}
        setImages={images => setImages(images)}
      />}
      <TouchableOpacity
        style={styles.saveBtn}
        onPress={() => onSubmit(startTime, endTime, task, notes,  images)}
      >
        <Text style={styles.saveText}>Save Timesheet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

BlogPostForm.defaultProps = {
  initialValues: {
    task: "",
    notes:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n\nFaucibus pulvinar elementum integer enim neque volutpat. Ut lectus arcu bibendum at varius. Lorem donec massa sapien faucibus et molestie.",
    images: [],
  }
};

const styles = StyleSheet.create({
  subContainer: {
    marginHorizontal: 20,
    marginTop: 20
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
  },
  saveBtn: {
    marginTop: 30,
    alignItems: 'center',
  },
  saveText: {
    fontSize: 18,
    color: '#20b2aa',
  },
});

export default BlogPostForm;
