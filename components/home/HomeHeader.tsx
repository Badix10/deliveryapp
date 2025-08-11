import React, { useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { FilterOptions } from './FilterModal';
import FilterModal from './FilterModal';
import HeaderTitle from './HeaderTitle';
import LocationBar from './LocationBar';
import SearchSection from './SearchSection';

interface HomeHeaderProps {
  onFiltersApply?: (filters: FilterOptions) => void;
}

export default function HomeHeader({ onFiltersApply }: HomeHeaderProps) {
  const insets = useSafeAreaInsets();
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const handleFilterPress = () => {
    setFilterModalVisible(true);
  };

  const handleFilterClose = () => {
    setFilterModalVisible(false);
  };

  const handleFiltersApply = (filters: FilterOptions) => {
    console.log('Filters applied:', filters);
    onFiltersApply?.(filters);
  };

  return (
    <>
      <View 
        className="bg-neutral-900 rounded-b-3xl"
        style={{ paddingTop: insets.top }}
      >
        <LocationBar />
        <HeaderTitle />
        <SearchSection onFilterPress={handleFilterPress} />
      </View>

      <FilterModal
        visible={filterModalVisible}
        onClose={handleFilterClose}
        onApply={handleFiltersApply}
      />
    </>
  );
}