import * as React from 'react';
import { StyleSheet, ScrollView, View, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import { Paragraph, Button, Surface } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

import Text from '../../components/CustomText';
import { SCREEN_HEIGHT } from '../../utils/dimensions';

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

const InProgressStory = ({ navigation }) => {
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
            The Flag and The Bucket
          </Text>

          <StorySingleMeta label="Genre" value="Mystery" />
          <StorySingleMeta label="Status" value="In Progress" />
          <StorySingleMeta label="Master Author" value="Anonymous 1" />
          <StorySingleMeta label="Intro Maximum Words" value="50" />
          <StorySingleMeta label="Ending Maximum Words" value="50" />
          <StorySingleMeta label="Words per Round" value="100 max" />
          <StorySingleMeta label="Co-Authors" value="2 more to start" />

          <View style={styles.headerBtn}>
            <Surface style={styles.surface}>
              <Button
                mode="contained"
                uppercase={false}
                style={{ backgroundColor: '#ED8A18' }}
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
        <Text type="medium" style={{ ...styles.title, marginBottom: 0 }}>
          All Proposed Intros
        </Text>
        <Text type="bold-italic" style={{ color: '#ED8A18', marginLeft: 20, marginVertical: 20 }}>
          Waiting for 2 more players.
        </Text>

        <Surface
          style={{
            height: SCREEN_HEIGHT * 0.4,
            backgroundColor: '#fff',
            elevation: 5,
            marginHorizontal: 20,
            marginBottom: 10,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Text type="bold" style={styles.advertisementTitle}>
            344 X 344
          </Text>
          <Text type="bold" style={styles.advertisementTitle}>
            Advertisement Here
          </Text>
        </Surface>
      </ScrollView>
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
    marginVertical: 20
  },
  advertisementTitle: {
    color: '#5A7582',
    fontSize: 25
  }
});

InProgressStory.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default InProgressStory;
