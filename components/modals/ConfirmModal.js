import React from 'react';
import { View } from 'react-native';
import { Modal, Portal, Button } from 'react-native-paper';
import PropTypes from 'prop-types';

import Text from '../CustomText';

const ConfirmModal = ({
  visible,
  dismiss,
  onOkPressed,
  title,
  subtitle,
  okLabel,
  okBtnStyle,
  cancelLabel,
  cancelBtnStyle,
}) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        dismissable={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.titleContainer}>
          <Text type="bold" style={styles.title}>
            {title}
          </Text>
        </View>
        <Text type="bold" style={styles.subtitle}>
          {subtitle}
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            style={[styles.button, { marginLeft: 10, ...okBtnStyle }]}
            color="white"
            uppercase={false}
            onPress={() => {
              dismiss();
              onOkPressed();
            }}>
            {okLabel}
          </Button>
          <Button
            style={[styles.button, { marginRight: 10, ...cancelBtnStyle }]}
            color="white"
            uppercase={false}
            onPress={dismiss}>
            {cancelLabel}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = {
  contentContainerStyle: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 6,
    alignItems: 'center',
  },
  titleContainer: {
    height: 35,
    marginVertical: 15,
  },
  title: {
    fontSize: 30,
    color: '#5A7582',
  },
  subtitle: {
    color: '#5A7582',
    paddingTop: 5,
  },
  buttonContainer: {
    marginVertical: 20,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#03A2A2',
    borderRadius: 5,
    width: 140,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
};

ConfirmModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  dismiss: PropTypes.func.isRequired,
  onOkPressed: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  okLabel: PropTypes.string.isRequired,
  okBtnStyle: PropTypes.object.isRequired,
  cancelLabel: PropTypes.string.isRequired,
  cancelBtnStyle: PropTypes.object,
};

ConfirmModal.defaultProps = {
  cancelBtnStyle: {},
};

export default ConfirmModal;
