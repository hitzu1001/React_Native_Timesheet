import React, { useContext, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Context as ImageContext } from '../context/ImageContext';
import { navigate } from '../navigationRef';
import { Ionicons } from '@expo/vector-icons';
import containerStyle from '../style/containerStyle';
import uuid from 'uuid/v4';

const PhotoPicker = ({ id, images }) => {
  const { state, addImage, setImages } = useContext(ImageContext);

  useEffect(() => {
    setImages(images)
  }, []);

  const requestCameraPermission = async () => {
    if (Constants.platform.ios) {
      const { status, granted } = await Permissions.askAsync(Permissions.CAMERA);
      if (granted === false) {
        alert('Sorry, missing camera permission!'
          + '\nChange permission at App > Settings > Camera');
      } else {
        _takePhoto()
      }
    }
  }

  const requestCameraRollPermission = async () => {
    if (Constants.platform.ios) {
      const { status, granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (granted === false) {
        alert('Sorry, missing photos permission!'
          + '\nChange permission at App > Settings > Photos');
      } else {
        _pickImage();
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

  const _takePhoto = async () => {
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
      >
        <Image key={i} source={{ uri: i.uri }} style={styles.image} />
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView>
      <View style={styles.attachContainer}>
        <Text style={styles.lable}>ATTACHMENTS</Text>
        <View style={containerStyle.rowWrap}>
          <TouchableOpacity
            style={styles.attachBtn}
            onPress={() => {
              Alert.alert(
                'Add attachments', '', [
                {
                  text: 'Take photos',
                  onPress: () => { requestCameraPermission(); }
                },
                {
                  text: 'Select photos',
                  onPress: () => { requestCameraRollPermission(); }
                },
                { text: 'Cancel', style: 'cancel' }
              ],
                { cancelable: false }
              )
            }
            }
          >
            <Ionicons style={styles.addIcon} name='ios-add' />
          </TouchableOpacity>
          {images ? renderImages() : <Text style={styles.none}>None</Text>}
        </View>
      </View>
    </ScrollView >
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
  attachBtn: {
    width: 65,
    height: 65,
    borderColor: '#20b2aa',
    borderWidth: 2,
    borderStyle: 'dotted',
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
    borderWidth: 0.5,
    borderColor: '#d3d3d3'
  },
  none: {
    color: 'dimgray'
  }
});

export default PhotoPicker;
