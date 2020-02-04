import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
import { Context as ImageContext } from '../context/ImageContext';
import Card from '../components/Card';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import iconStyle from '../style/iconStyle';
import moment from 'moment';
import uuid from 'uuid/v4';

const ShowScreen = ({ navigation }) => {
  const { state, deleteBlogPost, getBlogPosts } = useContext(BlogContext);
  const { setImages } = useContext(ImageContext);
  const blogPost = state.find(blogPost =>
    blogPost._id === navigation.getParam('id')
  )
  const timeHeader = blogPost.startTime;

  console.log('ShowScreen')

  // const [blogPost, setBlogPost] = useState({})

  useEffect(() => {
    
    const callDeleteFromNav = () => {
      deleteBlogPost(navigation.getParam('id'), () => {
        navigation.navigate('Timesheet');
      });
    };
    navigation.setParams({ callDeleteFromNav, timeHeader });

    const listener = navigation.addListener("didFocus", () => {
      getBlogPosts();
      setImages(blogPost.images);
    });

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <ScrollView>
      <Card title='START TIME' item={moment(blogPost.startTime).format('LLLL')} />
      <Card title='END TIME' item={moment(blogPost.endTime).format('LLLL')} />
      <Card title='TASK' item={blogPost.task} />
      <Card title='NOTES' item={blogPost.notes} />
      <View style={styles.subContainer}>
        <Text style={styles.containerTitle}>ATTACHMENTS</Text>
        <View style={styles.photoContainer}>
          {blogPost.images
            ? blogPost.images.map(i =>
              <TouchableOpacity key={uuid()} onPress={() => {
                navigation.navigate('PhotoShow', {
                  uri: i.uri,
                  initialComment: i.comment,
                });
              }} style={{ borderStyle: 'dotted', borderColor: '#d3d3d3', borderWidth: 1 }}>
                <Image key={i} source={{ uri: i.uri }} style={styles.image} />
              </TouchableOpacity>) :
            <Text style={styles.none}>None</Text>}
        </View>
      </View>
    </ScrollView >
  );
};

ShowScreen.navigationOptions = ({ navigation }) => {
  const { timeHeader } = navigation.state.params;
  let thisDay = moment(timeHeader);
  return {
    title:
      `${thisDay.format('ddd')}, ${thisDay.format('DD MMM')} ${thisDay.format('YYYY')}`,
    headerLeft: <TouchableOpacity style={iconStyle.iconTouchLeft}
      onPress={() => navigation.navigate('Timesheet')}
    >
      <Ionicons style={iconStyle.backIcon} name='ios-arrow-back' />
    </TouchableOpacity>,
    headerRight:
      <>
        <TouchableOpacity style={iconStyle.iconTouchRight}
          onPress={() =>
            navigation.navigate('Edit', { id: navigation.getParam('id') })
          }
        >
          <FontAwesome style={iconStyle.editIcon} name='pencil' />
        </TouchableOpacity>
        <TouchableOpacity style={iconStyle.iconTouchRight}
          onPress={() => {
            Alert.alert('Delete timesheet?', '',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete', onPress: () => {
                    navigation.state.params.callDeleteFromNav()
                  }
                }
              ],
              { cancelable: false },
            )
          }}
        >
          <Ionicons style={iconStyle.trashIcon} name='md-trash' />
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
  photoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    width: 65,
    height: 65,
    marginRight: 8,
    marginTop: 5,
  },
  none: {
    color: 'dimgray'
  },
});
export default ShowScreen;