import * as React from 'react';
import { StyleSheet, ScrollView, View, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import { Button, Surface } from 'react-native-paper';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';

import Text from '../../components/CustomText';
import { Round, ProposedSection, MetaData } from '../../components/stories';
import { HugeAdvertisement, SmallAdvertisement } from '../../components/advertisements';
import { SCREEN_WIDTH } from '../../utils/dimensions';
import { intros } from '../../utils/data';

const StartedStory = ({ navigation }) => {
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
            There’s a Man in the Woods
          </Text>

          <MetaData label="Genre" value="Thriller" />
          <MetaData label="Status" value="In Progress" />
          <MetaData label="Master Author" value="Anonymous 1" />
          <MetaData label="Intro Maximum Words" value="50" />
          <MetaData label="Ending Maximum Words" value="50" />
          <MetaData label="Words per Round" value="100 max" />
          <MetaData label="Co-Authors" value="7/11" />

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
          </View>
        </LinearGradient>
      </Surface>

      <ScrollView>
        <ProposedSection type="Intro" proposedBlocks={intros[0]} />

        <SmallAdvertisement />
        <Round round={{ title: 'Round 1/8', subTitle: 'By Anonymous 1', comments: 3 }} />
        <Round round={{ title: 'Round 2/8', subTitle: 'By Anonymous 8', comments: 0 }} />
        <Round
          round={{
            title: 'Round 3/8',
            subTitle: 'By Anonymous 2',
            status: 'In Progress',
            timeLeft: '38 minutes and 3 seconds left.'
          }}
        />

        <HugeAdvertisement />
        <Round round={{ title: 'Round 4/8', subTitle: 'By Anonymous 7', status: 'Pendding' }} />
        <Round round={{ title: 'Round 5/8', subTitle: 'By Anonymous 3', status: 'Pendding' }} />
        <Round round={{ title: 'Round 6/8', subTitle: 'By Anonymous 6', status: 'Pendding' }} />

        <SmallAdvertisement />
        <Round round={{ title: 'Round 7/8', subTitle: 'By Anonymous 4', status: 'Pendding' }} />
        <Round round={{ title: 'Round 8/8', subTitle: 'By Anonymous 5', status: 'Pendding' }} />

        <Text type="bold" style={styles.title}>
          All Proposed Endings
        </Text>
        <Text
          type="bold-italic"
          style={{ color: '#ED8A18', marginLeft: 20, marginBottom: 20, fontSize: 13 }}>
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
  title: {
    color: '#5A7582',
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 20
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
