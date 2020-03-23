import * as React from 'react';
import { StyleSheet, ScrollView, SafeAreaView, View } from 'react-native';
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
          backgroundColor: '#1bbaba',
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
      <ScrollView>
        <Title style={{ color: '#5a7582', marginLeft: 20 }}>All Proposed Intros (5)</Title>
        <ScrollView horizontal style={{ flex: 1 }} contentContainerStyle={{ height: 380 }}>
          <Surface
            style={{
              height: 340,
              width: 330,
              backgroundColor: '#fff',
              elevation: 5,
              marginVertical: 20,
              marginLeft: 20,
              padding: 10
            }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold', color: '#5A7582' }}>By Anonymous 8</Text>
            </View>
            <Paragraph>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
              accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea. At vero
              eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea. At
              vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
              sea.
            </Paragraph>
            <View style={{ marginTop: 'auto' }}>
              <Text style={{ fontSize: 20 }}>----</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginLeft: 10 }}>Elected Intro</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginLeft: 10 }}>Votes: 6/8</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginLeft: 10 }}>Comments: 8</Text>
              </View>
            </View>
          </Surface>
          <Surface
            style={{
              height: 340,
              width: 330,
              backgroundColor: '#fff',
              elevation: 5,
              margin: 20,
              padding: 10
            }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: 'bold', color: '#5A7582' }}>By Anonymous 8</Text>
            </View>
            <Paragraph>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
              accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea. At vero
              eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea. At
              vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
              sea.
            </Paragraph>
            <View style={{ marginTop: 'auto' }}>
              <Text style={{ fontSize: 20 }}>----</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginLeft: 10 }}>Elected Intro</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginLeft: 10 }}>Votes: 6/8</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ marginLeft: 10 }}>Comments: 8</Text>
              </View>
            </View>
          </Surface>
        </ScrollView>
      </ScrollView>
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
