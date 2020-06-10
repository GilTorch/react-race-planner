/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

const Genre = ({ genre }) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 7,
        padding: 5,
        paddingHorizontal: 20
      }}>
      <View
        style={{
          flex: 0,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 15
        }}>
        <View
          style={{
            backgroundColor: genre.color,
            width: 47,
            height: 47,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          {genre.icon(25)}
        </View>
      </View>
      <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text
            type="bold"
            style={{ color: '#03A2A2', fontSize: 15, fontWeight: 'bold', marginBottom: 5 }}>
            {genre.name}
          </Text>
          <Text
            type="bold"
            style={{ color: '#5A7582', fontSize: 12, textAlign: 'left', paddingRight: 10 }}>
            {genre.description}
          </Text>
        </View>
        <Button
          mode="contained"
          style={{ height: 35, alignItems: 'center', justifyContent: 'center' }}
          icon={({ size }) => <FontAwesome5 size={size} color="#fff" name="pen-fancy" />}
          labelStyle={{ color: '#fff', fontWeight: 'bold' }}>
          Go
        </Button>
      </View>
    </View>
  );
};

export default Genre;

Genre.propTypes = {
  genre: PropTypes.object.isRequired
};
