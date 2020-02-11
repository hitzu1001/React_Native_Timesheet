import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import RNPickerSelect from 'react-native-picker-select';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import iconStyle from '../style/iconStyle';

const AuthForm = ({ buttonText, onSubmit, isSingup }) => {
  const [email, setEmail] = useState('snoopy.peanuts@test.com');
  const [password, setPassword] = useState('password');
  const [firstName, setFirstName] = useState('Charlie');
  const [lastName, setLastName] = useState('Brown');
  const [role, setRole] = useState('Employee');
  const [fontLoaded, setfontLoaded] = useState(false);
  const colorCode = ['#617be3', '#61d4b3', '#fdd365', '#fb8d62', '#f54291']

  const app = 'Timesheet'
  const list = [];
  for (i = 0; i < app.length; i++) {
    list.push(app[i]);
  }

  useEffect(() => {
    Font.loadAsync({
      'courgette-regular': require('../../assets/fonts/Courgette-Regular.ttf'),
    }).then(() => {
      setfontLoaded(true);
    })
  }, [])

  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons style={iconStyle.signIcon} name='calendar-clock' />
        {fontLoaded && list.map((char, i) => {
          var fontColor = colorCode[(i + 1) % 5];
          return <Text key={i} style={{ ...styles.header, color: `${fontColor}` }}>{char}</Text>
        })}
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
          onChangeText={text=>{
            setPassword(text)

          }}
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
            <Text style={{ ...styles.label, marginBottom: 5 }}>Role</Text>
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
                return <FontAwesome style={iconStyle.arrowDownIcon} name='hand-o-left' />;
              }}
            />
            <View style={styles.line}></View>
          </View>
        </>
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
    marginTop: 70,
  },
  headerContainer: {
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontFamily: 'courgette-regular',
    fontSize: 36,
  },
  container: {
    marginBottom: 25,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#444',
    // marginBottom: 5,
  },
  input: {
    paddingVertical: 5,
    fontSize: 15,
    color: '#000',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  line: {
    marginTop: 5,
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: 'lightgray',
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
    // paddingVertical: 12,
    // paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 4,
    color: '#000',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: '#000',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default AuthForm
