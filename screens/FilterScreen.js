import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import Text from '../components/CustomText';
import { SCREEN_WIDTH } from '../utils/dimensions';

const FilterTag = ({ label, selected, onSelect }) => {
  const backgroundStyle = selected
    ? { backgroundColor: '#03A2A2' }
    : { backgroundColor: '#C8CCCD' };

  const textStyle = selected ? { color: '#fff' } : { color: '#5A7582' };

  return (
    <TouchableOpacity onPress={onSelect}>
      <View style={{ ...tagStyle.container, ...backgroundStyle }}>
        <Text type="bold" style={{ ...tagStyle.text, ...textStyle }}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

FilterTag.propTypes = {
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
};

const tagStyle = StyleSheet.create({
  container: {
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
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 20 }}>
        <AntDesign style={{ fontSize: 20 }} color="#03A2A2" name="arrowleft" />
      </TouchableOpacity>
    ),
    headerTitleAlign: 'center',
    title: 'Filter',
    headerRight: () => (
      <TouchableOpacity onPress={() => reset()} style={{ marginRight: 20 }}>
        <Text style={{ color: '#03A2A2', fontSize: 18 }}>Reset</Text>
      </TouchableOpacity>
    )
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
    setTagData({
      ...tagData,
      [chosenCategory]: {
        allSelected: areAllSelectedIn(chosenCategory),
        tags: [...tags.slice(0, tagIndex), newTag, ...tags.slice(tagIndex + 1)]
      }
    });
  };

  useEffect(() => {
    // check data to see if all are unselected in a specific category
    // if so reset to default selected
    const tagCategories = Object.keys(tagData);
    tagCategories.forEach(category => {
      const allNotSelectedInCategory =
        tagData[category].tags.filter(tag => !tag.selected).length ===
        tagData[category].tags.length;
      if (allNotSelectedInCategory) {
        setTagData({
          ...tagData,
          [category]: { ...tagData[category], tags: [...defaultTagData[category].tags] }
        });
      }
    });
  }, [tagData]);

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
