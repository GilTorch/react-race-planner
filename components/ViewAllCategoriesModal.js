import React from 'react';
import { View, FlatList } from 'react-native';
import { genres } from '../utils/data';
import CategoryGenre from './CategoryGenre';

const ViewAllCategoriesModal = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList data={genres} renderItem={({ item }) => <CategoryGenre genre={item} />} />
    </View>
  );
};

export default ViewAllCategoriesModal;
