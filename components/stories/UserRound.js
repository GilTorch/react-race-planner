import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Surface } from 'react-native-paper';
import PropTypes from 'prop-types';

import Text from '../CustomText';
import { loremText } from '../../utils/data';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../utils/dimensions';
import BoxMenu from './BoxMenu';

const UserRound = ({ round, body }) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text type="medium" style={styles.title}>
        {round.title || ''}
      </Text>
      <Text type="bold-italic" style={{ color: '#ED8A18', marginLeft: 40, marginBottom: 15 }}>
        {round.timeLeft}
      </Text>
      <Surface style={styles.round}>
        <View style={styles.boxHeader}>
          <Text type="bold" style={styles.subTitle}>
            {round.subTitle}
          </Text>
          <BoxMenu parentType="round" />
        </View>
        <Text type="regular" style={{ color: '#5A7582', lineHeight: 20 }}>
          {body}
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
                onPress={() => ''}
                style={{ backgroundColor: '#ED8A18', width: SCREEN_WIDTH * 0.25 }}
                labelStyle={styles.boxBtnLabel}>
                Skip Turn
              </Button>
            </Surface>

            <Surface style={styles.surface}>
              <Button
                mode="contained"
                uppercase={false}
                onPress={() => ''}
                style={{ backgroundColor: '#f44336' }}
                labelStyle={styles.boxBtnLabel}>
                Leave Story
              </Button>
            </Surface>
          </View>
        </View>
      </Surface>
    </View>
  );
};

UserRound.propTypes = {
  round: PropTypes.object.isRequired,
  body: PropTypes.string
};

UserRound.defaultProps = {
  body: loremText.slice(0, 200)
};

const styles = StyleSheet.create({
  boxBtnLabel: {
    fontSize: 11,
    fontFamily: 'RobotoMedium',
    color: '#fff'
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
  round: {
    marginHorizontal: 40,
    minHeight: SCREEN_HEIGHT * 0.5,
    backgroundColor: '#fff',
    elevation: 5,
    alignSelf: 'center',
    padding: 15
  },
  boxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subTitle: {
    fontWeight: 'bold',
    color: '#5A7582'
  }
});

export default UserRound;
