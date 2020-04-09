import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Menu, Divider } from 'react-native-paper';
import { Feather, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

import Text from '../CustomText';

const BoxMenu = ({ parentType, block }) => {
  const [showMenu, setshowMenu] = useState(false);

  return (
    <TouchableOpacity onPress={() => setshowMenu(true)}>
      <Menu
        contentStyle={{ flexDirection: 'column', justifyContent: 'space-between' }}
        visible={showMenu}
        anchor={<Feather name="more-vertical" size={18} color="#5A7582" />}
        onDismiss={() => setshowMenu(false)}>
        <TouchableOpacity style={styles.menuItem}>
          <FontAwesome name="flag" size={16} color="#F44336" style={{ marginRight: 10 }} />
          <Text type="regular" style={{ color: '#5A7582' }}>
            Report
          </Text>
        </TouchableOpacity>
        {parentType === 'round' && (
          <TouchableOpacity style={{ ...styles.menuItem, marginTop: 10 }}>
            <FontAwesome name="commenting" size={16} color="#0277BD" style={{ marginRight: 10 }} />
            <Text type="regular" style={{ color: '#5A7582' }}>
              Comment
            </Text>
          </TouchableOpacity>
        )}
        {parentType === 'intro_ending' && (
          <>
            <TouchableOpacity style={{ ...styles.menuItem, marginTop: 10 }}>
              <FontAwesome
                name="commenting"
                size={16}
                color="#0277BD"
                style={{ marginRight: 10 }}
              />
              <Text type="regular" style={{ color: '#5A7582' }}>
                Comment
              </Text>
            </TouchableOpacity>
            <Divider style={{ marginTop: 5 }} />
            <TouchableOpacity style={{ ...styles.menuItem, marginTop: 5 }}>
              <FontAwesome5 name="vote-yea" size={15} color="#911414" style={{ marginRight: 10 }} />
              <View>
                <Text type="regular" style={{ color: '#5A7582' }}>
                  Vote
                </Text>
                <Text type="regular" style={{ color: '#EC8918', fontSize: 8 }}>
                  {block.hasElected ? 'Voting is over' : 'Votes end in 34 minutes'}
                </Text>
              </View>
            </TouchableOpacity>
          </>
        )}
      </Menu>
    </TouchableOpacity>
  );
};

BoxMenu.propTypes = {
  parentType: PropTypes.string.isRequired,
  block: PropTypes.object
};

BoxMenu.defaultProps = {
  block: {}
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 20,
    alignItems: 'center'
  }
});

export default BoxMenu;
