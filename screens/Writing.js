import React from 'react';
import { ScrollView, View, StyleSheet, Image, StatusBar, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, FontAwesome, Entypo, Feather } from '@expo/vector-icons';
import { Surface } from 'react-native-paper';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';

import Text from '../components/CustomText';
import { stories, genres } from '../utils/data';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const StoryGenre = ({ name }) => {
  const currentGenre = genres.filter(genre => genre.name === name)[0];
  return (
    <View style={storyGenreStyle.container}>
      <View style={{ ...storyGenreStyle.iconContainer, backgroundColor: currentGenre.color }}>
        {currentGenre.icon(12)}
      </View>
      <Text style={{ color: '#5A7582', fontSize: 12 }}>{currentGenre.name}</Text>
    </View>
  );
};

const storyGenreStyle = {
  container: { flexDirection: 'row', alignItems: 'center' },
  iconContainer: {
    width: 22,
    height: 22,
    borderRadius: 40,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

StoryGenre.propTypes = {
  name: PropTypes.string.isRequired
};

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

const SmallAdvertisement = () => (
  <Surface style={styles.smallAdvertisement}>
    <Text type="bold" style={styles.smallAdvertisementTitle}>
      344 X 71
    </Text>
    <Text type="bold" style={styles.smallAdvertisementTitle}>
      Advertisement Here
    </Text>
  </Surface>
);

const Story = ({ story }) => {
  return (
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
          <Text type="medium" style={{ color: '#03A2A2', fontSize: 20 }}>
            {story.title}
          </Text>
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
        <StoryGenre name={story.genre} />
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
          <Text style={{ color: '#ED8A18', fontFamily: 'Roboto-Italic', fontSize: 12 }}>
            Vote haven't started yet
          </Text>
        )}
      </View>
    </Surface>
  );
};

Story.propTypes = {
  story: PropTypes.object.isRequired
};

const BadgesFilter = ({ labels, style }) => {
  const badges = labels.map(label => (
    <View
      key={Math.random()}
      style={{
        backgroundColor: '#03A2A2',
        borderRadius: 50,
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginRight: 5
      }}>
      <Text
        type="bold"
        style={{
          fontSize: 10,
          color: '#FFF',
          marginRight: 5,
          paddingVertical: 3
        }}>
        {label}
      </Text>
      <TouchableOpacity>
        <Text type="bold" style={{ fontSize: 10, color: '#FFF', paddingVertical: 3 }}>
          x
        </Text>
      </TouchableOpacity>
    </View>
  ));
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 5,
        ...style,
        flexWrap: 'wrap'
      }}>
      {badges}
    </View>
  );
};
BadgesFilter.propTypes = {
  labels: PropTypes.array.isRequired,
  style: PropTypes.object
};

BadgesFilter.defaultProps = {
  style: {}
};

const Writing = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
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
            My Stories
          </Text>
        </LinearGradient>
      </Surface>
      <ScrollView>
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 20,
            marginBottom: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <Text type="medium" style={{ ...styles.headline, fontSize: 20 }}>
            Filtered Stories
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignSelf: 'stretch'
            }}>
            <Surface style={{ borderRadius: 5, elevation: 5, padding: 4, marginRight: 10 }}>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
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

        <BadgesFilter labels={['In Progress']} />
        <BadgesFilter labels={['Mystery', 'Action', 'Romance']} />
        <BadgesFilter labels={['Authors: 3 - 100']} style={{ marginBottom: 20 }} />

        <Story story={stories[3]} />

        <SmallAdvertisement />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE'
  },
  headline: { color: '#5A7582' },
  smallAdvertisement: {
    height: SCREEN_HEIGHT * 0.1,
    backgroundColor: '#fff',
    elevation: 5,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  smallAdvertisementTitle: {
    color: '#5A7582',
    fontSize: 20
  }
});

export default Writing;
