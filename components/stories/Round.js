import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Button } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import Text from '../CustomText';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../utils/dimensions';
import BoxMenu from './BoxMenu';

const Round = ({ round, totalRound, listMode, style }) => {
  const roundStatus = round.status;
  const inprogressRound = roundStatus === 'In Progress' || roundStatus === 'Pendding';
  const userTurn = round.author === 'You';
  const height = roundStatus === 'In Progress' && userTurn ? SCREEN_HEIGHT * 0.5 : 0;

  const roundBody = (
    <Text type="regular" style={{ color: '#5A7582', lineHeight: 20 }}>
      {round.body || ''}
    </Text>
  );

  const inprogress = (
    <View style={{ flexDirection: 'row', width: SCREEN_WIDTH * 0.7 }}>
      <Text style={styles.pendding}>{roundStatus || ''}</Text>
      <Text
        type="bold-italic"
        style={{ color: '#ED8A18', fontSize: 13, marginTop: 10, marginLeft: 10 }}>
        {round.timeLeft || ''}
      </Text>
    </View>
  );

  const userRound = (
    <>
      {roundBody}
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
    </>
  );

  const listRound = (
    <View style={{ marginHorizontal: 35, marginBottom: 20, ...style }}>
      <Text type="regular" style={{ color: '#5A7582', lineHeight: 20 }}>
        {round.body || ''}
      </Text>
    </View>
  );

  const cardRound = (
    <View style={{ marginBottom: 20 }}>
      <Text type="medium" style={styles.title}>
        Round {round.order}/{totalRound} {userTurn && '(Your Turn)'}
      </Text>

      <Surface style={{ ...styles.round, minHeight: height }}>
        <View style={styles.boxHeader}>
          <Text type="bold" style={styles.subTitle}>
            By {round.author || ''}
          </Text>
          <BoxMenu parentType="round" />
        </View>
        {inprogressRound && userTurn && userRound}

        {inprogressRound && !userTurn && inprogress}

        {roundStatus === 'completed' && (
          <>
            {roundBody}
            <View style={{ marginTop: 'auto' }}>
              <Text style={styles.separator}>---</Text>
              <View style={styles.displayRow}>
                <FontAwesome name="commenting" size={20} color="#0277BD" />
                <Text type="bold" style={styles.boxFooter}>
                  Comments: {round.comments}
                </Text>
              </View>
            </View>
          </>
        )}
      </Surface>
    </View>
  );

  return listMode ? listRound : cardRound;
};

Round.propTypes = {
  round: PropTypes.object.isRequired,
  totalRound: PropTypes.number,
  listMode: PropTypes.bool.isRequired,
  style: PropTypes.object
};

Round.defaultProps = {
  style: {},
  totalRound: 11
};

const styles = StyleSheet.create({
  title: {
    color: '#5A7582',
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 20
  },
  round: {
    marginHorizontal: 40,
    backgroundColor: '#fff',
    elevation: 5,
    alignSelf: 'center',
    padding: 15
  },
  pendding: {
    color: '#ED8A18',
    marginBottom: 20,
    marginTop: 10,
    fontSize: 13,
    fontFamily: 'RobotoItalic'
  },
  boxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  boxFooter: {
    marginLeft: 5,
    fontSize: 12,
    lineHeight: 20,
    color: '#5A7582'
  },
  subTitle: {
    fontWeight: 'bold',
    color: '#5A7582'
  },
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
  separator: {
    fontSize: 25,
    color: '#5A7582'
  },
  displayRow: {
    flexDirection: 'row'
  }
});

export default Round;
