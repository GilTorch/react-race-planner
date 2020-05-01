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
  const inprogress = story.status === 'In Progress' || story.status === 'Waiting for players';
  const status = inprogress ? 'In Progress' : 'Completed';
  const currentGenre = genres.find(genre => genre.name === story.genre);
  const nonLeadAuthors = story.authors.filter(author => !author.storyLead && !author.anonymous);
  const leadAuthor = story.authors.find(author => author.storyLead);
  const authorsCount = story.authors.length;
  const anonymousAuthorsCount = authorsCount - (nonLeadAuthors.length + 1);

  return (
    <View key={Math.random()}>
      {ShowAdvertisement}
      <Surface
        style={{
          marginBottom: 25,
          marginHorizontal: 20,
          borderRadius: 4,
          padding: 15,
          elevation: 2
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <View>
            <TouchableOpacity
             
              onPress={() => {
                navigation.navigate('StoryScreen', { storyId: story.id });
              }}>
              <Text type="medium" style={{ color: '#03A2A2', fontSize: 20 }}>
                {story.title}
              </Text>
            </TouchableOpacity>
          </View>
          {/* <View testID="three-dot-menu-button"> */}
          <BoxMenu parentType="story" block={story} />
          {/* </View> */}
        </View>

        {status === 'Completed' && (
          <View style={styles.storyAuthorsContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image style={styles.storyAuthorsImage} source={{ uri: leadAuthor.profilePicture }} />
              {leadAuthor.storyLead && <View style={styles.storyAuthorsSeparator} />}
            </View>
            {nonLeadAuthors.map(author => (
              <View key={Math.random()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  style={{ ...styles.storyAuthorsImage, marginLeft: -8 }}
                  source={{ uri: author.profilePicture }}
                />
              </View>
            ))}

            {anonymousAuthorsCount > 0 && (
              <View style={{ marginLeft: 5 }}>
                <Text type="bold" style={{ fontSize: 12, color: textColor }}>
                  +{anonymousAuthorsCount} anonymous people
                </Text>
              </View>
            )}
          </View>
        )}

        {status === 'In Progress' && authorsCount > 5 && (
          <Text type="bold" style={{ fontSize: 12, marginVertical: 3, color: textColor }}>
            {authorsCount} authors
          </Text>
        )}

        {authorsCount < 5 && (
          <Text type="bold" style={{ fontSize: 12, marginVertical: 3, color: textColor }}>
            {5 - authorsCount} more people to go
          </Text>
        )}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
          <Text style={{ color: textColor, fontSize: 12 }}>{story.startTime}</Text>
          <View
            style={{
              height: 15,
              borderLeftColor: textColor,
              borderLeftWidth: 1,
              marginHorizontal: 8
            }}
          />
          <Text style={{ color: textColor, fontSize: 12 }}>{status}</Text>
          <View
            style={{
              height: 15,
              borderLeftColor: textColor,
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
            <Text style={{ color: textColor, fontSize: 12 }}>{currentGenre.name}</Text>
          </View>
        </View>
        <View style={{ marginTop: 4 }}>
          <Text type="bold" style={{ color: textColor }}>
            Initially Proposed Intro
          </Text>
          <Text style={{ color: textColor, lineHeight: 20 }}>{story.initialIntro}</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text type="bold" style={{ color: textColor }}>
            Elected Intro
          </Text>
          {story.electedIntro && (
            <Text style={{ color: textColor, lineHeight: 20 }}>{story.electedIntro}</Text>
          )}

          {!story.electedIntro && (
            <Text
              style={{
                color: '#ED8A18',
                fontFamily: 'RobotoItalic',
                fontSize: 12
              }}>
              Votes haven't started yet
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
const textColor = '#5A7582';

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
    borderLeftColor: textColor,
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
