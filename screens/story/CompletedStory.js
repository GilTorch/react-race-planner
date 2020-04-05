import * as React from 'react';
import { StyleSheet, ScrollView, View, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons, FontAwesome, Feather } from '@expo/vector-icons';
import { Paragraph, Button, Surface, TouchableRipple } from 'react-native-paper';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';

import Text from '../../components/CustomText';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../utils/dimensions';

const INTROS = [
  { id: 1, subTitle: 'By Anonymouns 8', elected: true, votes: '9/11', comments: '24' },
  { id: 2, subTitle: 'By Anonymouns 4', elected: false, votes: '6/11', comments: '8' }
];
const ENDINGS = [
  { id: 1, subTitle: 'By Marie Clack', elected: true, votes: '11/11', comments: '33' },
  { id: 2, subTitle: 'By Anonymouns 6', elected: false, votes: '5/11', comments: '15' }
];

const CompletedStory = ({ navigation }) => {
  const [listView, setListView] = React.useState(false);
  const icon = listView ? 'eye-slash' : 'eye';
  const color = listView ? '#FFF' : '#EEE';

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
      <StatusBar barStyle="light-content" />
      <Surface
        style={{
          borderBottomLeftRadius: 13,
          borderBottomRightRadius: 13,
          overflow: 'hidden',
          elevation: 5
        }}>
        <LinearGradient
          colors={['#03a2a2', '#23c2c2']}
          style={{
            alignItems: 'center',
            flexDirection: 'column',
            paddingBottom: Constants.statusBarHeight,
            paddingTop: Constants.statusBarHeight * 1.7
          }}>
          <Text type="bold" style={{ color: 'white', fontSize: 18, marginBottom: 5 }}>
            ScriptoRerum
          </Text>
          <Text type="bold" style={{ color: 'white', fontSize: 18 }}>
            Snitches
          </Text>

          <StorySingleMeta label="Genre" value="Action" />
          <StorySingleMeta label="Status" value="Completed" />
          <StorySingleMeta label="Master Author" value="Marie Clark" />
          <StorySingleMeta label="Intro Maximum Words" value="50" />
          <StorySingleMeta label="Ending Maximum Words" value="50" />
          <StorySingleMeta label="Words per Round" value="100 max" />
          <StorySingleMeta label="Co-Authors" value="+7 anonymous authors" authors={[1, 2]} />

          <View style={styles.headerBtn}>
            <Surface style={styles.surface}>
              <Button
                mode="contained"
                uppercase={false}
                style={{ backgroundColor: '#A39F9F' }}
                labelStyle={{ fontSize: 15, fontFamily: 'RobotoMedium', color: '#fff' }}>
                Join Story
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

            <Surface style={styles.surface}>
              <TouchableRipple onPress={() => setListView(!listView)} style={{ flex: 1 }}>
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
          </View>
        </LinearGradient>
      </Surface>

      <ScrollView>
        <ProposedSection type="Intro" proposedBlocks={INTROS} listView={listView} />

        <SmallAdvertisement />

        <Round title="Round 1/11" subTitle="By stephanyE289" comments={0} listView={listView} />

        <Round title="Round 2/11" subTitle="By Anonymous 8" comments={3} listView={listView} />
        <Round title="Round 3/11" subTitle="By Marie Clark" comments={3} listView={listView} />
        <Round title="Round 4/11" subTitle="By Anonymous 2" comments={10} listView={listView} />
        <Advertisement />
        <Round title="Round 5/11" subTitle="By Anonymous 6" comments={1} listView={listView} />
        <Round title="Round 6/11" subTitle="By Anonymous 5" comments={0} listView={listView} />
        <SmallAdvertisement />
        <Round title="Round 7/11" subTitle="By Jesica Eloi" comments={0} listView={listView} />
        <Round title="Round 8/11" subTitle="By Anonymous 11" comments={0} listView={listView} />
        <Round title="Round 9/11" subTitle="By Anonymous 3" comments={33} listView={listView} />
        <Round title="Round 10/11" subTitle="By Anonymous 4" comments={2} listView={listView} />
        <Advertisement />
        <Round title="Round 11/11" subTitle="By Anonymous 9" comments={0} listView={listView} />

        <ProposedSection type="Ending" proposedBlocks={ENDINGS} listView={listView} />
      </ScrollView>
      {!listView && (
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

const StorySingleMeta = ({ label, value, authors }) => (
  <View style={{ alignSelf: 'flex-start', marginLeft: 15 }}>
    <Paragraph>
      <Text type="bold" style={{ color: 'white' }}>
        {label}:{'  '}
      </Text>
      {authors.map(i => (
        <FontAwesome key={i} name="user-circle" size={20} color="#fff" style={{ marginLeft: 3 }} />
      ))}
      <Text type="regular" style={{ color: 'white' }}>
        {value}
      </Text>
    </Paragraph>
  </View>
);
StorySingleMeta.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  authors: PropTypes.array
};
StorySingleMeta.defaultProps = {
  authors: []
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

const Advertisement = () => (
  <Surface style={styles.advertisement}>
    <Text type="bold" style={styles.advertisementTitle}>
      344 X 344
    </Text>
    <Text type="bold" style={styles.advertisementTitle}>
      Advertisement Here
    </Text>
  </Surface>
);

const LOREM = () => (
  <Text type="regular" style={styles.body}>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
    ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
    dolores et ea rebum. Stet clita kasd gubergren, no sea. At vero eos et accusam et justo duo
    dolores et ea rebum. Stet clita kasd gubergren, no sea. At vero eos et accusam et justo duo
    dolores et ea rebum. Stet clita kasd gubergren, no sea.
  </Text>
);

const Round = ({ title, subTitle, comments, listView }) => {
  const listRound = (
    <View style={{ marginHorizontal: 35, marginBottom: 10 }}>
      <LOREM />
    </View>
  );
  const cardRound = (
    <View style={{ marginBottom: 20 }}>
      <Text type="medium" style={styles.title}>
        {title}
      </Text>
      <Surface style={styles.round}>
        <View style={styles.boxHeader}>
          <Text type="bold" style={styles.subTitle}>
            {subTitle}
          </Text>
          <Feather name="more-vertical" size={18} color="#5A7582" />
        </View>
        <LOREM />
        <View style={{ marginTop: 'auto' }}>
          <Text style={styles.separator}>---</Text>
          <View style={styles.displayRow}>
            <FontAwesome name="commenting" size={20} color="#0277BD" />
            <Text type="bold" style={styles.boxFooter}>
              Comments: {comments}
            </Text>
          </View>
        </View>
      </Surface>
    </View>
  );
  return listView ? listRound : cardRound;
};

Round.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  comments: PropTypes.number.isRequired,
  listView: PropTypes.bool.isRequired
};

const ProposedSection = ({ type, proposedBlocks, listView }) => {
  const listRound = <Round title="" subTitle="" comments={0} listView />;
  const cardsSection = (
    <>
      <Text type="medium" style={{ ...styles.title, marginBottom: 0 }}>
        All Proposed {type}s ({proposedBlocks.length})
      </Text>
      <ScrollView
        horizontal
        style={{ flex: 1 }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginHorizontal: 20 }}>
        {proposedBlocks.map(proposedBlock => (
          <Surface key={proposedBlock.id} style={styles.intros}>
            <View style={styles.boxHeader}>
              <Text type="bold" style={styles.subTitle}>
                {proposedBlock.subTitle}
              </Text>
              <Feather name="more-vertical" size={18} color="#5A7582" />
            </View>
            <LOREM />
            <View style={{ marginTop: 'auto' }}>
              <Text style={styles.separator}>---</Text>
              {proposedBlock.elected && (
                <View style={styles.displayRow}>
                  <FontAwesome name="star" size={20} color="#ed8a18" />
                  <Text type="bold" style={styles.boxFooter}>
                    Elected {type}
                  </Text>
                </View>
              )}
              <View style={styles.displayRow}>
                <MaterialCommunityIcons name="vote" size={20} color="#911414" />
                <Text type="bold" style={styles.boxFooter}>
                  Votes: {proposedBlock.votes}
                </Text>
              </View>
              <View style={styles.displayRow}>
                <FontAwesome name="commenting" size={20} color="#0277BD" />
                <Text type="bold" style={styles.boxFooter}>
                  Comments: {proposedBlock.comments}
                </Text>
              </View>
            </View>
          </Surface>
        ))}
      </ScrollView>
    </>
  );
  return listView ? listRound : cardsSection;
};
ProposedSection.propTypes = {
  type: PropTypes.string.isRequired,
  proposedBlocks: PropTypes.array.isRequired,
  listView: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
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
  intros: {
    width: SCREEN_WIDTH * 0.75,
    elevation: 5,
    marginVertical: 20,
    marginRight: 30,
    padding: 10
  },
  boxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    color: '#5A7582',
    fontSize: 20,
    marginLeft: 20,
    marginVertical: 20
  },
  subTitle: {
    fontWeight: 'bold',
    color: '#5A7582'
  },
  body: {
    color: '#5A7582'
  },
  separator: {
    fontSize: 25,
    color: '#5A7582'
  },
  displayRow: {
    flexDirection: 'row'
  },
  boxFooter: {
    marginLeft: 5,
    fontSize: 12,
    lineHeight: 20,
    color: '#5A7582'
  },
  advertisement: {
    height: SCREEN_HEIGHT * 0.4,
    backgroundColor: '#fff',
    elevation: 5,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
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
  },
  advertisementTitle: {
    color: '#5A7582',
    fontSize: 25
  },
  round: {
    marginHorizontal: 40,
    minHeight: SCREEN_HEIGHT * 0.35,
    backgroundColor: '#fff',
    elevation: 5,
    alignSelf: 'center',
    padding: 15
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

CompletedStory.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default CompletedStory;
