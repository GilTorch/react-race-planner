import React from 'react';
import { ScrollView, View, StyleSheet, Image, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, FontAwesome, SimpleLineIcons, Feather } from '@expo/vector-icons';
import { Surface } from 'react-native-paper';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';

import { SmallAdvertisement, HugeAdvertisement } from '../components/advertisements';
import Text from '../components/CustomText';
import { stories, genres } from '../utils/data';

const LibraryScreen = ({ navigation }) => {
  navigation.setOptions({
    headerShown: false
  });

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content');
    }, [])
  );

  const completedStories = stories.filter(story => story.status === 'Completed');
  const renderAuthor = author => {
    const margin = author.storyLead ? 0 : -8;

    return (
      <View key={Math.random()} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          style={{ ...styles.storyAuthorsImage, marginLeft: margin }}
          source={{ uri: author.profilePicture }}
        />
        {author.storyLead && <View style={styles.storyAuthorsSeparator} />}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Surface
        style={{
          elevation: 5
        }}>
        <LinearGradient
          colors={['#03a2a2', '#23c2c2']}
          locations={[0.2, 1]}
          style={{
            alignItems: 'center',
            flexDirection: 'column',
            paddingBottom: Constants.statusBarHeight,
            paddingTop: Constants.statusBarHeight * 2
          }}>
          <Text type="bold" style={{ color: 'white', fontSize: 18 }}>
            Library
          </Text>
        </LinearGradient>
      </Surface>

      <ScrollView>
        <View
          style={{
            marginTop: 20,
            marginBottom: 10,
            flexDirection: 'row',
            paddingLeft: 23,
            alignItems: 'center'
          }}>
          <SimpleLineIcons color="#ED8A18" name="layers" size={25} />
          <TouchableOpacity style={{ marginLeft: 15 }}>
            <Text style={{ ...styles.headline, fontSize: 16 }} type="medium">
              Start a New Story
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 23 }}>
          {genres.map(genre => (
            <View
              key={Math.random()}
              style={{ justifyContent: 'center', alignItems: 'center', marginRight: 20 }}>
              <View style={{ ...styles.genreIconContainer, backgroundColor: genre.color }}>
                {genre.icon(32)}
              </View>
              <Text
                type="medium"
                style={{
                  color: '#5A7582',
                  fontSize: 14
                }}>
                {genre.name}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={{ paddingLeft: 23 }}>
          <TouchableOpacity>
            <Text type="medium" style={{ fontSize: 12, marginTop: 10, color: '#03A2A2' }}>
              View all categories
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginHorizontal: 20,
            marginTop: 20,
            marginBottom: 25,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <Text type="medium" style={{ ...styles.headline, fontSize: 18 }}>
            All Stories
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'stretch'
            }}>
            <Surface style={{ borderRadius: 5, elevation: 5, padding: 4, marginRight: 10 }}>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() => {
                  navigation.push('FilterScreen');
                }}>
                <AntDesign color="#5A7582" size={18} name="filter" />
                <Text type="bold" style={{ fontSize: 12, color: '#5A7582' }}>
                  FILTER
                </Text>
              </TouchableOpacity>
            </Surface>
            <Surface style={{ borderRadius: 5, elevation: 5, padding: 5 }}>
              <TouchableOpacity>
                <FontAwesome size={14} color="#5A7582" name="search" />
              </TouchableOpacity>
            </Surface>
          </View>
        </View>

        {completedStories.map((story, index) => {
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
          if (completedStories.length === 1) {
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

                <View style={styles.storyAuthorsContainer}>
                  {renderAuthor(leadAuthor)}
                  {nonLeadAuthorsWithLimit.map(author => renderAuthor(author))}
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
        })}
      </ScrollView>
    </View>
  );
};

LibraryScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE'
  },
  headline: { color: '#5A7582' },
  genreIconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100
  },
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

export default LibraryScreen;
