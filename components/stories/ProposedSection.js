import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Surface, Button } from 'react-native-paper';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import moment from 'moment';
import Text from '../CustomText';
import { SCREEN_WIDTH } from '../../utils/dimensions';
import BoxMenu from './BoxMenu';

const ProposedSection = ({ type, proposedBlocks, listMode, userCanPropose, onPropose, story }) => {
  const electedBlock = proposedBlocks.find(block => block.isElected);
  const listElected = electedBlock && (
    <View style={{ marginHorizontal: 35, marginBottom: 20, marginTop: type === 'Ending' ? 0 : 20 }}>
      <Text type="regular" style={{ color: textColor, lineHeight: 20 }}>
        {electedBlock.content || `No elected ${type} yet`}
      </Text>
    </View>
  );

  const cardsSection = (
    <>
      <Text type="medium" style={{ ...styles.title, marginTop: type === 'Ending' ? 0 : 20 }}>
        All Proposed {type}s ({proposedBlocks.length})
      </Text>

      {userCanPropose && (
        <View
          style={{
            flex: 1,
            marginLeft: 20,
            marginTop: 10
          }}>
          <Button
            icon={({ size }) => <FontAwesome5 size={size} color="#fff" name="pen-fancy" />}
            uppercase={false}
            onPress={() => onPropose()}
            style={{ backgroundColor: '#ed8a18', width: SCREEN_WIDTH * 0.5, elevation: 2 }}>
            <Text type="bold" style={{ color: '#FFF' }}>
              Propose an {type}
            </Text>
          </Button>
        </View>
      )}

      {story?.status === 'waiting_for_intros' && story.startedAt && (
        <Text style={{ color: '#F44336', marginLeft: 20, marginTop: 7 }}>
          Submitting intros ends{' '}
          {moment().to(
            moment(story.startedAt).add(story.settings?.introTimeLimitSeconds, 'seconds')
          )}{' '}
        </Text>
      )}

      {!proposedBlocks?.length && (
        <Text
          style={{
            color: '#ed8a18',
            marginLeft: 20,
            marginBottom: 20,
            marginTop: 10
          }}>
          No endings yet
        </Text>
      )}

      <ScrollView horizontal style={{ flex: 1 }} showsHorizontalScrollIndicator={false}>
        {proposedBlocks.map((proposedBlock, index) => {
          const margin = index === 0 ? 20 : 0;
          let authorName = index === 0 ? 'Master Author' : 'Anonymous Author';

          if (story.status === 'completed') {
            if (proposedBlock.privacyStatus === 'username') {
              authorName = proposedBlock.author.username;
            } else if (proposedBlock.privacyStatus === 'username_and_full_name') {
              authorName = `${proposedBlock.author.firstName} ${proposedBlock.author.lastName} (${proposedBlock.author.username})`;
            }
          }

          return (
            <Surface key={Math.random()} style={{ ...styles.intros, marginLeft: margin }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text type="bold" style={styles.subTitle}>
                  By {authorName}
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
  listMode: PropTypes.bool,
  userCanPropose: PropTypes.bool,
  onPropose: PropTypes.func.isRequired
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
