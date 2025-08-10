import { usePathname } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { tabBarConfig } from './tabBarConfig';
import TabBarItem from './TabBarItem';

export default function CustomTabBar() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  
  // Déterminer l'onglet actif basé sur le pathname
  const activeTab = pathname.split('/')[1] || 'index';
  
  return (
    <View 
      className="absolute bottom-0 left-0 right-0 bg-white border-t border-neutral-200 rounded-md"
      style={{
        paddingBottom: Platform.OS === 'ios' ? insets.bottom : 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 20,
      }}
    >
      <View className="flex-row justify-around items-center py-2">
        {tabBarConfig.map((tab) => (
          <TabBarItem
            key={tab.name}
            tab={tab}
            isActive={activeTab === tab.name || (activeTab === 'index' && tab.name === '')}
          />
        ))}
      </View>
    </View>
  );
}