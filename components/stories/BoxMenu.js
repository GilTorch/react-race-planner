import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Menu } from 'react-native-paper';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTYpes from 'prop-types';

import Text from '../CustomText';

const BoxMenu = ({ parentType }) => {
  const [showMenu, setshowMenu] = useState(false);

  return (
    <TouchableOpacity onPress={() => setshowMenu(true)}>
      <Menu
        contentStyle={{ flexDirection: 'column', justifyContent: 'space-between' }}
        visible={showMenu}
        anchor={<Feather name="more-vertical" size={18} color="#5A7582" />}
        onDismiss={() => setshowMenu(false)}>
        <TouchableOpacity style={styles.menuItem}>
          <FontAwesome name="flag" size={12} color="#5A7582" style={{ marginRight: 10 }} />
          <Text type="regular" style={{ color: '#5A7582' }}>
            Report
          </Text>
        </TouchableOpacity>
        {parentType !== 'story' && (
          <TouchableOpacity style={{ ...styles.menuItem, marginTop: 10 }}>
            <FontAwesome name="comment" size={12} color="#5A7582" style={{ marginRight: 10 }} />
            <Text type="regular" style={{ color: '#5A7582' }}>
              Comment
            </Text>
          </TouchableOpacity>
        )}
      </Menu>
    </TouchableOpacity>
  );
};

BoxMenu.propTypes = {
  parentType: PropTYpes.string.isRequired
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center'
  }
});

export default BoxMenu;
