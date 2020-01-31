import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { navigate } from '../navigationRef';
import { Feather } from '@expo/vector-icons';

export class AttachPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    }
    this.handleDelete = this.handleDelete.bind(this);
  };

  deleteImage(uri) {
    this.setState({
      images: this.state.images.filter(i => i !== uri)
    });
  };

  handleDelete(uri) {
    this.deleteImage(uri);
  };

  renderImages() {
    return (
      this.state.images.map(i =>
        <TouchableOpacity key={i} onPress={() => { }}>
          <Image key={i} source={{ uri: i }} style={styles.image} />
        </TouchableOpacity>
      )
    );
  }

  render() {
    let { images } = this.state;
    // console.log(this.deleteImage);
    return (
      <ScrollView>
        <View style={styles.attachContainer}>
          <Text style={styles.attachTitle}>ATTACHMENTS</Text>
          <View style={styles.photoContainer}>
            <TouchableOpacity style={styles.attachBtn} onPress={() =>
              Alert.alert('Add attachments', '',
                [
                  { text: 'Take photos', onPress: () => { } },
                  { text: 'Select photos', onPress: this._pickImage },
                  { text: 'Cancel', style: 'cancel' }
                ],
                { cancelable: false },
              )}>
              <Feather style={styles.addIcon} name='plus' />
            </TouchableOpacity>
            {images && this.renderImages()}
          </View>
          <Text style={styles.none}>None</Text>
        </View>
      </ScrollView>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      this.setState({
        images: [...this.state.images, result.uri]
      });
      navigate("PhotoDetail", {
        uri: result.uri,
        deletePhoto: uri => this.handleDelete(uri),
      });
    };
  };

}

const styles = StyleSheet.create({
  attachContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  photoContainer: {
    flexDirection: 'row',
  },
  attachBtn: {
    width: 60,
    height: 60,
    borderColor: '#20b2aa',
    borderWidth: 2,
    borderStyle: 'dotted',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    fontSize: 20,
    color: '#20b2aa',
  },
  image: {
    width: 60,
    height: 60,
    marginLeft: 5
  },
  none: {
    color: 'dimgray'
  },
});

export default AttachPhotos;