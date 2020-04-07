import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import PropTypes from 'prop-types';
import Text from './CustomText';
import { SCREEN_HEIGHT } from '../utils/dimensions';

const CommentModal = ({ visible, dismiss }) => {
  return (
    <Portal>
      <Modal visible={visible}>
        <View
          style={{
            backgroundColor: 'white',
            margin: 20,
            borderRadius: 6,
            height: SCREEN_HEIGHT - 400
          }}>
          <View
            style={{
              borderRadius: 6,
              shadowColor: '#000'
            }}>
            <View
              style={{
                height: 35,
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10
              }}>
              <Text type="bold" style={{ fontSize: 30, color: '#5A7582' }}>
                Vote For This Intro
              </Text>
            </View>
            <View style={{ paddingLeft: 20, marginTop: 20, flexDirection: 'row' }}>
              <Text style={styles.label}>Author: </Text>
              <Text type="bold" style={styles.label}>
                Anonymous 8
              </Text>
            </View>
            <View style={{ marginLeft: 20, marginTop: 10 }}>
              <Text style={styles.label}>Content:</Text>
            </View>
            <View style={{ marginTop: 10, paddingLeft: 20, paddingRight: 20 }}>
              <Text style={styles.text}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea.
                At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                no sea. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
                gubergren, no sea.
              </Text>
            </View>
            <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
              <Text type="bold" style={styles.label}>
                Are you sure you want to vote for this beginning of the story?
              </Text>
            </View>
            <View style={{ paddingLeft: 20, marginTop: 5 }}>
              <Text style={{ color: '#EC8918' }}>Vote ends in 34 minutes</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Vote</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={dismiss}
                style={{ ...styles.button, backgroundColor: '#F44336' }}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

CommentModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  dismiss: PropTypes.func.isRequired
};

const styles = {
  label: {
    fontSize: 18,
    color: '#5A7582'
  },
  text: {
    fontSize: 15,
    color: '#5A7582',
    textAlign: 'justify'
  },
  buttonContainer: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  button: {
    width: 120,
    backgroundColor: '#03A2A2',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  }
};

export default CommentModal;
