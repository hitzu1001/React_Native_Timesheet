import React, { useContext, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Context as ImageContext } from '../context/ImageContext';
import { navigate } from '../navigationRef';
import { Ionicons } from '@expo/vector-icons';
import uuid from 'uuid/v4';

const AttachPhotos = ({ id, images }) => {
  const { state, addImage } = useContext(ImageContext);
  

  useEffect(() => {
    requestCameraRollPermission();
    requestCameraPermission();
  }, []);

  const requestCameraRollPermission = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  const requestCameraPermission = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
      }
    }
  };

  const _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1
    });

    if (!result.cancelled) {
      addImage(result.uri);
      navigate('PhotoEdit', {
        id: id,
        uri: result.uri,
        initialComment: '',
        isNew: true
      });
    }
  };

  const _takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1
    });

    if (!result.cancelled) {
      addImage(result.uri);
      navigate('PhotoEdit', {
        id: id,
        uri: result.uri,
        initialComment: '',
        isNew: true
      });
    }
  };

  const renderImages = () => {
    return state.map(i => (
      <TouchableOpacity
        // key={i.uri}
        key={uuid()}
        onPress={() => {
          navigate('PhotoEdit', {
            id: id,
            uri: i.uri,
            initialComment: i.comment,
            isNew: false
          });
        }}
        style={{ borderStyle: 'dotted', borderColor: '#d3d3d3', borderWidth: 1 }}
      >
        <Image key={i} source={{ uri: i.uri }} style={styles.image} />
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView>
      <View style={styles.attachContainer}>
        <Text style={styles.lable}>ATTACHMENTS</Text>
        <View style={styles.photoContainer}>
          <TouchableOpacity
            style={styles.attachBtn}
            onPress={() =>
              Alert.alert(
                'Add attachments',
                '',
                [
                  { text: 'Take photos', onPress: _takeImage },
                  { text: 'Select photos', onPress: _pickImage },
                  { text: 'Cancel', style: 'cancel' }
                ],
                { cancelable: false }
              )
            }
          >
            <Ionicons style={styles.addIcon} name='ios-add' />
          </TouchableOpacity>
          {images ? renderImages() : <Text style={styles.none}>None</Text>}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  attachContainer: {
    marginTop: 20,
    marginHorizontal: 20
  },
  lable: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  photoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  attachBtn: {
    width: 65,
    height: 65,
    borderColor: '#20b2aa',
    borderWidth: 2,
    borderStyle: 'dotted',
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 5
  },
  addIcon: {
    fontSize: 24,
    color: '#20b2aa'
  },
  image: {
    width: 65,
    height: 65,
    marginRight: 8,
    marginTop: 5,
  },
  none: {
    color: 'dimgray'
  }
});

export default AttachPhotos;
