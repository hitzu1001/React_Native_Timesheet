import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { navigate } from '../navigationRef';

const BlogPostForm = ({ onSubmit, initialValues }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [notes, setNotes] = useState(initialValues.notes);

  return (
    <View>
      <View style={styles.subContainer}>
        <Text style={styles.lable}>TIME</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={title => setTitle(title)}
        />
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.lable}>TASK</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.lable}>NOTES</Text>
        <TouchableOpacity onPress={() => {
          navigate('Note', { notes, setNotes })
        }}>
          {notes === ''
            ? <Text>Add timesheet note</Text>
            : <Text style={styles.noteContent}>{notes}</Text>
          }
        </TouchableOpacity>
      </View>
      <Button
        title='Save Timesheet'
        onPress={() => onSubmit(title, notes)}
      />
    </View>
  );
};

BlogPostForm.defaultProps = {
  initialValues: {
    title: '',
    notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \nFaucibus pulvinar elementum integer enim neque volutpat. Ut lectus arcu bibendum at varius. Lorem donec massa sapien faucibus et molestie. \nTristique senectus et netus et malesuada fames. Ultrices dui sapien eget mi proin sed libero enim sed. Odio ut enim blandit volutpat maecenas. Non blandit massa enim nec. \nDictum non consectetur a erat nam at lectus. Viverra ipsum nunc aliquet bibendum enim facilisis gravida. Velit laoreet id donec ultrices tincidunt arcu non sodales neque.',
  }
};

const styles = StyleSheet.create({
  subContainer: {
    marginVertical: 20,
    marginHorizontal: 30,
  },
  lable: {
    fontSize: 16,
    marginBottom: 15,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
  },
  noteContent: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 3,
  }
});

export default BlogPostForm;
