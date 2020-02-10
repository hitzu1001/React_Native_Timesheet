import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';


const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <AuthForm
        errorMessage={state.errorMessage}
        buttonText='Sign Up'
        // onSubmit={({ email, password }) => signup({ email, password })}
        onSubmit={signup}
        isSingup={true}
      />
      <NavLink
        routeName='Signin'
        text='Already have an account? Sign in instead.'
      />
      {state.errorMessage
        ? <Text style={styles.errorMessage}>{state.errorMessage}</Text>
        // ? alert(state.errorMessage)
        : null
      }
    </View>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    header: null
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorMessage: {
    marginHorizontal: 30,
    marginTop: 5,
    color: 'red',
  },
});
export default SignupScreen;