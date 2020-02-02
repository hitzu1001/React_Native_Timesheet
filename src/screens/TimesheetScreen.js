import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Context as BlogContext} from '../context/BlogContext';
import { Ionicons } from '@expo/vector-icons'


const TimesheetScreen = ({ navigation }) => {
  const { state, getBlogPosts } = useContext(BlogContext);

  useEffect(() => {
    getBlogPosts();
    const listener = navigation.addListener('didFocus', () => {
      getBlogPosts();
    });
    console.log(state)

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <View>
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
    </View>
  );
};

TimesheetScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Timesheets',
    headerLeft: <Avatar rounded title="TS" containerStyle={styles.avatar} />,
    headerRight: <TouchableOpacity onPress={() => navigation.navigate('Create')}>
      <Ionicons style={styles.addIcon} name='ios-add' />
    </TouchableOpacity>,
  };
};

const styles = StyleSheet.create({
  addIcon: {
    fontSize: 24,
    color: '#20b2aa',
    marginHorizontal: 20,
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
