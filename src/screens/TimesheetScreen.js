import React, {useState} from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TimeSheetForm from "../components/TimeSheetForm";


const TimesheetScreen = () => {
  const [startTime, setStart] = useState("123");
  const [endTime, setEnd] = useState("123");

  return (
    <SafeAreaView>
      <Text style={styles.header}>TimesheetScreen</Text>
      <TimeSheetForm setStart={setStart} setEnd={setEnd} />
      <Text>{startTime}</Text>
      <Text>{endTime}</Text>
    </SafeAreaView>
  );
};

TimesheetScreen.navigationOptions = {
  title: "Timesheet",
  tabBarIcon: (
    <MaterialCommunityIcons name="playlist-edit" size={26} color="gray" />
  )
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: "lightgray"
  }
});

export default TimesheetScreen;
