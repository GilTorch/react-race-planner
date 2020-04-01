import * as React from 'react';
import { StyleSheet, ScrollView, View, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons, FontAwesome, Feather } from '@expo/vector-icons';
import { Paragraph, Button, Surface } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

import Text from '../../components/CustomText';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../utils/dimensions';

const StorySingleMeta = ({ label, value }) => (
  <View style={{ alignSelf: 'flex-start', marginLeft: 15 }}>
    <Paragraph>
      <Text type="bold" style={{ color: 'white' }}>
        {label}:{'  '}
      </Text>
      <Text type="regular" style={{ color: 'white' }}>
        {value}
      </Text>
    </Paragraph>
  </View>
);
StorySingleMeta.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

const PenddingRoundBox = ({ title, subTitle, status, timeLeft }) => (
  <View>
    <Text type="medium" style={styles.title}>
      {title}
    </Text>
    <Surface style={styles.penddingRound}>
      <View style={styles.boxHeader}>
        <Text type="bold" style={styles.subTitle}>
          {subTitle}
        </Text>
        <Feather name="more-vertical" size={18} color="#5A7582" />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.pendding}>{status}</Text>
        <Text type="bold" style={{ color: '#ED8A18', fontSize: 13, marginTop: 10, marginLeft: 10 }}>
          {timeLeft}
        </Text>
      </View>
    </Surface>
  </View>
);
PenddingRoundBox.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  timeLeft: PropTypes.string
};
PenddingRoundBox.defaultProps = {
  timeLeft: ''
};

