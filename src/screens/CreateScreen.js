import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Context as BlogContext} from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";
import { Entypo } from "@expo/vector-icons";
import moment from 'moment';

const CreateScreen = ({ navigation }) => {
  const { addBlogPost } = useContext(BlogContext);
  var startTime = moment.utc(new Date()).local().format();
  var endTime = moment.utc(new Date()).local().format();


  return (
    <BlogPostForm
      id={0}
      initialValues={{
        title: "",
        notes: "",
        startTime: startTime,
        endTime: endTime,
        images: [],
      }}
      onSubmit={(title, notes, startTime, endTime, images) => {
        addBlogPost(title, notes, startTime, endTime, images, () => {
          // ensure the page is navigated to Index after the post has been added
          navigation.navigate("Timesheet");
        });
      }}
      isChange={() => { }}
      isCreate={true}
    />
  );
};

CreateScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Add Timesheet",
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.navigate("Timesheet")}>
        <Entypo style={styles.crossIcon} name="cross" />
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  crossIcon: {
    fontSize: 26,
    color: "#20b2aa",
    marginHorizontal: 20,
  }
});

export default CreateScreen;
