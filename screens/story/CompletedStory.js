import * as React from 'react';
import { StyleSheet, ScrollView, View, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import { Button, Surface, TouchableRipple } from 'react-native-paper';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';

import Text from '../../components/CustomText';
import { Round, ProposedSection, MetaData } from '../../components/stories';
import { HugeAdvertisement, SmallAdvertisement } from '../../components/advertisements';
import { SCREEN_WIDTH } from '../../utils/dimensions';
import { intros, endings } from '../../utils/data';

const CompletedStory = ({ navigation }) => {
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
            Snitches
          </Text>

          <MetaData label="Genre" value="Action" />
          <MetaData label="Status" value="Completed" />
          <MetaData label="Master Author" value="Marie Clark" />
          <MetaData label="Intro Maximum Words" value="50" />
          <MetaData label="Ending Maximum Words" value="50" />
          <MetaData label="Words per Round" value="100 max" />
          <MetaData label="Co-Authors" value="+7 anonymous authors" />

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
          </View>
        </LinearGradient>
      </Surface>

      <ScrollView>
        <ProposedSection type="Intro" proposedBlocks={intros[1]} listMode={listMode} />

        <SmallAdvertisement />
        <Round
          round={{ title: 'Round 1/11', subTitle: 'By stephanyE289', comments: 0 }}
          listMode={listMode}
        />
        <Round
          round={{ title: 'Round 2/11', subTitle: 'By Anonymous 8', comments: 3 }}
          listMode={listMode}
        />
        <Round
          round={{ title: 'Round 3/11', subTitle: 'By Marie Clark', comments: 3 }}
          listMode={listMode}
        />
        <Round
          round={{ title: 'Round 4/11', subTitle: 'By Anonymous 2', comments: 10 }}
          listMode={listMode}
        />
        <HugeAdvertisement />
        <Round
          round={{ title: 'Round 5/11', subTitle: 'By Anonymous 6', comments: 1 }}
          listMode={listMode}
        />
        <Round
          round={{ title: 'Round 6/11', subTitle: 'By Anonymous 5', comments: 0 }}
          listMode={listMode}
        />
        <SmallAdvertisement />
        <Round
          round={{ title: 'Round 7/11', subTitle: 'By Jesica Eloi', comments: 0 }}
          listMode={listMode}
        />
        <Round
          round={{ title: 'Round 8/11', subTitle: 'By Anonymous 11', comments: 0 }}
          listMode={listMode}
        />
        <Round
          round={{ title: 'Round 9/11', subTitle: 'By Anonymous 3', comments: 33 }}
          listMode={listMode}
        />
        <Round
          round={{ title: 'Round 10/11', subTitle: 'By Anonymous 4', comments: 2 }}
          listMode={listMode}
        />
        <HugeAdvertisement />
        <Round
          round={{ title: 'Round 11/11', subTitle: 'By Anonymous 9', comments: 0 }}
          listMode={listMode}
        />

        <ProposedSection type="Ending" proposedBlocks={endings} listMode={listMode} />
      </ScrollView>
      {!listMode && (
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