const UserPartOfStory = ({ navigation }) => {
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
        backgroundColor: '#eee',
        flex: 1
      }}>
      <Surface
        style={{
          borderBottomRightRadius: 13,
          borderBottomLeftRadius: 13,
          overflow: 'hidden',
          elevation: 5
        }}>
        <LinearGradient
          colors={['#03A2A2', '#23C2C2']}
          locations={[0.4, 1]}
          style={{
            alignItems: 'center',
            flexDirection: 'column',
            paddingVertical: 15,
            paddingBottom: Constants.statusBarHeight,
            paddingTop: Constants.statusBarHeight * 1.7
          }}>
          <Text type="bold" style={{ color: 'white', fontSize: 18, marginBottom: 5 }}>
            ScriptoRerum
          </Text>
          <Text type="bold" style={{ color: 'white', fontSize: 18 }}>
            Alphonso, The Barber
          </Text>

          <StorySingleMeta label="Genre" value="Romance" />
          <StorySingleMeta label="Status" value="In Progress" />
          <StorySingleMeta label="Master Author" value="Anonymous 1" />
          <StorySingleMeta label="Intro Maximum Words" value="50" />
          <StorySingleMeta label="Ending Maximum Words" value="50" />
          <StorySingleMeta label="Words per Round" value="100 max" />
          <StorySingleMeta label="Co-Authors" value="7/11" />

          <View style={styles.headerBtn}>
            <Surface style={styles.surface}>
              <Button
                mode="contained"
                uppercase={false}
                style={{ backgroundColor: '#f44336' }}
                labelStyle={{ fontSize: 15, fontFamily: 'RobotoMedium', color: '#fff' }}>
                Leave Story
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
          </View>
        </LinearGradient>
      </Surface>

      <ScrollView>
        <Text type="medium" style={{ ...styles.title, marginBottom: 0 }}>
          All Proposed Intros (5)
        </Text>
        <ScrollView
          horizontal
          style={{ flex: 1 }}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginHorizontal: 20 }}>
          <Surface style={styles.intros}>
            <View style={styles.boxHeader}>
              <Text type="bold" style={styles.subTitle}>
                By Anonymous 8
              </Text>
              <Feather name="more-vertical" size={18} color="#5A7582" />
            </View>
            <Text type="regular" style={styles.body}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
              accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea. At vero
              eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea. At
              vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
              sea.
            </Text>
            <View style={{ marginTop: 'auto' }}>
              <Text style={styles.separator}>---</Text>
              <View style={styles.displayRow}>
                <FontAwesome name="star" size={20} color="#ed8a18" />
                <Text type="bold" style={styles.boxFooter}>
                  Elected Intro
                </Text>
              </View>
              <View style={styles.displayRow}>
                <MaterialCommunityIcons name="vote" size={20} color="#911414" />
                <Text type="bold" style={styles.boxFooter}>
                  Votes: 6/8
                </Text>
              </View>
              <View style={styles.displayRow}>
                <FontAwesome name="commenting" size={20} color="#0277BD" />
                <Text type="bold" style={styles.boxFooter}>
                  Comments: 8
                </Text>
              </View>
            </View>
          </Surface>
          <Surface style={styles.intros}>
            <View style={styles.boxHeader}>
              <Text type="bold" style={styles.subTitle}>
                By Anonymous 6
              </Text>
              <Feather name="more-vertical" size={18} color="#5A7582" />
            </View>
            <Text type="regular" style={styles.body}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
              accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea.
            </Text>
            <View style={{ marginTop: 'auto' }}>
              <Text style={styles.separator}>---</Text>
              <View style={styles.displayRow}>
                <MaterialCommunityIcons name="vote" size={20} color="#911414" />
                <Text type="bold" style={styles.boxFooter}>
                  Votes: 2/8
                </Text>
              </View>
              <View style={styles.displayRow}>
                <FontAwesome name="commenting" size={20} color="#0277BD" />
                <Text type="bold" style={styles.boxFooter}>
                  Comments: 4
                </Text>
              </View>
            </View>
          </Surface>
        </ScrollView>

        <Surface style={styles.smallAdvertisement}>
          <Text type="bold" style={styles.smallAdvertisementTitle}>
            344 X 71
          </Text>
          <Text type="bold" style={styles.smallAdvertisementTitle}>
            Advertisement Here
          </Text>
        </Surface>

        <Text type="medium" style={styles.title}>
          Round 1/8
        </Text>
        <Surface style={styles.round}>
          <View style={styles.boxHeader}>
            <Text type="bold" style={styles.subTitle}>
              By Anonymous 8
            </Text>
            <Feather name="more-vertical" size={18} color="#5A7582" />
          </View>
          <Text type="regular" style={styles.body}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea. At vero eos
            et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea. At vero
            eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea.
          </Text>
          <View style={{ marginTop: 'auto' }}>
            <Text style={styles.separator}>---</Text>
            <View style={styles.displayRow}>
              <FontAwesome name="commenting" size={20} color="#0277BD" />
              <Text style={styles.boxFooter}>Comments: 3</Text>
            </View>
          </View>
        </Surface>
        <Text type="medium" style={styles.title}>
          Round 2/8
        </Text>
        <Surface style={styles.round}>
          <View style={styles.boxHeader}>
            <Text style={styles.subTitle}>By Anonymous 2</Text>
            <Feather name="more-vertical" size={18} color="#5A7582" />
          </View>
          <Text type="regular" style={styles.body}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea. At vero eos
            et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea. At vero
            eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea.
          </Text>
          <View style={{ marginTop: 'auto' }}>
            <Text style={styles.separator}>---</Text>
            <View style={styles.displayRow}>
              <FontAwesome name="commenting" size={20} color="#0277BD" />
              <Text style={styles.boxFooter}>Comments: 0</Text>
            </View>
          </View>
        </Surface>
        <Text type="medium" style={styles.title}>
          Round 3/8 (Your Turn)
        </Text>
        <Text type="bold-italic" style={{ color: '#ED8A18', marginLeft: 40, marginBottom: 15 }}>
          45 minutes and 33 seconds left
        </Text>
        <Surface style={styles.round}>
          <View style={styles.boxHeader}>
            <Text style={styles.subTitle}>By You</Text>
            <Feather name="more-vertical" size={18} color="#5A7582" />
          </View>
          <Text type="regular" style={styles.body}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          </Text>
          <View style={{ marginTop: 'auto' }}>
            <Text style={styles.subTitle}>24/50 words</Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10
              }}>
              <Surface style={{ ...styles.surface, marginRight: 20 }}>
                <Button
                  mode="contained"
                  uppercase={false}
                  style={{ backgroundColor: '#ED8A18', width: SCREEN_WIDTH * 0.25 }}
                  labelStyle={styles.boxBtnLabel}>
                  Skip Turn
                </Button>
              </Surface>

              <Surface style={styles.surface}>
                <Button
                  mode="contained"
                  uppercase={false}
                  style={{ backgroundColor: '#f44336' }}
                  labelStyle={styles.boxBtnLabel}>
                  Leave Story
                </Button>
              </Surface>
            </View>
          </View>
        </Surface>
        <Surface
          style={{
            height: SCREEN_HEIGHT * 0.4,
            backgroundColor: '#fff',
            elevation: 5,
            marginHorizontal: 20,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20
          }}>
          <Text type="bold" style={styles.advertisementTitle}>
            344 X 344
          </Text>
          <Text type="bold" style={styles.advertisementTitle}>
            Advertisement Here
          </Text>
        </Surface>

        <PenddingRoundBox title="Round 4/8" subTitle="By Anonymous 7" status="Pendding" />

        <PenddingRoundBox title="Round 5/8" subTitle="By Anonymous 3" status="Pendding" />

        <PenddingRoundBox title="Round 6/8" subTitle="By Anonymous 6" status="Pendding" />

        <Surface style={{ ...styles.smallAdvertisement, marginTop: 20 }}>
          <Text type="bold" style={styles.smallAdvertisementTitle}>
            344 X 71
          </Text>
          <Text type="bold" style={styles.smallAdvertisementTitle}>
            Advertisement Here
          </Text>
        </Surface>

        <PenddingRoundBox title="Round 7/8" subTitle="By Anonymous 4" status="Pendding" />

        <PenddingRoundBox title="Round 8/8" subTitle="By Anonymous 5" status="Pendding" />

        <Text type="bold" style={styles.title}>
          All Proposed Endings
        </Text>
        <Text type="bold-italic" style={{ color: '#ED8A18', marginLeft: 20, marginBottom: 20 }}>
          Pendding
        </Text>
      </ScrollView>

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
    </View>
  );
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
  boxBtnLabel: {
    fontSize: 11,
    fontFamily: 'RobotoMedium',
    color: '#fff'
  },
  smallAdvertisement: {
    height: SCREEN_HEIGHT * 0.1,
    backgroundColor: '#fff',
    elevation: 5,
    marginHorizontal: 20,
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
  penddingRound: {
    marginHorizontal: 40,
    backgroundColor: '#fff',
    elevation: 5,
    padding: 15
  },
  pendding: {
    color: '#ED8A18',
    marginBottom: 20,
    marginTop: 10,
    fontSize: 13,
    fontFamily: 'RobotoItalic'
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

UserPartOfStory.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default UserPartOfStory;
