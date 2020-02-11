import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import modalStyle from '../style/modalStyle';
import { navigate } from '../navigationRef';

const AuditTimesheet = ({ blogPost, onSubmit }) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          onSubmit(blogPost._id, blogPost.startTime, blogPost.endTime,
            blogPost.task, blogPost.notes, blogPost.images, 'APPROVED', () => {
              // navigation.pop();
              navigate('Show', { id: blogPost._id, startTime: blogPost.startTime, status: 'APPROVED' })
            })
        }}>
        <Text style={{ ...styles.buttonText, color: '#008000' }}>Approve</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          onSubmit(blogPost._id, blogPost.startTime, blogPost.endTime,
            blogPost.task, blogPost.notes, blogPost.images, 'DECLINED', () => {
              // navigation.pop();
              navigate('Show', { id: blogPost._id, startTime: blogPost.startTime, status: 'DECLINED' })
            })
        }}>
        <Text style={{ ...styles.buttonText, color: '#ff0000' }}>Decline</Text>
      </TouchableOpacity>
    </View>

  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    ...modalStyle.shadowContainer1,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    borderColor: '#ddd',
    borderWidth: 0.5,
  },
  buttonText: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    fontSize: 16,
  },
});
export default AuditTimesheet;
