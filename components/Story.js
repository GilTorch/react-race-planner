import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Surface } from 'react-native-paper';
import PropTypes from 'prop-types';
import { Feather } from '@expo/vector-icons';
import StoryGenre from './StoryGenre';
import StoryAuthors from './StoryAuthors';
import Text from './CustomText';
import Advertisement from './Advertisement';

const Story = ({ story, index, navigation, genres }) => {
  let ShowAdvertisement;
  if (index !== 0 && index % 2 === 0) {
    ShowAdvertisement = <Advertisement />;
  }
  if (index !== 0 && index % 2 === 0 && index % 4 === 0) {
    ShowAdvertisement = <Advertisement />;
  }
  return (
    <>
      {ShowAdvertisement}
      <Surface
        style={{
          marginBottom: 25,
          marginHorizontal: 20,
          borderRadius: 4,
          padding: 15,
          elevation: 5
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(story.screenName);
              }}>
              <Text type="medium" style={{ color: '#03A2A2', fontSize: 20 }}>
                {story.title}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Feather size={18} color="#5A7582" name="more-vertical" />
          </TouchableOpacity>
        </View>
        <StoryAuthors authors={story.authors} storyStatus={story.status} />
        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
          <Text style={{ color: '#5A7582', fontSize: 12 }}>{story.startTime}</Text>
          <View
            style={{
              height: 15,
              borderLeftColor: '#5A7582',
              borderLeftWidth: 1,
              marginHorizontal: 8
            }}
          />
          <Text style={{ color: '#5A7582', fontSize: 12 }}>{story.status}</Text>
          <View
            style={{
              height: 15,
              borderLeftColor: '#5A7582',
              borderLeftWidth: 1,
              marginHorizontal: 8
            }}
          />
          <StoryGenre genres={genres} name={story.genre} />
        </View>
        <View style={{ marginTop: 4 }}>
          <Text type="bold" style={{ color: '#5A7582' }}>
            Initially Proposed Intro
          </Text>
          <Text style={{ color: '#5A7582', lineHeight: 20 }}>{story.initialIntro}</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text type="bold" style={{ color: '#5A7582' }}>
            Elected Intro
          </Text>
          {story.electedIntro && (
            <Text style={{ color: '#5A7582', lineHeight: 20 }}>{story.electedIntro}</Text>
          )}

          {!story.electedIntro && (
            <Text style={{ color: '#ED8A18', fontFamily: 'RobotoItalic', fontSize: 12 }}>
              Vote haven't started yet
            </Text>
          )}
        </View>
      </Surface>
    </>
  );
};

Story.propTypes = {
  story: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  genres: PropTypes.array.isRequired
};

export default Story;
