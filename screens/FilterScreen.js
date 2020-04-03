import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useFocusEffect } from '@react-navigation/native';

import Text from '../components/CustomText';
import { SCREEN_WIDTH } from '../utils/dimensions';
import FilterTag from '../components/FilterTag';
import FilterHeaderLeft from '../components/FilterHeaderLeft';
import FilterHeaderRight from '../components/FilterHeaderRight';

const FilterScreen = ({ navigation }) => {
  const defaultAuthorRange = [5, 20];
  const [multiSliderValue, setMultiSliderValue] = useState(defaultAuthorRange);

  const multiSliderValuesChange = values => setMultiSliderValue(values);

  const defaultTagData = {
    status: {
      allSelected: false,
      tags: [
        { selected: true, label: 'In Progress' },
        { selected: false, label: 'Waiting for players' },
        { selected: false, label: 'Completed' },
        { selected: false, label: 'Started by me' }
      ]
    },
    genres: {
      allSelected: false,
      tags: [
        { selected: true, label: 'Mystery' },
        { selected: false, label: 'Action' },
        { selected: false, label: 'Thriller' },
        { selected: false, label: 'Scifi' },
        { selected: false, label: 'Romance' },
        { selected: false, label: 'Essay' },
        { selected: false, label: 'Bedtime Stories' }
      ]
    }
  };

  const [tagData, setTagData] = useState(defaultTagData);

  const reset = () => {
    setMultiSliderValue(defaultAuthorRange);
    setTagData(defaultTagData);
  };

  navigation.setOptions({
    headerLeft: FilterHeaderLeft,
    headerTitleAlign: 'center',
    title: 'Filter',
    // eslint-disable-next-line react/no-multi-comp
    headerRight: () => <FilterHeaderRight onReset={() => reset()} />
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

  return (
    <View style={styles.container}>
      <View style={styles.innerWrapper}>
        <View>
          <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.filterCategory}>STATUS</Text>
            <TouchableOpacity onPress={() => toggleSelectAll('status')}>
              <Text style={{ fontSize: 14, color: '#03A2A2' }}>
                {!tagData.status.allSelected && 'Select All'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20, flexDirection: 'row', flexWrap: 'wrap' }}>
            {tagData.status.tags.map((tag, key) => (
              <FilterTag
                key={key.toString()}
                selected={tag.selected}
                onSelect={() => onSelect('status', tag)}
                label={tag.label}
              />
            ))}
          </View>
        </View>
        <View>
          <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.filterCategory}>GENRES</Text>
            <TouchableOpacity onPress={() => toggleSelectAll('genres')}>
              <Text style={{ fontSize: 14, color: '#03A2A2' }}>
                {!tagData.genres.allSelected && 'Select All'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20, flexDirection: 'row', flexWrap: 'wrap' }}>
            {tagData.genres.tags.map((tag, key) => (
              <FilterTag
                key={key.toString()}
                selected={tag.selected}
                onSelect={() => onSelect('genres', tag)}
                label={tag.label}
              />
            ))}
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
              <Text style={{ fontSize: 14, color: '#5A7582' }}>{multiSliderValue[0]}</Text>
              <Text style={{ fontSize: 14, color: '#5A7582' }}>{multiSliderValue[1]}</Text>
            </View>
            <MultiSlider
              trackStyle={{
                backgroundColor: '#C8CCCD',
                height: 10,
                borderRadius: 5
              }}
              selectedStyle={{
                backgroundColor: '#03A2A2',
                borderRadius: 0
              }}
              markerStyle={{
                width: 25,
                height: 25,
                marginTop: 6,
                backgroundColor: 'white',
                borderWidth: 2,
                borderColor: '#03A2A2'
              }}
              values={[multiSliderValue[0], multiSliderValue[1]]}
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
                Authors range: {multiSliderValue[0]} - {multiSliderValue[1]}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FilterScreen;

FilterScreen.propTypes = {
  navigation: PropTypes.object.isRequired
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
  }
});
