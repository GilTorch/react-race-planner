import React from 'react';
import { View, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useFocusEffect } from '@react-navigation/native';

import { connect, useSelector } from 'react-redux';
import Text from '../components/CustomText';
import { SCREEN_WIDTH } from '../utils/dimensions';
import { setHomeFiltersAction } from '../redux/actions/HomeActions';
import { setWritingFiltersAction } from '../redux/actions/WritingActions';
import { setLibraryFiltersAction } from '../redux/actions/LibraryActions';

const FilterScreen = ({
  navigation,
  route,
  setHomeFilters,
  setLibraryFilters,
  setWritingFilters
}) => {
  const { previousScreen } = route.params;

  const defaultTagData = {
    status: {
      allSelected: false,
      tags: [
        { selected: true, label: 'In Progress', slug: 'in_progress' },
        { selected: false, label: 'Waiting for players', slug: 'waiting_for_authors' },
        { selected: false, label: 'Completed', slug: 'completed' },
        { selected: false, label: 'Include me', slug: 'include_self' }
      ]
    },
    genres: {
      allSelected: true,
      tags: [
        { selected: true, label: 'Mystery', slug: 'mystery' },
        { selected: true, label: 'Action', slug: 'action' },
        { selected: true, label: 'Thriller', slug: 'thriller' },
        { selected: true, label: 'Scifi', slug: 'scifi' },
        { selected: true, label: 'Romance', slug: 'romance' },
        { selected: true, label: 'Essay', slug: 'essay' },
        { selected: true, label: 'Bedtime Stories', slug: 'bedtime_stories' }
      ]
    },
    authorsRange: [5, 20]
  };

  const tagDataHome = useSelector(state => state.home.filters);
  const tagDataLibrary = useSelector(state => state.library.filters);
  const tagDataWriting = useSelector(state => state.writing.filters);

  let tagData = defaultTagData;

  switch (previousScreen) {
    case 'home':
      tagData = tagDataHome;
      break;
    case 'library':
      tagData = tagDataLibrary;
      break;
    case 'writing':
      tagData = tagDataWriting;
      break;
    default:
      tagData = tagDataHome;
      break;
  }

  const setTagData = data => {
    switch (previousScreen) {
      case 'home':
        return setHomeFilters(data);
      case 'library':
        return setLibraryFilters(data);
      case 'writing':
        return setWritingFilters(data);
      default:
        return setHomeFilters(data);
    }
  };

  const multiSliderValuesChange = values => {
    setTagData({ ...tagData, authorsRange: values });
  };

  const reset = () => {
    setTagData(defaultTagData);
  };

  const doneBtn = (
    <TouchableOpacity testID="done" onPress={() => navigation.goBack()} style={{ marginLeft: 20 }}>
      <Text style={{ color: '#03A2A2', fontSize: 18 }}>Done</Text>
    </TouchableOpacity>
  );

  const resetBtn = (
    <TouchableOpacity testID="reset" onPress={() => reset()} style={{ marginRight: 20 }}>
      <Text style={{ color: '#03A2A2', fontSize: 18 }}>Reset</Text>
    </TouchableOpacity>
  );

  navigation.setOptions({
    headerLeft: () => doneBtn,
    headerTitleAlign: 'center',
    title: 'Filter',
    headerRight: () => resetBtn
  });

  const validCategoryNames = ['status', 'genres'];

  const onSelect = (category, currentTag) => {
    let chosenCategory = category;
    if (!validCategoryNames.includes(category)) {
      chosenCategory = 'status';
    }
    const { tags } = tagData[chosenCategory];
    const newTag = currentTag;

    newTag.selected = !currentTag.selected;
    const tagIndex = tags.findIndex(tag => tag.label === currentTag.label);

    const allNotSelectedInCategory = tags.filter(tag => !tag.selected).length === tags.length;

    if (allNotSelectedInCategory && !newTag.selected) {
      newTag.selected = true;
    }

    setTagData({
      ...tagData,
      [chosenCategory]: {
        allSelected: areAllSelectedIn(chosenCategory),
        tags: [...tags.slice(0, tagIndex), newTag, ...tags.slice(tagIndex + 1)]
      }
    });
  };

  const toggleSelectAll = chosenCategory => {
    const { allSelected, tags } = tagData[chosenCategory];

    const newTagData = tags.map(tag => {
      return {
        ...tag,
        selected: !allSelected
      };
    });
    setTagData({
      ...tagData,
      [chosenCategory]: {
        allSelected: !allSelected,
        tags: [...newTagData]
      }
    });
  };

  const areAllSelectedIn = category => {
    const { tags } = tagData[category];
    const selectedTags = tags.filter(tag => tag.selected);
    return selectedTags.length === tags.length;
  };

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');
    }, [])
  );

  const filterSelector = ['select-all-part-one', 'clear-all-part-one'];
  let selector = [];
  if (!tagData.status.allSelected) {
    selector.push(filterSelector[0]);
  } else if (tagData.status.allSelected) {
    selector = [];
    selector.push(filterSelector[1]);
  }

  const filterSelector2 = ['select-all-part-two', 'clear-all-part-two'];
  let selector2 = [];
  if (!tagData.genres.allSelected) {
    selector2.push(filterSelector2[0]);
  } else {
    selector2 = [];
    selector2.push(filterSelector2[1]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerWrapper}>
        <View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
            <Text style={styles.filterCategory}>STATUS</Text>
            <TouchableOpacity testID={selector.join('')} onPress={() => toggleSelectAll('status')}>
              <Text style={{ fontSize: 14, color: '#03A2A2' }}>
                {tagData.status.allSelected ? 'Clear All' : 'Select All'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20, flexDirection: 'row', flexWrap: 'wrap' }}>
            {tagData.status.tags.map(tag => {
              const backgroundStyle = tag.selected
                ? { backgroundColor: '#03A2A2' }
                : { backgroundColor: '#C8CCCD' };

              const textStyle = tag.selected ? { color: '#fff' } : { color: '#5A7582' };

              return (
                <TouchableOpacity
                  testID="selected-status"
                  key={Math.random()}
                  onPress={() => onSelect('status', tag)}>
                  <View
                    testID="statuses"
                    style={{ ...styles.tagStyleContainer, ...backgroundStyle }}>
                    <Text type="bold" style={{ ...styles.text, ...textStyle }}>
                      {tag.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
            <Text style={styles.filterCategory}>GENRES</Text>
            <TouchableOpacity testID={selector2.join('')} onPress={() => toggleSelectAll('genres')}>
              <Text style={{ fontSize: 14, color: '#03A2A2' }}>
                {tagData.genres.allSelected ? 'Clear All' : 'Select All'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20, flexDirection: 'row', flexWrap: 'wrap' }}>
            {tagData.genres.tags.map(tag => {
              const backgroundStyle = tag.selected
                ? { backgroundColor: '#03A2A2' }
                : { backgroundColor: '#C8CCCD' };

              const textStyle = tag.selected ? { color: '#fff' } : { color: '#5A7582' };

              return (
                <TouchableOpacity
                  testID="selected-genres"
                  key={Math.random()}
                  onPress={() => onSelect('genres', tag)}>
                  <View testID="genres" style={{ ...styles.tagStyleContainer, ...backgroundStyle }}>
                    <Text type="bold" style={{ ...styles.text, ...textStyle }}>
                      {tag.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.filterCategory}>AUTHORS</Text>
            <View
              style={{
                width: '100%',
                marginTop: 15,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
              <Text style={{ fontSize: 14, color: '#5A7582' }}>{tagData.authorsRange[0]}</Text>
              <Text style={{ fontSize: 14, color: '#5A7582' }}>{tagData.authorsRange[1]}</Text>
            </View>
            <MultiSlider
              trackStyle={{
                backgroundColor: '#C8CCCD',
                height: 10,
                borderRadius: 5,
                justifyContent: 'center'
              }}
              selectedStyle={{
                backgroundColor: '#03A2A2',
                borderRadius: 0
              }}
              markerOffsetY={5}
              customMarker={() => (
                <View
                  testID="authors-slider"
                  style={{
                    width: 25,
                    height: 25,
                    backgroundColor: 'white',
                    borderWidth: 2,
                    borderRadius: 50,
                    marginTop: 0,
                    borderColor: '#03A2A2'
                  }}
                />
              )}
              values={[tagData.authorsRange[0], tagData.authorsRange[1]]}
              sliderLength={SCREEN_WIDTH - 50}
              onValuesChange={multiSliderValuesChange}
              min={0}
              max={100}
              step={1}
              allowOverlap
              snapped
            />
            <View>
              <Text style={{ color: '#5A7582' }}>
                Authors range: {tagData.authorsRange[0]} - {tagData.authorsRange[1]}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const mapDispatchToProps = {
  setHomeFilters: setHomeFiltersAction,
  setLibraryFilters: setLibraryFiltersAction,
  setWritingFilters: setWritingFiltersAction
};

export default connect(null, mapDispatchToProps)(FilterScreen);

FilterScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      previousScreen: PropTypes.string.isRequired
    })
  }).isRequired,
  setHomeFilters: PropTypes.func.isRequired,
  setWritingFilters: PropTypes.func.isRequired,
  setLibraryFilters: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  innerWrapper: {
    width: SCREEN_WIDTH - 50
  },
  filterCategory: {
    color: '#898989',
    fontSize: 18
  },
  tagStyleContainer: {
    marginRight: 10,
    marginBottom: 15,
    padding: 5,
    borderRadius: 4,
    backgroundColor: '#03A2A2',
    // height: 33,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontSize: 14
  }
});
