import * as React from 'react';
import { StyleSheet, ScrollView, SafeAreaView, View } from 'react-native';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons, FontAwesome, Feather } from '@expo/vector-icons';
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

        <View style={styles.headerBtn}>
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
        <Title style={{ ...styles.title, marginBottom: 0 }}>All Proposed Intros (5)</Title>
        <ScrollView horizontal style={{ flex: 1 }} contentContainerStyle={{ height: 380 }}>
          <Surface style={styles.intros}>
            <View style={styles.boxHeader}>
              <Text style={styles.subTitle}>By Anonymous 8</Text>
              <Feather name="more-vertical" size={18} color="#5A7582" />
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
              <Text style={styles.separator}>----</Text>
              <View style={styles.displayRow}>
                <FontAwesome name="star" size={20} color="#ed8a18" />
                <Text style={{ marginLeft: 10 }}>Elected Intro</Text>
              </View>
              <View style={styles.displayRow}>
                <MaterialCommunityIcons name="vote" size={20} color="#911414" />
                <Text style={{ marginLeft: 10 }}>Votes: 6/8</Text>
              </View>
              <View style={styles.displayRow}>
                <FontAwesome name="commenting" size={20} color="#0277BD" />
                <Text style={{ marginLeft: 10 }}>Comments: 8</Text>
              </View>
            </View>
          </Surface>
          <Surface style={styles.intros}>
            <View style={styles.boxHeader}>
              <Text style={styles.subTitle}>By Anonymous 8</Text>
              <Feather name="more-vertical" size={18} color="#5A7582" />
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
              <Text style={styles.separator}>----</Text>
              <View style={styles.displayRow}>
                <FontAwesome name="star" size={20} color="#ed8a18" />
                <Text style={{ marginLeft: 10 }}>Elected Intro</Text>
              </View>
              <View style={styles.displayRow}>
                <MaterialCommunityIcons name="vote" size={20} color="#911414" />
                <Text style={{ marginLeft: 10 }}>Votes: 6/8</Text>
              </View>
              <View style={styles.displayRow}>
                <FontAwesome name="commenting" size={20} color="#0277BD" />
                <Text style={{ marginLeft: 10 }}>Comments: 8</Text>
              </View>
            </View>
          </Surface>
        </ScrollView>

        <Surface style={styles.smallAdvertisement}>
          <View style={{ alignItems: 'center' }}>
            <Title style={{ color: '#5A7582' }}>344 X 71</Title>
            <Title style={{ color: '#5A7582' }}>Advertisement Here</Title>
          </View>
        </Surface>
        <Title style={styles.title}>Round 1/8</Title>
        <Surface style={styles.round}>
          <View style={styles.boxHeader}>
            <Text style={styles.subTitle}>By Anonymous 8</Text>
            <Feather name="more-vertical" size={18} color="#5A7582" />
          </View>
          <Paragraph>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea. At vero eos
            et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea. At vero
            eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea.
          </Paragraph>
          <View style={{ marginTop: 'auto' }}>
            <Text style={styles.separator}>----</Text>
            <View style={styles.displayRow}>
              <FontAwesome name="commenting" size={20} color="#0277BD" />
              <Text style={{ marginLeft: 10 }}>Comments: 3</Text>
            </View>
          </View>
        </Surface>
        <Title style={styles.title}>Round 2/8</Title>
        <Surface style={styles.round}>
          <View style={styles.boxHeader}>
            <Text style={styles.subTitle}>By Anonymous 2</Text>
            <Feather name="more-vertical" size={18} color="#5A7582" />
          </View>
          <Paragraph>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea. At vero eos
            et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea. At vero
            eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea.
          </Paragraph>
          <View style={{ marginTop: 'auto' }}>
            <Text style={styles.separator}>----</Text>
            <View style={styles.displayRow}>
              <FontAwesome name="commenting" size={20} color="#0277BD" />
              <Text style={{ marginLeft: 10 }}>Comments: 0</Text>
            </View>
          </View>
        </Surface>
        <Title style={styles.title}>Round 3/8 (Your Turn)</Title>
        <Text style={{ color: '#ED8A18', marginLeft: 40, marginBottom: 15 }}>
          45 minutes and 33 seconds left
        </Text>
        <Surface style={styles.round}>
          <View style={styles.boxHeader}>
            <Text style={styles.subTitle}>By You</Text>
            <Feather name="more-vertical" size={18} color="#5A7582" />
          </View>
          <Paragraph>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          </Paragraph>
          <View style={{ marginTop: 'auto' }}>
            <Text style={styles.subTitle}>24/50 words</Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10
              }}>
              <Surface style={{ ...styles.surface, marginRight: 20 }}>
                <Button mode="contained" uppercase={false} style={{ backgroundColor: '#ED8A18' }}>
                  Skip Turn
                </Button>
              </Surface>

              <Surface style={styles.surface}>
                <Button mode="contained" style={{ backgroundColor: '#f44336' }} uppercase={false}>
                  Leave Story
                </Button>
              </Surface>
            </View>
          </View>
        </Surface>
        <Surface
          style={{
            height: 344,
            backgroundColor: '#fff',
            elevation: 5,
            marginHorizontal: 20,
            marginTop: 20,
            padding: 2
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%'
            }}>
            <Title style={{ color: '#5A7582' }}>344 X 344</Title>
            <Title style={{ color: '#5A7582' }}>Advertisement Here</Title>
          </View>
        </Surface>
        <Title style={styles.title}>Round 4/8</Title>
        <Surface style={styles.penddingRound}>
          <View style={styles.boxHeader}>
            <Text style={styles.subTitle}>By Anonymous 4</Text>
            <Feather name="more-vertical" size={18} color="#5A7582" />
          </View>
          <Text style={{ color: '#ED8A18', marginBottom: 20, marginTop: 10 }}>Pendding</Text>
        </Surface>
        <Title style={styles.title}>Round 5/8</Title>
        <Surface style={styles.penddingRound}>
          <View style={styles.boxHeader}>
            <Text style={styles.subTitle}>By Anonymous 5</Text>
            <Feather name="more-vertical" size={18} color="#5A7582" />
          </View>
          <Text style={{ color: '#ED8A18', marginBottom: 20, marginTop: 10 }}>Pendding</Text>
        </Surface>
        <Title style={styles.title}>Round 6/8</Title>
        <Surface style={styles.penddingRound}>
          <View style={styles.boxHeader}>
            <Text style={styles.subTitle}>By Anonymous 6</Text>
            <Feather name="more-vertical" size={18} color="#5A7582" />
          </View>
          <Text style={{ color: '#ED8A18', marginBottom: 20, marginTop: 10 }}>Pendding</Text>
        </Surface>
        <Surface style={{ ...styles.smallAdvertisement, marginTop: 20 }}>
          <View style={{ alignItems: 'center' }}>
            <Title style={{ color: '#5A7582' }}>344 X 71</Title>
            <Title style={{ color: '#5A7582' }}>Advertisement Here</Title>
          </View>
        </Surface>
        <Title style={styles.title}>Round 7/8</Title>
        <Surface style={styles.penddingRound}>
          <View style={styles.boxHeader}>
            <Text style={styles.subTitle}>By Anonymous 7</Text>
            <Feather name="more-vertical" size={18} color="#5A7582" />
          </View>
          <Text style={{ color: '#ED8A18', marginBottom: 20, marginTop: 10 }}>Pendding</Text>
        </Surface>
        <Title style={styles.title}>Round 8/8</Title>
        <Surface style={styles.penddingRound}>
          <View style={styles.boxHeader}>
            <Text style={styles.subTitle}>By Anonymous 8</Text>
            <Feather name="more-vertical" size={18} color="#5A7582" />
          </View>
          <Text style={{ color: '#ED8A18', marginBottom: 20, marginTop: 10 }}>Pendding</Text>
        </Surface>
        <Title style={styles.title}>All Proposed Endings</Title>
        <Text style={{ color: '#ED8A18', marginLeft: 20, marginBottom: 20 }}>Pendding</Text>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  headerBtn: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginHorizontal: '5%',
    justifyContent: 'space-around',
    marginTop: 10
  },
  surface: {
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 5
  },
  intros: {
    height: 340,
    width: 330,
    elevation: 5,
    marginVertical: 20,
    marginLeft: 20,
    padding: 10
  },
  boxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    color: '#5a7582',
    marginLeft: 20,
    marginVertical: 20
  },
  subTitle: {
    fontWeight: 'bold',
    color: '#5A7582'
  },
  separator: {
    fontSize: 20
  },
  displayRow: {
    flexDirection: 'row'
  },
  smallAdvertisement: {
    height: 71,
    backgroundColor: '#fff',
    elevation: 5,
    marginHorizontal: 20,
    padding: 2
  },
  round: {
    height: 295,
    width: 330,
    backgroundColor: '#fff',
    elevation: 5,
    alignSelf: 'center',
    padding: 15
  },
  penddingRound: {
    width: 330,
    backgroundColor: '#fff',
    elevation: 5,
    alignSelf: 'center',
    padding: 15
  }
});

export default UserPartOfStory;
