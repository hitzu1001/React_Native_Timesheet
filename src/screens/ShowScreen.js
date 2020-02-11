import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, FlatList } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
import { Context as UserContext } from '../context/AuthContext';
import { FontAwesome, Ionicons, Entypo } from '@expo/vector-icons';
import iconStyle from '../style/iconStyle';
import moment from 'moment';
import modalStyle from '../style/modalStyle';
import uuid from 'uuid/v4';

const ShowScreen = ({ navigation }) => {
  const { state, deleteBlogPost, getBlogPosts, editBlogPost } = useContext(BlogContext);
  const { state: user } = useContext(UserContext);
  const [userRole, setUserRole] = useState('Employee')
  const blogPost = state.find(blogPost =>
    blogPost._id === navigation.getParam('id')
  )
  const timeDiff = parseInt(
    moment(blogPost.endTime).diff(moment(blogPost.startTime), "minutes")
  );
  const hours = (timeDiff - (timeDiff % 60)) / 60;
  const minutes = timeDiff % 60;

  useEffect(() => {
    Array.isArray(user) && setUserRole(user[0].role)
    const callDeleteBlogPost = () => {
      deleteBlogPost(navigation.getParam('id'), () => {
        navigation.navigate('Timesheet');
      });
    };
    navigation.setParams({ callDeleteBlogPost, status: blogPost.status });


    const listener = navigation.addListener("didFocus", () => {
      getBlogPosts();
    });

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <ScrollView>
      <View style={styles.timeContainer}>
        <View style={styles.timeSpan}>
          <Text style={styles.time}>
            {moment(blogPost.startTime).format('LT')}
          </Text>
          <Ionicons style={iconStyle.forwardIcon} name='ios-arrow-forward' />
          <Text style={styles.time}>
            {moment(blogPost.endTime).format('LT')}
          </Text>
        </View>
        <Text style={styles.timeDiff}> {hours} hrs {minutes} mins</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>TASK</Text>
        <Text style={styles.content}>
          {blogPost.task}
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>NOTES</Text>
        <Text style={styles.content} numberOfLines={3} ellipsizeMode='tail'>
          {blogPost.notes}
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>ATTACHMENTS</Text>
        <View style={styles.photoContainer}>
          {blogPost.images.length > 0
            ? blogPost.images.map(i =>
              <TouchableOpacity
                key={uuid()}
                onPress={() => {
                  navigation.navigate('PhotoShow', {
                    uri: i.uri,
                    initialComment: i.comment,
                  });
                }}
              >
                <Image source={{ uri: i.uri }} style={styles.image} />
              </TouchableOpacity>)
            : <Text style={styles.none}>None</Text>}
        </View>
      </View>
      {userRole === "Manager" && (blogPost.status === "PENDING") &&
        <>
          <View style={styles.auditContainer}>
            <TouchableOpacity
              style={styles.auditBtn}
              onPress={() => {
                editBlogPost(blogPost._id, blogPost.startTime, blogPost.endTime,
                  blogPost.task, blogPost.notes, blogPost.images, "APPROVED", () => {
                    navigation.pop();
                  })
              }}>
              <View style={styles.timeSpan}>
                <Entypo style={{...iconStyle.auditIcon, color: '#008000'}} name='check' />
                <Text style={{ ...styles.buttonText, color: '#008000' }}>Approve</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.auditBtn}
              onPress={() => {
                editBlogPost(blogPost._id, blogPost.startTime, blogPost.endTime,
                  blogPost.task, blogPost.notes, blogPost.images, "DECLINED", () => {
                    navigation.pop();
                  })
              }}>
              <View style={styles.timeSpan}>
                <Entypo style={{...iconStyle.auditIcon, color: '#ff0000'}} name='cross' />
                <Text style={{ ...styles.buttonText, color: '#ff0000' }}>Decline</Text>
              </View>
            </TouchableOpacity>
          </View>
        </>
      }
    </ScrollView >
  );
};

ShowScreen.navigationOptions = ({ navigation }) => {
  const { startTime } = navigation.state.params;
  let thisDay = moment(startTime);
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
        {navigation.state.params.status === "PENDING" && <TouchableOpacity style={iconStyle.iconTouchRight}
          onPress={() =>
            navigation.navigate('Edit', { id: navigation.getParam('id') })
          }
        >
          <FontAwesome style={iconStyle.editIcon} name='pencil' />
        </TouchableOpacity>}
        <TouchableOpacity style={iconStyle.iconTouchRight}
          onPress={() => {
            Alert.alert('Delete timesheet?', '',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete', onPress: () => {
                    navigation.state.params.callDeleteBlogPost()
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
  timeContainer: {
    ...modalStyle.shadowContainer3,
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  timeSpan: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontSize: 22,
    fontWeight: '500',
    color: '#333'
  },
  timeDiff: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#999'
  },
  container: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 3,
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
    borderWidth: 0.5,
    borderColor: '#d3d3d3'
  },
  none: {
    color: 'dimgray'
  },
  auditContainer: {
    marginHorizontal: 50,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  auditBtn: {
    ...modalStyle.shadowContainer1,
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: '#fdfdfd',
    borderColor: '#ddd',
    borderWidth: 0.5,
  },
  buttonText: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    fontSize: 16,
  },
});
export default ShowScreen;