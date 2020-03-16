import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Tag = ({ children }) => {
  return (
    <View style={tagStyle.container}>
      <Text style={tagStyle.text}>{children}</Text>
    </View>
  );
};

const tagStyle = StyleSheet.create({
  container: {
    width: 100,
    backgroundColor: '#03A2A2',
    height: 33,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white'
  }
});

const FilterScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.filterCategory}>STATUS</Text>
      <Tag>In Progress</Tag>
      <Text style={styles.filterCategory}>GENRE</Text>
      <Text style={styles.filterCategory}>AUTHOR</Text>
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee'
  },
  filterCategory: {
    color: '#898989'
  }
});
