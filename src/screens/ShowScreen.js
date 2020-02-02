import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
import { Context as ImageContext } from '../context/ImageContext';
import Card from '../components/Card';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import iconStyle from '../style/iconStyle';
import moment from 'moment';

const ShowScreen = ({ navigation }) => {
  const { state, deleteBlogPost } = useContext(BlogContext);
  const { setImages } = useContext(ImageContext);

  const blogPost = state.find(
    blogPost => blogPost._id === navigation.getParam('id')
  );

  useEffect(() => {
    setImages(blogPost.images);
    const callDeleteFromNav = () => {
      deleteBlogPost(navigation.getParam('id'), () => {
        navigation.navigate("Timesheet");
      });
    };
    navigation.setParams({ callDeleteFromNav: callDeleteFromNav });
  }, [])

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
              <TouchableOpacity key={i.uri} onPress={() => {
                navigation.navigate("PhotoShow", {
                  uri: i.uri,
                  initialComment: i.comment,
                });
              }} >
                <Image key={i} source={{ uri: i.uri }} style={styles.image} />
              </TouchableOpacity>) : <Text style={styles.none}>None</Text>}
        </View>
      </View>
    </ScrollView >
  );
};

ShowScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Show Date~~~',
    headerLeft: <TouchableOpacity style={iconStyle.iconTouchLeft}
      onPress={() => navigation.pop()}
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
            navigation.state.params.callDeleteFromNav()
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