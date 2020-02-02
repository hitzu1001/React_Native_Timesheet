import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { Context as ImageContext } from "../context/ImageContext";
import { Ionicons } from "@expo/vector-icons";
import iconStyle from "../style/iconStyle";

const PhotoDetailForm = ({ uri, initialComment, isChange, readOnly }) => {
  const [comment, setComment] = useState(initialComment);
  const { editImage } = useContext(ImageContext);
  const changed = comment !== initialComment;

  useEffect(() => {
    isChange(changed);
    editImage(uri, comment);
  }, [comment]);

  return (
    <>
      <Image source={{ uri: uri }} style={styles.image} resizeMode="contain" />
      <View style={styles.authContainer}>
        <Text style={styles.task}>WHO CAN SEE THIS</Text>
        <View style={styles.authContent}>
          <Ionicons style={iconStyle.lockIcon} name="ios-lock" />
          <Text style={styles.auth}>Seen only by you and your admin</Text>
        </View>
      </View>
      <View style={styles.line}></View>
      <View style={styles.commentContainer}>
        <Text style={styles.task}>COMMENT</Text>
        <TextInput
          style={styles.comment}
          value={comment}
          placeholder="Enter comments"
          onChangeText={comment => setComment(comment)}
          autoCapitalize='none'
          autoCorrect={false}
          multiline={true}
          autoFocus={true}
          editable={!readOnly}
        />
      </View>
    </>
  );
};

PhotoDetailForm.defaultProps = {
  initialComment: ""
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
  task: {
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

export default PhotoDetailForm;
