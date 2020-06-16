import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Menu } from 'react-native-paper';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';

import Text from './CustomText';
import { ReportModal } from './modals';

const CommentMenu = ({ comment }) => {
  const [showMenu, setshowMenu] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const showReportModal = () => {
    setshowMenu(false);
    setShowReport(true);
  };

  const dismissReport = () => setShowReport(false);

  return (
    <>
      <ReportModal
        visible={showReport}
        parentType="comment"
        parent={comment}
        onDismiss={dismissReport}
      />

      <TouchableOpacity testID="three-dot-menu-button" onPress={() => setshowMenu(true)}>
        <Menu
          contentStyle={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            elevation: 3
          }}
          visible={showMenu}
          anchor={<Feather name="more-vertical" size={18} color="#5A7582" />}
          onDismiss={() => setshowMenu(false)}>
          <TouchableOpacity onPress={showReportModal} style={styles.menuItem}>
            <FontAwesome name="flag" size={16} color="#F44336" style={{ marginRight: 10 }} />
            <Text type="regular" style={{ color: '#5A7582' }}>
              Report
            </Text>
          </TouchableOpacity>
        </Menu>
      </TouchableOpacity>
    </>
  );
};

CommentMenu.propTypes = {
  comment: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 20,
    alignItems: 'center'
  }
});

export default CommentMenu;
