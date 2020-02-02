import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Context as BlogContext} from '../context/BlogContext';
import Card from '../components/Card';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import moment from 'moment';

const ShowScreen = ({ navigation }) => {
  const { state, deleteBlogPost } = useContext(BlogContext);

  useEffect(() => {
    const callDeleteFromNav = () => {
      deleteBlogPost(navigation.getParam('id'), () => {
        navigation.navigate("Timesheet");
      });
    };
    navigation.setParams({ callDeleteFromNav: callDeleteFromNav });
  }, [])

  const blogPost = state.find(
    blogPost => blogPost.id === navigation.getParam('id')
  );

  var startTime = moment(blogPost.startTime).format('LLLL');
  var endTime = moment(blogPost.endTime).format('LLLL');


  return (
    <ScrollView>
      <Card title='START TIME' item={startTime} />
      <Card title='END TIME' item={endTime} />
      <Card title='TASK' item={blogPost.title} />
      <Card title='NOTES' item={blogPost.notes} />
      <View style={styles.subContainer}>
        <Text style={styles.containerTitle}>ATTACHMENTS</Text>
      </View>
    </ScrollView>
  );
};

ShowScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Show Date~~~',
    headerLeft: <TouchableOpacity onPress={() => navigation.pop()}>
      <Ionicons style={styles.backIcon} name='ios-arrow-back' />
    </TouchableOpacity>,
    headerRight:
      <>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Edit', { id: navigation.getParam('id') })
          }
        >
          <FontAwesome style={styles.icon} name='pencil' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigation.state.params.callDeleteFromNav()
        }}
        >
          <Ionicons style={styles.icon} name='ios-trash' />
        </TouchableOpacity>
      </>
  };
};


const styles = StyleSheet.create({
  subContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  containerTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  containerItem: {
    color: 'dimgray'
  },
  backIcon:{
    fontSize: 26,
    color: '#20b2aa',
    marginHorizontal: 20,
  },
  icon: {
    fontSize: 22,
    color: '#20b2aa',
    marginRight: 20,
  },
});
export default ShowScreen;