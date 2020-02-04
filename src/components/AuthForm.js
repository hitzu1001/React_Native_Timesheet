import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from '../components/Spacer';
import RNPickerSelect from 'react-native-picker-select';
import { Feather } from '@expo/vector-icons';

const AuthForm = ({ headerText, errorMessage, buttonText, onSubmit, isSingup }) => {
  const [email, setEmail] = useState('test6@test.com');
  const [password, setPassword] = useState('password');
  const [firstName, setFirstName] = useState('Ava');
  const [lastName, setLastName] = useState('Chou');
  const [role, setRole] = useState('Manager');

  return (
    <>
      <Spacer>
        <Text h4 h4Style={styles.headerText}>{headerText}</Text>
      </Spacer >
      <Input
        label='Email'
        value={email}
        onChangeText={setEmail}
        autoCapitalize='none'
        autoCorrect={false}
      />
      <Spacer />
      <Input
        secureTextEntry
        label='Password'
        value={password}
        onChangeText={setPassword}
        autoCapitalize='none'
        autoCorrect={false}
      />
      {isSingup
        ?
        <>
          <Spacer />
          <Input
            label='First Name'
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize='none'
            autoCorrect={false}
          />
          <Spacer />
          <Input
            label='Last Name'
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize='none'
            autoCorrect={false}
          />
          <Spacer />
          <Text style={styles.title}>Role</Text>
          <RNPickerSelect
            items={[
              { label: 'Manager/Accounting', value: 'Manager' },
              { label: 'Foreman', value: 'Foreman' },
              { label: 'Employee', value: 'Employee' },
            ]}
            onValueChange={(value) => setRole(value)}
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: 22,
              },
            }}
            value={role}
            useNativeAndroidPickerStyle={false}
            textInputProps={{ underlineColor: 'yellow' }}
            Icon={() => {
              return <Feather name='arrow-down' size={22} color='#808080' />;
            }}
          />
        </>
        : null
      }

      {errorMessage
        ? <Text style={styles.errorMessage}>{errorMessage}</Text>
        : null
      }
      <Spacer>
        <Button
          title={buttonText}
          onPress={() => onSubmit({ email, password, firstName, lastName, role })}
          buttonStyle={styles.button}
        />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  headerText: {
    marginTop: 220,
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15
  },
  button: {
    backgroundColor: '#20b2aa'
  },
  title: {
    marginLeft:10,
    fontSize: 16,
    color:"grey",
    fontWeight:"bold",
    marginBottom:5
  }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginRight:10,
    marginLeft:10,
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
