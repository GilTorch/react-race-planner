import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import Text from './CustomText';

const PendingRoundBox = ({ title, subTitle, status, timeLeft }) => (
  <View>
    <Text type="medium" style={styles.title}>
      {title}
    </Text>
    <Surface style={styles.pendingRound}>
      <View style={styles.boxHeader}>
        <Text type="bold" style={styles.subTitle}>
          {subTitle}
        </Text>
        <Feather name="more-vertical" size={18} color="#5A7582" />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.pending}>{status}</Text>
        <Text type="bold" style={{ color: '#ED8A18', fontSize: 13, marginTop: 10, marginLeft: 10 }}>
          {timeLeft}
        </Text>
      </View>
    </Surface>
  </View>
);
PendingRoundBox.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  timeLeft: PropTypes.string
};
PendingRoundBox.defaultProps = {
  timeLeft: ''
};

const styles = StyleSheet.create({
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
  pendingRound: {
    marginHorizontal: 40,
    backgroundColor: '#fff',
    elevation: 5,
    padding: 15
  },
  pending: {
    color: '#ED8A18',
    marginBottom: 20,
    marginTop: 10,
    fontSize: 13,
    fontFamily: 'RobotoItalic'
  }
});

export default PendingRoundBox;
