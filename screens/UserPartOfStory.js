import * as React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import PropTypes from 'prop-types';
import { Appbar, Paragraph, Title, Button, Surface } from 'react-native-paper';
import Text from '../components/CustomText';

const StorySingleMeta = ({ label, value }) => (
  <View style={{ alignSelf: 'flex-start', marginLeft: 15 }}>
    <Paragraph>
      <Text type="bold" style={{ color: 'white' }}>
        {label}:{'  '}
      </Text>
      <Text type="medium" style={{ color: 'white' }}>
        {value}
      </Text>
    </Paragraph>
  </View>
);
StorySingleMeta.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

const UserPartOfStory = () => {
  return (
    <SafeAreaView style={{ backgroundColor: '#eeeeee', flex: 1 }}>
      <Appbar.Header
        style={{
          backgroundColor: '#23c2c2',
          flexDirection: 'column',
          height: 300
        }}>
        <Title style={{ color: 'white' }}>ScriptoRerum</Title>
        <Title style={{ color: 'white' }}>Alphons, The Barber</Title>

        <StorySingleMeta label="Genre" value="Romance" />
        <StorySingleMeta label="Status" value="In Progress" />
        <StorySingleMeta label="Master Author" value="Anonymous 1" />
        <StorySingleMeta label="Intro Maximunm Words" value="50" />
        <StorySingleMeta label="Ending Maximunm Words" value="50" />
        <StorySingleMeta label="Words per Round" value="100 max" />
        <StorySingleMeta label="Co-Authors" value="7/11" />

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'stretch',
            marginHorizontal: '5%',
            justifyContent: 'space-around',
            marginTop: 10
          }}>
          <Surface style={styles.surface}>
            <Button mode="contained" uppercase={false} style={{ backgroundColor: '#f44336' }}>
              Leave Story
            </Button>
          </Surface>

          <Surface style={styles.surface}>
            <Button mode="text" icon="arrow-left" color="#5a7582" uppercase={false}>
              Go Back
            </Button>
          </Surface>
        </View>
      </Appbar.Header>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  surface: {
    borderRadius: 5,
    elevation: 10
  }
});

export default UserPartOfStory;
