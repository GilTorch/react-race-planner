import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Surface } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

import { genres } from '../../utils/data';
import Text from '../CustomText';
import { HugeAdvertisement, SmallAdvertisement } from '../advertisements';
import BoxMenu from './BoxMenu';

const Story = ({ story, index, length, navigation }) => {
  let ShowAdvertisement;
  let ShowEndAdvertisement;
  if (index !== 0) {
    if (index % 2 === 0) {
      ShowAdvertisement = <HugeAdvertisement />;
    }
    if (index % 2 === 0 && index % 4 === 0) {
      ShowAdvertisement = <SmallAdvertisement />;
    }
  }
  if (length === 1) {
    ShowEndAdvertisement = <SmallAdvertisement />;
  }
  const currentGenre = genres.filter(genre => genre.name === story.genre)[0];
  const nonLeadAuthorsWithLimit = story.authors.filter(
    author => !author.storyLead && !author.anonymous
  );
  const anonymousAuthorsCount = story.authors.filter(author => author.anonymous).length;
  const leadAuthor = story.authors.filter(author => author.storyLead)[0];
  const remainingAuthorsCount = story.authors.length - (nonLeadAuthorsWithLimit + 1);

  return (
    <View key={Math.random()}>
      {ShowAdvertisement}
      <Surface
        style={{
          marginBottom: 25,
          marginHorizontal: 20,
          borderRadius: 4,
          padding: 15,
          elevation: 5
        }}>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
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
          <BoxMenu parentType="story" />
        </View>

        {story.status === 'Completed' && (
          <View style={styles.storyAuthorsContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image style={styles.storyAuthorsImage} source={{ uri: leadAuthor.profilePicture }} />
              {leadAuthor.storyLead && <View style={styles.storyAuthorsSeparator} />}
            </View>
            {nonLeadAuthorsWithLimit.map(author => (
              <View key={Math.random()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  style={{ ...styles.storyAuthorsImage, marginLeft: -8 }}
                  source={{ uri: author.profilePicture }}
                />
              </View>
            ))}

            {anonymousAuthorsCount === 0 && (
              <View style={{ marginLeft: 5 }}>
                {remainingAuthorsCount > 0 && (
                  <Text type="bold" style={{ fontSize: 12, color: '#5A7582' }}>
                    +{remainingAuthorsCount} more people
                  </Text>
                )}
              </View>
            )}
            {anonymousAuthorsCount > 0 && (
              <View style={{ marginLeft: 5 }}>
                <Text type="bold" style={{ fontSize: 12, color: '#5A7582' }}>
                  +{anonymousAuthorsCount} anonymous people
                </Text>
              </View>
            )}
          </View>
        )}

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

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                ...styles.storyGenreIconContainer,
                backgroundColor: currentGenre.color
              }}>
              {currentGenre.icon(12)}
            </View>
            <Text style={{ color: '#5A7582', fontSize: 12 }}>{currentGenre.name}</Text>
          </View>
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
      {ShowEndAdvertisement}
    </View>
  );
};

Story.propTypes = {
  story: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  storyAuthorsContainer: {
    marginTop: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  storyAuthorsImage: {
    width: 21,
    height: 21,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'white'
  },
  storyAuthorsSeparator: {
    height: 15,
    marginLeft: 5,
    marginRight: 15,
    borderLeftColor: '#5A7582',
    borderLeftWidth: 1
  },
  storyGenreIconContainer: {
    width: 22,
    height: 22,
    borderRadius: 40,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Story;
