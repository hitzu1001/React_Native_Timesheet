import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import iconStyle from '../style/iconStyle';
import PhotoDetailForm from '../components/PhotoDetailForm';

const PhotoShowScreen = ({ navigation }) => {
  const {uri, initialComment, readOnly} = navigation.state.params;

  return (
    <PhotoDetailForm
      uri={uri}
      initialComment={initialComment}
      updateComment={() => { }}
      isChange={() => { }}
      readOnly={readOnly}
    />
  );
};

PhotoShowScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Photo details',
    headerLeft: <TouchableOpacity
      style={iconStyle.iconTouchLeft}
      onPress={() => { navigation.pop() }}
    >
      <Entypo style={iconStyle.crossIcon} name='cross' />
    </TouchableOpacity>,
  };
};

const styles = StyleSheet.create({

});

export default PhotoShowScreen;