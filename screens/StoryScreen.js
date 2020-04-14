import * as React from 'react';
import { StyleSheet, ScrollView, View, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import { Button, Surface, TouchableRipple } from 'react-native-paper';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';

import Text from '../components/CustomText';
import { Round, ProposedSection, MetaData } from '../components/stories';
import { HugeAdvertisement, SmallAdvertisement } from '../components/advertisements';
import { SCREEN_WIDTH } from '../utils/dimensions';
import { stories } from '../utils/data';

const StoryScreen = ({ navigation, route }) => {
  const { storyId } = route.params;
  const story = stories.find(st => st.id === storyId) || stories[3];
  const masterAuthor = story.authors.find(author => author.storyLead);
  const authorsCount = story.authors.length;
  const missingAuthorsCount = 5 - authorsCount;
  const user = story.authors.find(author => author.username === 'johndoe');
  const inprogressStory = story.status === 'In Progress';
  const waitingStory = story.status === 'Waiting for players';
  const completedStory = story.status === 'Completed';
  const inprogress = inprogressStory || waitingStory;
  const status = inprogress ? 'In Progress' : 'Completed';
  const masterAuthorName = inprogress ? 'Anonymous 1' : masterAuthor.fullName;

  let coAuthors;
  if (inprogressStory) {
    coAuthors = `${authorsCount - 1}/${authorsCount}`;
  } else if (waitingStory) {
    coAuthors = `${missingAuthorsCount} more to start`;
  } else {
    coAuthors = `+${authorsCount - 1} anonymous authors`;
  }
  let firstBtnColor;
  if (user && inprogress) {
    firstBtnColor = '#F44336';
  } else if (!user && waitingStory) {
    firstBtnColor = '#ED8A18';
  } else {
    firstBtnColor = '#A39F9F';
  }

  const [listMode, setListMode] = React.useState(false);
  const icon = listMode ? 'eye-slash' : 'eye';
  const color = listMode ? '#FFF' : '#EEE';

  navigation.setOptions({
    headerShown: false
  });

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content');
    }, [])
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color
      }}>
      <Surface
        style={{
          borderBottomLeftRadius: 13,
          borderBottomRightRadius: 13,
          backgroundColor: '#03a2a2',
          elevation: 5
        }}>
        <LinearGradient
          colors={['#03a2a2', '#23c2c2']}
          locations={[0.4, 1]}
          style={{
            alignItems: 'center',
            flexDirection: 'column',
            borderRadius: 13,
            paddingBottom: Constants.statusBarHeight,
            paddingTop: Constants.statusBarHeight * 1.7
          }}>
          <Text type="bold" style={{ color: 'white', fontSize: 18, marginBottom: 5 }}>
            ScriptoRerum
          </Text>
          <Text type="bold" style={{ color: 'white', fontSize: 18 }}>
            {story.title}
          </Text>

          <MetaData label="Genre" value={story.genre} />
          <MetaData label="Status" value={status} />
          <MetaData label="Master Author" value={masterAuthorName} />
          <MetaData label="Intro Maximum Words" value="50" />
          <MetaData label="Ending Maximum Words" value="50" />
          <MetaData label="Words per Round" value="100 max" />
          <MetaData label="Co-Authors" value={coAuthors} />

          <View style={styles.headerBtn}>
            <Surface style={styles.surface}>
              <Button
                mode="contained"
                uppercase={false}
                style={{ backgroundColor: firstBtnColor }}
                labelStyle={{ fontSize: 15, fontFamily: 'RobotoMedium', color: '#fff' }}>
                {user ? 'Leave Story' : 'Join Story'}
              </Button>
            </Surface>

            <Surface style={styles.surface}>
              <Button
                mode="text"
                icon="arrow-left"
                color="#5a7582"
                uppercase={false}
                onPress={() => navigation.goBack()}
                labelStyle={{ fontSize: 15, fontFamily: 'RobotoMedium' }}>
                Go Back
              </Button>
            </Surface>

            {!inprogress && (
              <Surface style={styles.surface}>
                <TouchableRipple onPress={() => setListMode(!listMode)} style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', paddingHorizontal: 5 }}>
                    <FontAwesome
                      name="bars"
                      size={22}
                      color="#5a7582"
                      style={{ marginTop: 13, marginLeft: 15 }}
                    />
                    <FontAwesome
                      name={icon}
                      size={22}
                      color="#5a7582"
                      style={{
                        position: 'absolute',
                        left: 5
                      }}
                    />
                  </View>
                </TouchableRipple>
              </Surface>
            )}
          </View>
        </LinearGradient>
      </Surface>

      <ScrollView>
        {waitingStory && (
          <>
            <Text type="medium" style={styles.title}>
              All Proposed Intros
            </Text>
            <Text type="bold-italic" style={styles.penddingText}>
              Waiting for {missingAuthorsCount} more players.
            </Text>

            <HugeAdvertisement />
          </>
        )}
        {!waitingStory && (
          <>
            <ProposedSection type="Intro" proposedBlocks={story.intros} listMode={listMode} />
            <SmallAdvertisement />
          </>
        )}

        {!waitingStory &&
          story.rounds.map((round, index) => {
            const bigAdd = [4, 10];
            const add = [6];
            return (
              <View key={Math.random()}>
                {bigAdd.includes(index) && <HugeAdvertisement />}
                {add.includes(index) && <SmallAdvertisement />}
                <Round round={round} totalRound={story.totalRound} listMode={listMode} />
              </View>
            );
          })}
        {inprogressStory && (
          <>
            <Text type="bold" style={{ ...styles.title, marginTop: 0 }}>
              All Proposed Endings
            </Text>
            <Text type="bold-italic" style={{ ...styles.penddingText, fontSize: 13 }}>
              Pendding
            </Text>
          </>
        )}
        {completedStory && (
          <ProposedSection type="Ending" proposedBlocks={story.endings} listMode={listMode} />
        )}
      </ScrollView>

      {!listMode && !waitingStory && (
        <View
          style={{
            position: 'absolute',
            width: SCREEN_WIDTH * 0.25,
            bottom: 25,
            right: 10
          }}>
          <Surface style={styles.floatingNav}>
            <FontAwesome name="chevron-up" size={20} color="#5A7582" />
            <Text type="bold" style={{ color: '#5A7582' }}>
              FIRST
            </Text>
          </Surface>
          <Surface style={{ ...styles.floatingNav, marginTop: 10 }}>
            <FontAwesome name="chevron-down" size={20} color="#5A7582" />
            <Text type="bold" style={{ color: '#5A7582' }}>
              LAST
            </Text>
          </Surface>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#5A7582',
    fontSize: 20,
    marginLeft: 20,
    marginTop: 20
  },
  headerBtn: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginHorizontal: '5%',
    justifyContent: 'space-around',
    marginTop: 10
  },
  surface: {
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 5
  },
  penddingText: {
    color: '#ED8A18',
    marginLeft: 20,
    marginVertical: 20
  },
  floatingNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    height: 45,
    elevation: 3
  }
});

StoryScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
};

export default StoryScreen;
