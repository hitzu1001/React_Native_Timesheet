import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import iconStyle from "../style/iconStyle";
import PhotoDetailForm from "../components/PhotoDetailForm";
import { Context as ImageContext } from "../context/ImageContext";

const PhotoEditScreen = ({ navigation }) => {
  const { state, deleteImage, editImage } = useContext(ImageContext);
  const [change, setChange] = useState(false);
  const comment = navigation.state.params.comment;

  const photo = state.find(i => i.uri === navigation.state.params.uri);

  useEffect(() => {
    navigation.setParams({ change, deleteImage, editImage, comment });
  }, [change]);

  return (
    <>
      {photo && (
        <PhotoDetailForm
          uri={photo.uri}
          initialComment={photo.comment}
          isChange={setChange}
          readOnly={false}
        />
      )}
    </>
  );
};

PhotoEditScreen.navigationOptions = ({ navigation }) => {
  const { id, uri, initialComment, isNew, change, deleteImage, editImage } = navigation.state.params;
  return {
    title: "Photo details",
    headerLeft: (
      <TouchableOpacity
        style={iconStyle.iconTouchLeft}
        onPress={() => {
          if (isNew && change) {
            Alert.alert(
              "Discard changes?",
              "",
              [
                { text: "Keep Editing", style: "cancel" },
                {
                  text: "Discard",
                  onPress: () => {
                    console.log('PhotoEdit ==============');
                    console.log(state);
                    deleteImage(uri);
                    navigation.navigate("Edit", { id });
                  }
                }
              ],
              { cancelable: false }
            );
          } else if (isNew) {
            deleteImage(uri);
            navigation.navigate("Edit", { id });
          } else if (change) {
            Alert.alert(
              "Discard changes?",
              "",
              [
                { text: "Keep Editing", style: "cancel" },
                {
                  text: "Discard",
                  onPress: () => {
                    editImage(uri, initialComment);
                    navigation.navigate("Edit", { id });
                  }
                }
              ],
              { cancelable: false }
            );
          } else {
            navigation.navigate("Edit", { id });
          }
        }}
      >
        <Entypo style={iconStyle.crossIcon} name="cross" />
      </TouchableOpacity>
    ),
    headerRight: (
      <>
        <TouchableOpacity
          style={iconStyle.iconTouchRight}
          onPress={() => {
            // editImage(uri, comment);
            navigation.navigate("Edit", { id });
          }}
        >
          <Ionicons style={iconStyle.saveIcon} name="ios-save" />
        </TouchableOpacity>
        {!isNew && (
          <TouchableOpacity
            style={iconStyle.iconTouchRight}
            onPress={() => {
              // deleteImage(uri);
              // navigation.navigate("Edit", { id });
              Alert.alert(
                "Delete photo?",
                "",
                [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Delete", onPress: () => {
                      deleteImage(uri);
                      navigation.navigate("Edit", { id });
                    }
                  }
                ],
                { cancelable: false }
              );
            }}
          >
            <Ionicons style={iconStyle.trashIcon} name="md-trash" />
          </TouchableOpacity>
        )}
      </>
    )
  };
};

const styles = StyleSheet.create({
  image: {
    height: 220,
    backgroundColor: "#000"
  },
  authContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5
  },
  authContent: {
    flexDirection: "row",
    alignItems: "center"
  },
  auth: {
    color: "dimgray"
  },
  commentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 100
  },
  comment: {
    fontSize: 15
  },
  line: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1
  }
});

export default PhotoEditScreen;
