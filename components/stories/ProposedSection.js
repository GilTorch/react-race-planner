import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Surface } from 'react-native-paper';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import Text from '../CustomText';
import { SCREEN_WIDTH } from '../../utils/dimensions';
import BoxMenu from './BoxMenu';

const ProposedSection = ({ type, proposedBlocks, listMode }) => {
  const electedBlock = proposedBlocks.find(block => block.isElected);
  const listElected = (
    <View style={{ marginHorizontal: 35, marginBottom: 20, marginTop: type === 'Ending' ? 0 : 20 }}>
      <Text type="regular" style={{ color: textColor, lineHeight: 20 }}>
        {electedBlock?.content}
      </Text>
    </View>
  );

  const cardsSection = (
    <>
      <Text type="medium" style={{ ...styles.title, marginTop: type === 'Ending' ? 0 : 20 }}>
        All Proposed {type}s ({proposedBlocks.length})
      </Text>
      <ScrollView horizontal style={{ flex: 1 }} showsHorizontalScrollIndicator={false}>
        {proposedBlocks.map((proposedBlock, index) => {
          const margin = index === 0 ? 20 : 0;
          return (
            <Surface key={Math.random()} style={{ ...styles.intros, marginLeft: margin }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text type="bold" style={styles.subTitle}>
                  By {proposedBlock.author.username}
                </Text>
                <BoxMenu
                  parentType={type}
                  block={{ ...proposedBlock, hasElected: !!electedBlock }}
                />
              </View>
              <Text type="regular" style={{ color: textColor, lineHeight: 20 }}>
                {proposedBlock.content}
              </Text>
              <View style={{ marginTop: 'auto' }}>
                <Text style={styles.separator}>---</Text>
                {proposedBlock.isElected && (
                  <View style={styles.displayRow}>
                    <FontAwesome name="star" size={20} color="#ed8a18" />
                    <Text type="bold" style={styles.boxFooter}>
                      Elected {type}
                    </Text>
                  </View>
                )}
                <View style={styles.displayRow}>
                  <FontAwesome5 name="vote-yea" size={16} color="#911414" />
                  <Text type="bold" style={styles.boxFooter}>
                    Votes: {proposedBlock.votes.length}
                  </Text>
                </View>
                <View style={styles.displayRow}>
                  <FontAwesome name="commenting" size={20} color="#0277BD" />
                  <Text type="bold" style={styles.boxFooter}>
                    Comments: {proposedBlock.comments.length}
                  </Text>
                </View>
              </View>
            </Surface>
          );
        })}
      </ScrollView>
    </>
  );
  return listMode ? listElected : cardsSection;
};

ProposedSection.propTypes = {
  type: PropTypes.string.isRequired,
  proposedBlocks: PropTypes.array.isRequired,
  listMode: PropTypes.bool
};

ProposedSection.defaultProps = {
  listMode: false
};

const textColor = '#5A7582';

const styles = StyleSheet.create({
  title: {
    color: textColor,
    fontSize: 20,
    marginLeft: 20
  },
  intros: {
    width: SCREEN_WIDTH * 0.75,
    elevation: 2,
    marginVertical: 20,
    marginRight: 20,
    padding: 10
  },
  subTitle: {
    fontWeight: 'bold',
    color: textColor
  },
  separator: {
    fontSize: 25,
    color: textColor
  },
  boxFooter: {
    marginLeft: 5,
    fontSize: 12,
    lineHeight: 20,
    color: textColor
  },
  displayRow: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default ProposedSection;
