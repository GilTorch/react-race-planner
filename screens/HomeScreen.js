import React from 'react';
import { ScrollView, SafeAreaView, View, StyleSheet, Image } from 'react-native';
import { AntDesign, FontAwesome, Entypo, SimpleLineIcons, Feather } from '@expo/vector-icons';
import { Surface } from 'react-native-paper';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Text from '../components/CustomText';
import { stories, genres } from '../utils/data';

const Genre = ({ genre }) => (
  <View style={genreStyle.container}>
    <View style={{ ...genreStyle.iconContainer, backgroundColor: genre.color }}>
      {genre.icon(32)}
    </View>
    <Text type="medium" style={genreStyle.iconLabel}>
      {genre.name}
    </Text>
  </View>
);

Genre.propTypes = {
  genre: PropTypes.object.isRequired
};

const genreStyle = {
  container: { justifyContent: 'center', alignItems: 'center', marginRight: 20 },
  iconContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100
  },
  iconLabel: {
    color: '#5A7582',
    fontSize: 14
  }
};

const StoryGenre = ({ name }) => {
  const currentGenre = genres.filter(genre => genre.name === name)[0];
  return (
    <View style={storyGenreStyle.container}>
      <View style={{ ...storyGenreStyle.iconContainer, backgroundColor: currentGenre.color }}>
        {currentGenre.icon(15)}
      </View>
      <Text style={{ color: '#5A7582' }}>{currentGenre.name}</Text>
    </View>
  );
};

const storyGenreStyle = {
  container: { flexDirection: 'row', alignItems: 'center' },
  iconContainer: {
    width: 30,
    height: 30,
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

  const renderSeparator = isStoryLead =>
    isStoryLead && <View style={storyAuthorsStyle.separator} />;

  const renderAuthor = (author, key) => {
    if (storyStatus !== 'Completed' || author.anonymous) {
      return (
        <View key={key.toString()} style={storyAuthorsStyle.imageContainer}>
          <View
            style={{
              ...storyAuthorsStyle.image,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#B3CFFF',
              position: 'relative'
            }}>
            <Entypo color="white" size={14} name="user" />
          </View>
          {renderSeparator(author.storyLead)}
        </View>
      );
    }

    return (
      <View key={key.toString()} style={storyAuthorsStyle.imageContainer}>
        <Image style={storyAuthorsStyle.image} source={{ uri: author.profilePicture }} />
        {renderSeparator(author.storyLead)}
      </View>
    );
  };

  return (
    <View style={storyAuthorsStyle.container}>
      {renderAuthor(leadAuthor, 100)}
      {nonLeadAuthorsWithLimit.map((author, i) => renderAuthor(author, i))}
      {remainingAuthorsCount > 0 && (
        <View style={{ marginLeft: 10 }}>
          <Text type="bold" style={{ fontSize: 11, color: '#5A7582' }}>
            +{remainingAuthorsCount} more people to go
          </Text>
        </View>
      )}
    </View>
  );
};

const storyAuthorsStyle = StyleSheet.create({
  container: { marginTop: 10, marginBottom: 10, flexDirection: 'row', alignItems: 'center' },
  imageContainer: { flexDirection: 'row', alignItems: 'center' },
  image: {
    width: 30,
    height: 30,
    marginLeft: -5,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'white',
    elevation: 2
  },
  separator: {
    height: 20,
    marginLeft: 5,
    marginRight: 10,
    borderLeftColor: '#5A7582',
    borderLeftWidth: 1
  },
  storyLeadImageContainer: {}
});

StoryAuthors.propTypes = {
  authors: PropTypes.array.isRequired,
  storyStatus: PropTypes.string.isRequired
};

const Story = ({ story }) => (
  <Surface style={{ margin: 20, borderRadius: 4, padding: 10, elevation: 5 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <View>
        <Text type="bold" style={{ color: '#03A2A2', fontSize: 18 }}>
          {story.title}
        </Text>
      </View>
      <TouchableOpacity>
        <Feather size={20} color="#5A7582" name="more-vertical" />
      </TouchableOpacity>
    </View>
    <StoryAuthors authors={story.authors} storyStatus={story.status} />
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ marginRight: 10 }}>
        <Text style={{ color: '#5A7582' }}>{story.startTime} |</Text>
      </View>
      <View style={{ marginRight: 10 }}>
        <Text style={{ color: '#5A7582' }}>{story.status} |</Text>
      </View>
      <View>
        <StoryGenre name={story.genre} />
      </View>
      <View />
    </View>
    <View style={{ marginTop: 10 }}>
      <Text type="bold" style={{ color: '#5A7582' }}>
        Initially Proposed Intro
      </Text>
      <Text style={{ color: '#5A7582', lineHeight: 20 }}>{story.initialIntro}</Text>
    </View>
    <View style={{ marginTop: 10 }}>
      <Text type="bold" style={{ color: '#5A7582' }}>
        Elected Intro
      </Text>
      {story.electedIntro ? (
        <Text style={{ color: '#5A7582', lineHeight: 20 }}>{story.electedIntro}</Text>
      ) : (
          <Text type="light-italic" style={{ color: '#ED8A18' }}>
            Vote haven't started yet
          </Text>
        )}
    </View>
  </Surface>
);

Story.propTypes = {
  story: PropTypes.object.isRequired
};

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ backgroundColor: '#eee' }}>
        <View style={{ height: 80, flexDirection: 'row', paddingLeft: 15, alignItems: 'center' }}>
          <View style={{ marginRight: 18 }}>
            <SimpleLineIcons color="#ED8A18" name="layers" size={25} />
          </View>
          <TouchableOpacity>
            <Text style={{ ...styles.headline, fontSize: 16 }} type="medium">
              Start a New Story
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 15 }}>
          {genres.map((genre, key) => (
            <Genre key={key.toString()} genre={genre} />
          ))}
        </ScrollView>
        <View style={{ paddingLeft: 15 }}>
          <TouchableOpacity>
            <Text type="medium" style={{ marginTop: 15, color: '#03A2A2' }}>
              View all categories
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingLeft: 20,
            marginTop: 25,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
          <View style={{ flex: 3 }}>
            <Text type="medium" style={{ ...styles.headline, fontSize: 18 }}>
              All Stories
            </Text>
          </View>
          <View
            style={{
              flex: 2,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}>
            <TouchableOpacity>
              <Surface
                style={{
                  backgroundColor: 'white',
                  elevation: 15,
                  borderRadius: 4,
                  flexDirection: 'row',
                  padding: 2,
                  alignItems: 'center'
                }}>
                <AntDesign color="#5A7582" size={18} name="filter" />
                <Text type="bold" style={{ fontSize: 14, color: '#5A7582' }}>
                  FILTER
                </Text>
              </Surface>
            </TouchableOpacity>
            <TouchableOpacity>
              <Surface
                style={{
                  padding: 4,
                  marginLeft: 10,
                  marginRight: 20,
                  backgroundColor: 'white',
                  elevation: 2,
                  borderRadius: 4,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <FontAwesome size={14} color="#5A7582" name="search" />
              </Surface>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {stories.map(story => (
            <Story story={story} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  headline: { color: '#5A7582' }
});

export default HomeScreen;
