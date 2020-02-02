import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Card = ({ task, item, onPress }) => {
  return <View style={styles.card}>
    <Text style={styles.cardTitle}>{task}</Text>
    {/* <TouchableOpacity onPress={onPress}> */}
      <Text style={styles.cardItem} numberOfLines={3} ellipsizeMode='tail'>{item}</Text>
    {/* </TouchableOpacity> */}
  </View>
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardItem: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 3,
  },
});

export default Card;