import React, { useContext, Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { navigate } from '../navigationRef';
import { Ionicons } from '@expo/vector-icons';


export class AttachPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: this.props.images,
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.handleComment = this.handleComment.bind(this);
  };

  updateComment(uri, newComment) {
    const updateImages = this.state.images.map(img => {
      return (img.uri === uri) ? { ...img, comment: newComment } : img
    });
    this.setState({ images: updateImages });
  }

  handleComment(uri, newComment) {
    this.updateComment(uri, newComment);
  }

  deleteImage(uri) {
    this.setState({
      images: this.state.images.filter(i => i.uri !== uri)
    });
  };

  handleDelete(uri) {
    this.deleteImage(uri);
  };

  renderImages() {
    return (
      this.state.images.map(i =>
        <TouchableOpacity key={i.uri} onPress={() => {
          navigate("PhotoEdit", {
            id: this.props.id,
            uri: i.uri,
            deletePhoto: uri => this.handleDelete(uri),
            images: this.state.images,
            initialComment: i.comment,
            updateComment: (uri, newComment) => this.handleComment(uri, newComment),
            isNew: false,
          });
        }} >
          <Image key={i} source={{ uri: i.uri }} style={styles.image} />
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
          <Text style={styles.lable}>ATTACHMENTS</Text>
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
              <Ionicons style={styles.addIcon} name='ios-add' />
            </TouchableOpacity>
            {images ? this.renderImages() : <Text style={styles.none}>None</Text>}
          </View>
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
        images: [...this.state.images, { uri: result.uri, comment: '' }]
      });

      this.props.setImages(this.state.images);

      navigate("PhotoEdit", {
        id: this.props.id,
        uri: result.uri,
        deletePhoto: uri => this.handleDelete(uri),
        images: this.state.images,
        updateComment: (uri, newComment) => this.handleComment(uri, newComment),
        isNew: true,
      });
    };
  };

}

const styles = StyleSheet.create({
  attachContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  lable: {
    fontSize: 12,
    fontWeight: "bold",
  },
  photoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    marginTop: 5,
  },
  addIcon: {
    fontSize: 24,
    color: '#20b2aa',
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

export default AttachPhotos;