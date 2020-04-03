import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import Text from '../CustomText';
import { loremText } from '../../utils/data';
import { SCREEN_WIDTH } from '../../utils/dimensions';
import BoxMenu from './BoxMenu';

const Round = ({ round, body, listMode, style }) => {
  const inprogress = (
    <View style={{ flexDirection: 'row', width: SCREEN_WIDTH * 0.7 }}>
      <Text style={styles.pendding}>{round.status || ''}</Text>
      <Text
        type="bold-italic"
        style={{ color: '#ED8A18', fontSize: 13, marginTop: 10, marginLeft: 10 }}>
        {round.timeLeft || ''}
      </Text>
    </View>
  );
  const listRound = (
    <View style={{ marginHorizontal: 35, marginBottom: 20, ...style }}>
      <Text type="regular" style={{ color: '#5A7582', lineHeight: 20 }}>
        {body}
      </Text>
    </View>
  );
  const cardRound = (
    <View style={{ marginBottom: 20 }}>
      <Text type="medium" style={styles.title}>
        {round.title || ''}
      </Text>

      <Surface style={styles.round}>
        <View style={styles.boxHeader}>
          <Text type="bold" style={styles.subTitle}>
            {round.subTitle || ''}
          </Text>
          <BoxMenu parentType="round" />
        </View>
        {round.status && inprogress}

        {!round.status && (
          <>
            <Text type="regular" style={{ color: '#5A7582', lineHeight: 20 }}>
              {body}
            </Text>
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
  body: PropTypes.string,
  listMode: PropTypes.bool.isRequired,
  style: PropTypes.object
};

Round.defaultProps = {
  style: {},
  listMode: false,
  body: loremText
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
  separator: {
    fontSize: 25,
    color: '#5A7582'
  },
  displayRow: {
    flexDirection: 'row'
  }
});

export default Round;
