import * as React from 'react';
import { StyleSheet, ScrollView, View, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import { Paragraph, Button, Surface } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

import Text from '../../components/CustomText';
import { SCREEN_HEIGHT } from '../../utils/dimensions';

const InProgressStory = ({ navigation }) => {
  navigation.setOptions({
    headerShown: false
  });

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content');
    }, [])
  );

  const showStorySingleMeta = (label, value) => (
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
            The Flag and The Bucket
          </Text>

          {showStorySingleMeta('Genre', 'Mystery')}
          {showStorySingleMeta('Status', 'In Progress')}
          {showStorySingleMeta('Master Author', 'Anonymous 1')}
          {showStorySingleMeta('Intro Maximum Words', '50')}
          {showStorySingleMeta('Ending Maximum Words', '50')}
          {showStorySingleMeta('Words per Round', '100 max')}
          {showStorySingleMeta('Co-Authors', '2 more to start')}

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
