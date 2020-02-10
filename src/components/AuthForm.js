import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import iconStyle from '../style/iconStyle';

const AuthForm = ({ headerText, errorMessage, buttonText, onSubmit, isSingup }) => {
  const [email, setEmail] = useState('snoopy.peanuts@test.com');
  const [password, setPassword] = useState('password');
  const [firstName, setFirstName] = useState('Charlie');
  const [lastName, setLastName] = useState('Brown');
  const [role, setRole] = useState('Employee');

  return (
    <View style={styles.screen}>

      <View style={styles.headerContainer}>
        <MaterialCommunityIcons style={iconStyle.signIcon} name='calendar-clock' />
        <Text style={styles.header}>{headerText}</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize='none'
          autoCorrect={false}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCapitalize='none'
          autoCorrect={false}
        />
      </View>

      {isSingup
        ?
        <>
          <View style={styles.container}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize='none'
              autoCorrect={false}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize='none'
              autoCorrect={false}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.label}>Role</Text>
            <RNPickerSelect
              items={[
                { label: 'Manager/Accounting', value: 'Manager' },
                { label: 'Foreman', value: 'Foreman' },
                { label: 'Employee', value: 'Employee' },
              ]}
              onValueChange={(value) => setRole(value)}
              style={{ pickerSelectstyles }}
              value={role}
              useNativeAndroidPickerstyle={false}
              textInputProps={{ underlineColor: 'yellow' }}
              Icon={() => {
                return <Feather name='arrow-down' size={22} color='#808080' />;
              }}
            />
          </View>
        </>
        : null
      }
      {errorMessage
        // ? <Text style={styles.errorMessage}>{errorMessage}</Text>
        ? alert(errorMessage)
        : null
      }
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            onSubmit({ email, password, firstName, lastName, role })
          }
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    marginHorizontal: 30,
    marginTop: 220,
  },
  headerContainer: {
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    color: '#20b2aa',
  },
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#444',
  },
  input: {
    marginTop: 5,
    paddingVertical: 5,
    fontSize: 15,
    color: '#444',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  errorMessage: {
    color: 'red',
  },
  button: {
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 6,
    backgroundColor: '#20b2aa',
  },
  buttonText: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    fontSize: 18,
    color: '#fff',
  },
});

const pickerSelectstyles = StyleSheet.create({
  inputIOS: {
    marginRight: 10,
    marginLeft: 10,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default AuthForm
