/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Surface, TextInput, ActivityIndicator } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, View, StyleSheet, StatusBar, SafeAreaView, Platform } from 'react-native';
import Toast from 'react-native-root-toast';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { Dropdown } from 'react-native-material-dropdown';
import TimePicker from 'react-native-24h-timepicker';
import { useForm } from 'react-hook-form';
import { useSelector, connect } from 'react-redux';

import Text from '../components/CustomText';
import { genres } from '../utils/data';
import { newStorySchema } from '../utils/validators';
import { createStoryAction } from '../redux/actions/StoryAction';

const NewStoryScreen = ({ navigation, route, createStory }) => {
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setHidden(false);
      StatusBar.setBarStyle('dark-content');

      navigation.setOptions({
        headerShown: false
      });
    }, [])
  );

  const user = useSelector(state => state.auth.currentUser);
  // const types = useSelector(state => state.storyType);
  const loading = useSelector(state => state.home.createStoryLoading);

  const listAuthordata = [
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 7 },
    { value: 8 },
    { value: 9 },
    { value: 10 }
  ];
  const privacyData = [
    { value: 'username', label: 'Username' },
    { value: 'username_and_full_name', label: 'Username and Full Name' },
    { value: 'anonymous', label: 'Anonymous' }
  ];
  const genresTitle = [];
  genres.map(genre => genresTitle.push({ value: genre.name }));

  const [time, setTime] = React.useState({
    introTimeLimitSeconds: '0:10',
    endingTimeLimitSeconds: '0:10',
    roundTimeLimitSeconds: '0:10',
    voteTimeLimitSeconds: '0:10'
  });
  const [selectedTime, setSelectedTime] = React.useState();
  let TimePickerRef = null;
  const preselectedGenre = route.params.genre;

  const { errors, handleSubmit, register, watch, setValue } = useForm({
    validationSchema: newStorySchema,
    defaultValues: {
      masterAuthor: user._id,
      type: '5ee2c8ff60b50e0e46e54c74', // TODO: get and send the typeId
      status: 'in_progress',
      isPinned: false,
      isActive: true,
      genre: preselectedGenre, // TODO: send the genreId instead
      settings: {
        introTimeLimitSeconds: 600,
        endingTimeLimitSeconds: 600,
        roundTimeLimitSeconds: 600,
        voteTimeLimitSeconds: 600,
        minimmum_participants: 2
      },
      privacyStatus: 'username'
    }
  });
  const storySettings = watch('settings');

  const onCancelTimePicker = () => {
    TimePickerRef.close();
  };

  const onConfirmTimePicker = (hour, minute) => {
    setTime({ ...time, [selectedTime]: `${hour}:${minute}` });
    setValue('settings', { ...storySettings, [selectedTime]: hour * 3600 + minute * 60 });
    TimePickerRef.close();
  };

  const submit = async data => {
    try {
      const story = await createStory(data);
      // navigation.navigate('StoryScreen', { storyId: story._id });
    } catch (e) {
      Toast.show(e.message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM
      });
    }
  };

  React.useEffect(() => {
    register('masterAuthor');
    register('type');
    register('status');
    register('isPinned');
    register('isActive');
    register('title');
    register('genre');
    register('settings');
    register('privacyStatus');
  }, [register]);

  return (
    <View style={styles.container}>
      <Surface
        style={{
          elevation: 3
        }}>
        <LinearGradient colors={['#03a2a2', '#23c2c2']} locations={[0.5, 1]}>
          <SafeAreaView
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginVertical: 12, marginLeft: 10 }}>
              <Text style={{ fontSize: 16, color: 'white' }}>Cancel</Text>
            </TouchableOpacity>

            <Text type="bold" style={{ color: 'white', fontSize: 18 }}>
              Start new story
            </Text>

            <TouchableOpacity onPress={handleSubmit(submit)}>
              {!loading && (
                <Text style={{ fontSize: 16, color: 'white', marginRight: 10 }}>Start</Text>
              )}

              {loading && (
                <ActivityIndicator
                  style={{ marginRight: 10 }}
                  color="#fff"
                  size={Platform.OS === 'android' ? 30 : 'small'}
                />
              )}
            </TouchableOpacity>
          </SafeAreaView>
        </LinearGradient>
      </Surface>
      <ScrollView contentContainerStyle={{ marginHorizontal: 20 }}>
        <Surface
          style={{
            elevation: 3,
            backgroundColor: 'white',
            marginTop: 20,
            padding: 15,
            paddingBottom: 40,
            flexDirection: 'column'
          }}>
          <Text style={{ fontSize: 18, color: '#03a2a2' }}>Title</Text>
          <TextInput
            style={[styles.input, errors.title && styles.errorInput]}
            onChangeText={text => setValue('title', text)}
            value={watch('title')}
          />
          {errors.title && (
            <Text style={{ fontSize: 12, marginTop: 3, color: 'red' }}>{errors.title.message}</Text>
          )}
        </Surface>
        <Surface
          style={{
            elevation: 3,
            backgroundColor: 'white',
            marginTop: 20,
            padding: 15,
            paddingBottom: 40,
            flexDirection: 'column'
          }}>
          <Text style={{ fontSize: 18, color: '#03a2a2' }}>Genre</Text>
          <Dropdown
            value={preselectedGenre}
            fontSize={16}
            dropdownPosition={0.5}
            data={genresTitle}
            onChangeText={text => setValue('genre', text)}
          />
        </Surface>
        <Surface
          style={{
            elevation: 3,
            backgroundColor: 'white',
            marginTop: 20,
            padding: 15,
            paddingBottom: 40,
            flexDirection: 'column'
          }}>
          <Text style={{ fontSize: 18, color: '#03a2a2' }}>Minimun amount of authors</Text>
          <Dropdown
            value={2}
            fontSize={16}
            dropdownPosition={0.5}
            data={listAuthordata}
            onChangeText={text =>
              setValue('settings', { ...storySettings, minimmum_participants: text })
            }
          />
        </Surface>
        <Surface
          style={{
            elevation: 3,
            backgroundColor: 'white',
            marginTop: 20,
            padding: 15,
            paddingBottom: 40,
            flexDirection: 'column'
          }}>
          <Text style={{ fontSize: 18, color: '#03a2a2' }}>Time for writting:</Text>
          <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ fontSize: 16 }}>Intro</Text>
              <TouchableOpacity
                onPress={() => {
                  TimePickerRef.open();
                  setSelectedTime('introTimeLimitSeconds');
                }}
                style={{
                  borderBottomWidth: 1,
                  borderColor: '#C8C7CC',
                  alignItems: 'center',
                  marginTop: 20,
                  width: 50
                }}>
                <Text>{time.introTimeLimitSeconds}</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ fontSize: 16 }}>Ending</Text>
              <TouchableOpacity
                onPress={() => {
                  TimePickerRef.open();
                  setSelectedTime('endingTimeLimitSeconds');
                }}
                style={{
                  borderBottomWidth: 1,
                  borderColor: '#C8C7CC',
                  alignItems: 'center',
                  marginTop: 20
                }}>
                <Text>{time.endingTimeLimitSeconds}</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ fontSize: 16 }}>Round</Text>
              <TouchableOpacity
                onPress={() => {
                  TimePickerRef.open();
                  setSelectedTime('roundTimeLimitSeconds');
                }}
                style={{
                  borderBottomWidth: 1,
                  borderColor: '#C8C7CC',
                  alignItems: 'center',
                  marginTop: 20
                }}>
                <Text>{time.roundTimeLimitSeconds}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Surface>
        <Surface
          style={{
            elevation: 3,
            backgroundColor: 'white',
            marginTop: 20,
            padding: 15,
            paddingBottom: 40,
            flexDirection: 'column'
          }}>
          <Text style={{ fontSize: 18, color: '#03a2a2' }}>Time for voting Intro/ Ending:</Text>
          <TouchableOpacity
            onPress={() => {
              TimePickerRef.open();
              setSelectedTime('voteTimeLimitSeconds');
            }}
            style={{
              borderBottomWidth: 1,
              borderColor: '#C8C7CC',
              marginTop: 20
            }}>
            <Text style={{ fontSize: 18 }}>{time.voteTimeLimitSeconds}</Text>
          </TouchableOpacity>
        </Surface>
        <Surface
          style={{
            elevation: 3,
            backgroundColor: 'white',
            marginTop: 20,
            marginBottom: 40,
            padding: 15,
            paddingBottom: 40,
            flexDirection: 'column'
          }}>
          <Text style={{ fontSize: 18, color: '#03a2a2' }}>Privacy Preference</Text>
          <Dropdown
            value="username"
            fontSize={16}
            dropdownPosition={0.5}
            data={privacyData}
            onChangeText={text => setValue('privacyStatus', text)}
          />
        </Surface>
      </ScrollView>
      <TimePicker
        hourUnit=" hr"
        minuteUnit=" mn"
        ref={ref => {
          TimePickerRef = ref;
        }}
        onCancel={onCancelTimePicker}
        onConfirm={(hour, minute) => onConfirmTimePicker(hour, minute)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
    marginTop: Platform.OS === 'android' ? Constants.statusBarHeight * 1.1 : 0
  },
  input: {
    height: 40,
    fontSize: 16,
    minWidth: 70,
    backgroundColor: 'white'
  },
  errorInput: {
    borderColor: 'red',
    borderBottomWidth: 1
  }
});

NewStoryScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  createStory: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  createStory: createStoryAction
};

export default connect(null, mapDispatchToProps)(NewStoryScreen);
