import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Animated, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons, FontAwesome, Feather } from '@expo/vector-icons';
import { Button, Surface } from 'react-native-paper';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';
import Text from '../../components/CustomText';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../utils/dimensions';
import StorySingleMeta from '../../components/SingleStoryMeta';
import PendingRoundBox from '../../components/PendingRoundBox';

const StartedStory = ({ navigation }) => {
  navigation.setOptions({
    headerShown: false
  });

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content');
    }, [])
  );

  const [scrollY] = useState(new Animated.Value(0));

  const HEADER_MINIMUM_HEIGHT = 130;
  const HEADER_MAXIMUM_HEIGHT = 270;

  const headerY = scrollY.interpolate({
    inputRange: [0, SCREEN_HEIGHT],
    outputRange: [HEADER_MAXIMUM_HEIGHT, HEADER_MINIMUM_HEIGHT],
    extrapolate: 'clamp'
  });

  const opacity = scrollY.interpolate({
    inputRange: [0, SCREEN_HEIGHT],
    outputRange: [1, 0]
  });

  return (
    <View
      style={{
        backgroundColor: '#eee',
        flex: 1
      }}>
      <StatusBar barStyle="light-content" />
      <View style={{ position: 'absolute', width: '100%', top: 0, left: 0, zIndex: 1000 }}>
        <Surface>
          <Animated.View
            style={{
              backgroundColor: 'red',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 1000,
              height: headerY,
              overflow: 'hidden'
            }}>
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
                  There’s a Man in the Woods
                </Text>

                <StorySingleMeta
                  containerStyle={{
                    opacity
                  }}
                  label="Genre"
                  value="Thriller"
                />
                <StorySingleMeta
                  containerStyle={{
                    opacity
                  }}
                  label="Status"
                  value="In Progress"
                />
                <StorySingleMeta
                  containerStyle={{
                    opacity
                  }}
                  label="Master Author"
                  value="Anonymous 1"
                />
                <StorySingleMeta
                  containerStyle={{
                    opacity
                  }}
                  label="Intro Maximum Words"
                  value="50"
                />
                <StorySingleMeta
                  containerStyle={{
                    opacity
                  }}
                  label="Ending Maximum Words"
                  value="50"
                />
                <StorySingleMeta
                  containerStyle={{ opacity }}
                  label="Words per Round"
                  value="100 max"
                />
                <StorySingleMeta containerStyle={{ opacity }} label="Co-Authors" value="7/11" />
              </LinearGradient>
            </Surface>
          </Animated.View>
          <Animated.View
            style={{
              position: 'absolute',
              backgroundColor: 'hsl(180, 69%, 43%)',
              ...styles.headerBtn,
              width: SCREEN_WIDTH + 50,
              left: -40,
              top: Animated.subtract(headerY, 10),
              paddingTop: 10,
              paddingBottom: 10,
              zIndex: 1000
            }}>
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
          </Animated.View>
        </Surface>
      </View>
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }])}>
        <Text type="medium" style={{ ...styles.title, marginBottom: 0 }}>
          All Proposed Intros (2)
        </Text>
        <ScrollView
          horizontal
          style={{ flex: 1 }}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginHorizontal: 20 }}>
          <Surface style={styles.intros}>
            <View style={styles.boxHeader}>
              <Text type="bold" style={styles.subTitle}>
                By Anonymous 1
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
                  Votes: 5/8
                </Text>
              </View>
              <View style={styles.displayRow}>
                <FontAwesome name="commenting" size={20} color="#0277BD" />
                <Text type="bold" style={styles.boxFooter}>
                  Comments: 3
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
              By Anonymous 1
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
            <Text style={styles.subTitle}>By Anonymous 8</Text>
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

        <PendingRoundBox
          title="Round 3/8"
          subTitle="By Anonymous 2"
          status="In Progress"
          timeLeft="38 minutes and 3 seconds left."
        />

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

        <PendingRoundBox title="Round 4/8" subTitle="By Anonymous 7" status="Pending" />

        <PendingRoundBox title="Round 5/8" subTitle="By Anonymous 3" status="Pending" />

        <PendingRoundBox title="Round 6/8" subTitle="By Anonymous 6" status="Pending" />

        <Surface style={{ ...styles.smallAdvertisement, marginTop: 20 }}>
          <Text type="bold" style={styles.smallAdvertisementTitle}>
            344 X 71
          </Text>
          <Text type="bold" style={styles.smallAdvertisementTitle}>
            Advertisement Here
          </Text>
        </Surface>

        <PendingRoundBox title="Round 7/8" subTitle="By Anonymous 4" status="Pending" />

        <PendingRoundBox title="Round 8/8" subTitle="By Anonymous 5" status="Pending" />

        <Text type="bold" style={styles.title}>
          All Proposed Endings
        </Text>
        <Text type="bold-italic" style={{ color: '#ED8A18', marginLeft: 20, marginBottom: 20 }}>
          Pending
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

StartedStory.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default StartedStory;
