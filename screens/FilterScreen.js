import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../components/CustomText';

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
    marginLeft: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#03A2A2',
    height: 33,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontSize: 14
  }
});

const FilterScreen = () => {
  const [tagData, setTagData] = useState({
    status: {
      allSelected: false,
      tags: [
        { selected: false, label: 'In Progress' },
        { selected: false, label: 'Waiting for players' },
        { selected: false, label: 'Completed' },
        { selected: false, label: 'Started by me' }
      ]
    },
    genres: {
      allSelected: false,
      tags: [
        { selected: false, label: 'Mystery' },
        { selected: false, label: 'Action' },
        { selected: false, label: 'Thriller' },
        { selected: false, label: 'Scifi' },
        { selected: false, label: 'Romance' },
        { selected: false, label: 'Essay' },
        { selected: false, label: 'Bedtime Stories' }
      ]
    }
  });

  const validCategoryNames = ['status', 'genres'];

  const onSelect = (category, currentTag) => {
    if (!validCategoryNames.includes(category)) {
      // eslint-disable-next-line no-console
      console.warn('You have to pass proper category names like: [status,genres]');
    }

    const newTag = currentTag;
    newTag.selected = !currentTag.selected;
    const tagIndex = tagData[category].tags.findIndex(tag => tag.label === currentTag.label);
    setTagData({
      ...tagData,
      [category]: {
        ...tagData[category],
        tags: [
          ...tagData[category].tags.slice(0, tagIndex),
          newTag,
          ...tagData[category].tags.slice(tagIndex + 1)
        ]
      }
    });
  };

  const toggleSelectAll = category => {
    const { allSelected } = tagData[category];

    const newTagData = tagData[category].tags.map(tag => {
      return {
        ...tag,
        selected: !allSelected
      };
    });
    setTagData({
      ...tagData,
      [category]: {
        allSelected: !allSelected,
        tags: [...newTagData]
      }
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.filterCategory}>STATUS</Text>
          <TouchableOpacity onPress={() => toggleSelectAll('status')}>
            <Text style={{ fontSize: 14, color: '#03A2A2' }}>
              {tagData.status.allSelected ? 'Clear All' : 'Select All'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
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
              {tagData.genres.allSelected ? 'Clear All' : 'Select All'}
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
        </View>
      </View>
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 10
  },
  filterCategory: {
    color: '#898989',
    fontSize: 18
  }
});
