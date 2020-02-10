import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';


const SigninScreen = ({ navigation }) => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <AuthForm
        errorMessage={state.errorMessage}
        buttonText='Sign In'
        onSubmit={signin}
        isSingup={false}
      />
      <NavLink
        routeName='Signup'
        text="Don't have an account? Sign up instead."
      />
      {state.errorMessage
        ? <Text style={styles.errorMessage}>{state.errorMessage}</Text>
        // ? alert(state.errorMessage)
        : null
      }
    </View>
  );
};

SigninScreen.navigationOptions = () => {
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
export default SigninScreen;