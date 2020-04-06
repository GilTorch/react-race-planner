/* eslint-disable react/no-multi-comp */
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import Text from './CustomText';

const StoryAuthors = ({ authors, storyStatus }) => {
  const nonLeadAuthorsWithLimit = authors.filter(author => !author.storyLead).slice(0, 4);
  const leadAuthor = authors.filter(author => author.storyLead)[0];
  const remainingAuthorsCount = authors.length - (nonLeadAuthorsWithLimit.length + 1);

  const renderAuthor = (author, key) => {
    const margin = author.storyLead ? 0 : -8;
    if (storyStatus !== 'Completed' || author.anonymous) {
      return (
        <View key={key.toString()} style={storyAuthorsStyle.imageContainer}>
          <View
            style={{
              ...storyAuthorsStyle.image,
              marginLeft: margin,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#B3CFFF'
            }}>
            <Entypo color="white" size={14} name="user" />
          </View>
          {author.storyLead && <View style={storyAuthorsStyle.separator} />}
        </View>
      );
    }

    return (
      <View key={key.toString()} style={storyAuthorsStyle.imageContainer}>
        <Image
          style={{ ...storyAuthorsStyle.image, marginLeft: margin }}
          source={{ uri: author.profilePicture }}
        />
        {author.storyLead && <View style={storyAuthorsStyle.separator} />}
      </View>
    );
  };

  return (
    <View style={storyAuthorsStyle.container}>
      {renderAuthor(leadAuthor, 100)}
      {nonLeadAuthorsWithLimit.map((author, i) => renderAuthor(author, i))}
      {remainingAuthorsCount === 0 && (
        <View style={{ marginLeft: 5 }}>
          <Text type="bold" style={{ fontSize: 12, color: '#5A7582' }}>
            {4 - nonLeadAuthorsWithLimit.length} more people to go
          </Text>
        </View>
      )}
      {remainingAuthorsCount > 0 && (
        <View style={{ marginLeft: 5 }}>
          <Text type="bold" style={{ fontSize: 12, color: '#5A7582' }}>
            +{remainingAuthorsCount} other people
          </Text>
        </View>
      )}
    </View>
  );
};

export default StoryAuthors;

const storyAuthorsStyle = StyleSheet.create({
  container: { marginTop: 5, flexDirection: 'row', alignItems: 'center' },
  imageContainer: { flexDirection: 'row', alignItems: 'center' },
  image: {
    width: 21,
    height: 21,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'white'
  },
  separator: {
    height: 15,
    marginLeft: 5,
    marginRight: 15,
    borderLeftColor: '#5A7582',
    borderLeftWidth: 1
  },
  storyLeadImageContainer: {}
});

StoryAuthors.propTypes = {
  authors: PropTypes.array.isRequired,
  storyStatus: PropTypes.string.isRequired
};
