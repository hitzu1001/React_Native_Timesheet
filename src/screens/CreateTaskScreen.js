import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Context as TaskContext } from '../context/TaskContext';
import { Entypo } from '@expo/vector-icons'
import iconStyle from '../style/iconStyle';

const CreateTaskScreen = ({ navigation }) => {
  const { addTask } = useContext(TaskContext);
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    navigation.setParams({ isChange });
    if (name === '') {
      setErrorMsg('Please enter a task name');
      setIsChange(false);
    } else {
      setErrorMsg('');
      setIsChange(true);
    }
  }, [name, isChange]);

  return (
    <>
      <View style={styles.subContainer}>
        <Text style={styles.lable}>TASK NAME</Text>
        <TextInput
          style={styles.input}
          value={name}
          placeholder='Enter task name'
          onChangeText={n => setName(n)}
        />
      </View>
      <TouchableOpacity
        style={styles.saveBtn}
        onPress={() => {
          if (errorMsg !== '') {
            Alert.alert(`Can't save task`, errorMsg,
              [{ text: 'Close', style: 'cancel' },],
              { cancelable: false },
            )
          } else {
            addTask(name, () => { navigation.pop() });
          }
        }}
      >
        <Text style={styles.saveText}>Save Task</Text>
      </TouchableOpacity>
    </>
  );
};

CreateTaskScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Add New Task',
    headerLeft: (
      <TouchableOpacity
        style={iconStyle.iconTouchLeft}
        onPress={() => {
          (navigation.state.params.isChange)
            ? Alert.alert('Discard changes?', '',
              [
                { text: 'Keep Editing', style: 'cancel' },
                { text: 'Discard', onPress: () => { navigation.pop(); } }
              ],
              { cancelable: false },
            )
            : navigation.pop();
        }}
      >
        <Entypo style={iconStyle.crossIcon} name='cross' />
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  subContainer: {
    marginHorizontal: 20,
    marginTop: 20
  },
  lable: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 3
  },
  saveBtn: {
    marginTop: 30,
    alignItems: 'center'
  },
  saveText: {
    fontSize: 18,
    color: '#20b2aa'
  }
});

export default CreateTaskScreen;
