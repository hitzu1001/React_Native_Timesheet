import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Context as TaskContext } from '../context/TaskContext';
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import iconStyle from '../style/iconStyle';

const EditTaskScreen = ({ navigation }) => {
  const { deleteTask, editTask } = useContext(TaskContext);
  const task = navigation.getParam('item');
  const [name, setName] = useState(task.name);
  const [editable, setEditable] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isChange, setIsChange] = useState(false);



  useEffect(() => {
    const callEditTask = () => {
      editTask(task._id, name, () => {
        setEditable(false);
        navigation.navigate("EditTask", { task });
      });
    };
    const callDeleteTask = () => {
      deleteTask(task._id, () => {
        navigation.navigate('TaskList');
      });
    };
    navigation.setParams({ callEditTask, callDeleteTask });
  }, []);

  useEffect(() => {
    navigation.setParams({ editable, setEditable, errorMsg, isChange });
    (name === '') ? setErrorMsg('Please enter a task name') : setErrorMsg('');
  }, [name, editable]);

  return (
    <>
      <View style={styles.subContainer}>
        <Text style={styles.lable}>TASK NAME</Text>
        <TextInput
          style={{
            ...styles.input,
            color: editable ? null : '#696969',
            backgroundColor: editable ? null : '#dcdcdc',
          }}
          value={name}
          placeholder='Enter task name'
          onChangeText={n => {
            setName(n);
            (n === task.name) ? setIsChange(false) : setIsChange(true);
          }}
          editable={editable}
          autoFocus={true}
        />
      </View>
    </>
  );
};

EditTaskScreen.navigationOptions = ({ navigation }) => {
  const { callEditTask, callDeleteTask, editable, setEditable, isChange, errorMsg }
    = navigation.state.params;
  return {
    title: 'Edit Task',
    headerLeft:
      <TouchableOpacity style={iconStyle.iconTouchLeft}
        onPress={() => {
          (editable && isChange)
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
        <Ionicons style={iconStyle.backIcon} name='ios-arrow-back' />
      </TouchableOpacity>,
    headerRight:
      <>
        {editable
          ? (
            <TouchableOpacity
              style={iconStyle.iconTouchRight}
              onPress={() => {
                (errorMsg !== '')
                  ? Alert.alert(`Can't save task`, errorMsg,
                    [{ text: 'Close', style: 'cancel' },],
                    { cancelable: false },
                  ) : callEditTask();
              }}
            >
              <Ionicons style={iconStyle.saveIcon} name='ios-save' />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={iconStyle.iconTouchRight}
              onPress={() => setEditable(true)}
            >
              <FontAwesome style={iconStyle.editIcon} name='pencil' />
            </TouchableOpacity>
          )
        }

        <TouchableOpacity
          style={iconStyle.iconTouchRight}
          onPress={() => callDeleteTask()}
        >
          <Ionicons style={iconStyle.trashIcon} name='md-trash' />
        </TouchableOpacity>
      </>
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

export default EditTaskScreen;
