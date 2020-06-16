/* eslint-disable no-underscore-dangle */
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Surface } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

import MysteryIcon from '../svg/icons/MysteryIcon';
import { getUserProfileUri } from '../../utils/functions';
import Text from '../CustomText';
import { HugeAdvertisement, SmallAdvertisement } from '../advertisements';
import BoxMenu from './BoxMenu';
import LoaderAnimation from '../../lottie/loading-pencil.json';
import { SCREEN_WIDTH } from '../../utils/dimensions';

const avatarGenerator = username => `https://api.adorable.io/avatars/${username}.png`;

const Story = ({ story, index, length, navigation, updating }) => {
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

  const { masterAuthor } = story;
  const inProgress = story.status === 'in_progress' || story.status === 'waiting_for_players';
  const status = inProgress ? 'In Progress' : 'Completed';
  const currentGenre = story.genre;
  const otherAuthors = story.parts.map(p => p.author);
  const authorsCount = otherAuthors.length + 1;
  const anonymousAuthorsCount = inProgress
    ? authorsCount
    : story.parts.filter(p => p.privacyStatus === 'anonymous');
  let GenreIconLibrary;
  const initialIntro = story.parts.find(sp => sp.isIntro && sp.author?._id === masterAuthor?._id);
  const electedIntro = story.parts.find(sp => sp.isintro && sp.isElected);

  switch (currentGenre.iconLibraryName) {
    case 'MaterialCommunityIcons':
      GenreIconLibrary = MaterialCommunityIcons;
      break;
    case 'MysteryIcon':
      GenreIconLibrary = MysteryIcon;
      break;
    case 'AntDesign':
      GenreIconLibrary = AntDesign;
      break;
    case 'Ionicons':
      GenreIconLibrary = Ionicons;
      break;
    default:
      GenreIconLibrary = MaterialCommunityIcons;
  }

  return (
    <View key={Math.random()}>
      {ShowAdvertisement}
      <Surface
        style={{
          marginBottom: 25,
          marginHorizontal: 20,
          borderRadius: 4,
          elevation: 2
        }}>
        {updating && (
          <>
            <View
              style={{
                backgroundColor: '#eee',
                width: '100%',
                height: '100%',
                position: 'absolute',
                opacity: '1',
                zIndex: 10000
              }}
            />
            <View
              style={{
                width: SCREEN_WIDTH * 0.8,
                height: 100,
                position: 'absolute',
                zIndex: 10000,
                justifyContent: 'center',
                alignSelf: 'center',
                top: 55
              }}>
              <LottieView
                colorFilters={[
                  {
                    keypath: 'button',
                    color: '#F00000'
                  },
                  {
                    keypath: 'Sending Loader',
                    color: '#F00000'
                  }
                ]}
                style={{ color: 'red' }}
                source={LoaderAnimation}
                autoPlay
                loop
              />
            </View>
          </>
        )}
        <View style={{ padding: 15 }}>
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
            <BoxMenu parentType="story" block={story} />
          </View>

          {status === 'Completed' && (
            <View style={styles.storyAuthorsContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  style={styles.storyAuthorsImage}
                  source={{
                    uri:
                      getUserProfileUri(masterAuthor.picture) ||
                      avatarGenerator(masterAuthor.username)
                  }}
                />
                {masterAuthor._id === story.masterAuthor._id && (
                  <View style={styles.storyAuthorsSeparator} />
                )}
              </View>
              {otherAuthors.map(author => (
                <View key={Math.random()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    style={{ ...styles.storyAuthorsImage, marginLeft: -8 }}
                    source={{ uri: author.picture }}
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
            {/* TODO: Use the `createdAt` of the first round */}
            <Text style={{ color: textColor, fontSize: 12 }}>{story.createdAt}</Text>
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
                {currentGenre.iconLibraryName === 'MysteryIcon' && <GenreIconLibrary width={12} />}

                {currentGenre.iconLibraryName !== 'MysteryIcon' && (
                  <GenreIconLibrary size={12} color="#fff" name={currentGenre.icon} />
                )}
              </View>
              <Text style={{ color: textColor, fontSize: 12 }}>{currentGenre.name}</Text>
            </View>
          </View>
          <View style={{ marginTop: 4 }}>
            <Text type="bold" style={{ color: textColor }}>
              Initially Proposed Intro
            </Text>
            <Text style={{ color: textColor, lineHeight: 20 }}>{initialIntro.content}</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text type="bold" style={{ color: textColor }}>
              Elected Intro
            </Text>
            {story.electedIntro && (
              <Text style={{ color: textColor, lineHeight: 20 }}>{electedIntro.content}</Text>
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
        </View>
      </Surface>
      {ShowEndAdvertisement}
    </View>
  );
};

Story.defaultProps = {
  updating: false
};

Story.propTypes = {
  story: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  navigation: PropTypes.object.isRequired,
  updating: PropTypes.bool
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
