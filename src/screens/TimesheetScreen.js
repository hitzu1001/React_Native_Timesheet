import React, { useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Avatar } from "react-native-elements";
import { Context } from "../context/BlogContext";
import { Entypo } from "@expo/vector-icons";
import moment from "moment";

const TimesheetScreen = ({ navigation }) => {
  const { state, getBlogPosts } = useContext(Context);

  useEffect(() => {
    getBlogPosts();
    const listener = navigation.addListener("didFocus", () => {
      getBlogPosts();
    });

    return () => {
      listener.remove();
    };
  }, []);


  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={blogPost => blogPost.title}
        renderItem={({ item }) => {
          var timeDiff = parseInt(
            moment(item.endTime).diff(moment(item.startTime), "minutes")
          );
        
          var hours = (timeDiff - (timeDiff % 60)) / 60;
          var minutes = timeDiff % 60;
          return (
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.titleContainer}
                onPress={() => navigation.navigate("Show", { id: item._id })}
              >
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.time}>
                  {moment(item.startTime).format("lll")} ~{" "}
                  {moment(item.endTime).format("lll")}
                </Text>
                <Text style={styles.timeDiff}>
                  {hours} hours {minutes} minutes
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      ></FlatList>
    </View>
  );
};

TimesheetScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Timesheets",
    headerLeft: <Avatar rounded title="TS" containerStyle={styles.avatar} />,
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate("Create")}>
        <Entypo style={styles.addIcon} name="plus" />
      </TouchableOpacity>
    )
  };
};

const styles = StyleSheet.create({
  addIcon: {
    fontSize: 22,
    color: "#20b2aa",
    marginRight: 20
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "lightgray"
  },
  titleContainer: {
    flex: 1,
    borderWidth: 3,
    borderColor: "pink"
  },
  title: {
    fontSize: 18,
    padding: 5,
    fontWeight: "bold"
  },
  time: {
    fontSize: 12,
    padding: 3,
    alignSelf:"flex-end",
    fontWeight: "bold"
  },
  timeDiff: {
    fontSize: 12,
    padding: 3,
    alignSelf:"flex-end",
    fontWeight: "bold",
    color:"grey"
  },
  avatar: {
    marginLeft: 20
  }
});

export default TimesheetScreen;
