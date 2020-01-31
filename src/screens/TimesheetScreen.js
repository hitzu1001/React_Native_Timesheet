import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { Context } from '../context/BlogContext';
import { FontAwesome } from '@expo/vector-icons'


const TimesheetScreen = ({ navigation }) => {
  const { state, getBlogPosts } = useContext(Context);

  useEffect(() => {
    getBlogPosts();
    const listener = navigation.addListener('didFocus', () => {
      getBlogPosts();
    });

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        data={state}
        keyExtractor={(blogPost) => blogPost.title}
        renderItem={({ item }) => {
          return (
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.titleContainer}
                onPress={() => navigation.navigate('Show', { id: item.id })}
              >
                <Text style={styles.title}>{item.title} - {item.id}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      ></FlatList>
    </SafeAreaView>
  );
};

TimesheetScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Timesheets',
    headerStyle: {
      // backgroundColor: '#20b2aa',
    },
    headerTintColor: 'black',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerRight: <TouchableOpacity onPress={() => navigation.navigate('Create')}>
      <FontAwesome style={styles.addIcon} name='plus' />
    </TouchableOpacity>,
    headerLeft: <Avatar rounded title="TS" containerStyle={styles.avatar}/>
  };
};

const styles = StyleSheet.create({
  addIcon: {
    fontSize: 20,
    color: '#20b2aa',
    marginRight: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  titleContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'red',
  },
  title: {
    fontSize: 18,
  },
  avatar: {
    marginLeft: 20
  }
});

export default TimesheetScreen;
