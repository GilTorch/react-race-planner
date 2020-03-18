import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
// import PropTypes from 'prop-types';
import Text from '../components/CustomText';

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ backgroundColor: 'white' }}>
        <Text>Hello</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({

// });

export default HomeScreen;
