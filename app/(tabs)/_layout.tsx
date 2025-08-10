// import {
//   Feather,
//   Ionicons,
//   MaterialCommunityIcons
// } from "@expo/vector-icons";
// import { Tabs } from "expo-router";
// import { Platform, Text, View } from "react-native";


// type TabIconProps = {
//   focused: boolean;
//   icon: React.ReactNode;
//   title: string;
// };


// function TabIcon({ focused, icon, title }: TabIconProps) {
//   return (
//     <View className="items-center justify-center py-2">
//       <View className={`${focused ? 'scale-110' : 'scale-100'}`}>
//         {icon}
//       </View>
//       <Text 
//         className={`text-xs mt-1 ${
//           focused 
//             ? 'text-gray-900 font-semibold' 
//             : 'text-gray-500 font-normal'
//         }`}
//       >
//         {title}
//       </Text>
//     </View>
//   );
// }

// export default function TabsLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarShowLabel: false,
//         tabBarActiveTintColor: "#1F2937", 
//         tabBarInactiveTintColor: "#6B7280", 
//         tabBarStyle: {
//           backgroundColor: "#FFFFFF",
//           borderTopWidth: 1,
//           borderTopColor: "#F3F4F6",
//           height: Platform.OS === 'ios' ? 85 : 70,
//           paddingTop: 8,
//           paddingBottom: Platform.OS === 'ios' ? 25 : 10,
//           elevation: 0, 
//           shadowOpacity: 0, 
//           position: 'absolute',
//         },
//         headerStyle: {
//           backgroundColor: "#FFFFFF",
//           elevation: 0,
//           shadowOpacity: 0,
//           borderBottomWidth: 1,
//           borderBottomColor: "#F3F4F6",
//         },
//         headerTitleStyle: {
//           fontSize: 18,
//           fontWeight: '600',
//           color: "#1F2937",
//         },
//       }}
//     >
//       {/* Home Tab */}
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Accueil",
//           headerShown: true,
//           headerTitle: "Delivery Food",
//           tabBarIcon: ({ focused, color }) => (
//             <TabIcon 
//               focused={focused} 
//               icon={
//                 <Ionicons 
//                   name={focused ? "home" : "home-outline"} 
//                   size={24} 
//                   color={color} 
//                 />
//               } 
//               title="Home" 
//             />
//           ),
//         }}
//       />

//       {/* Order/Cart Tab */}
//       <Tabs.Screen
//         name="order"
//         options={{
//           title: "Commandes",
//           headerShown: true,
//           headerTitle: "Mes Commandes",
//           tabBarIcon: ({ focused, color }) => (
//             <TabIcon 
//               focused={focused} 
//               icon={
//                 <Ionicons 
//                   name={focused ? "receipt" : "receipt-outline"} 
//                   size={24} 
//                   color={color} 
//                 />
//               } 
//               title="Order" 
//             />
//           ),
//         }}
//       />

//       {/* Offers Tab */}
//       <Tabs.Screen
//         name="offers"
//         options={{
//           title: "Offres",
//           headerShown: true,
//           headerTitle: "Offres Spéciales",
//           tabBarIcon: ({ focused, color }) => (
//             <TabIcon 
//               focused={focused} 
//               icon={
//                 <MaterialCommunityIcons 
//                   name={focused ? "sale" : "tag-outline"} 
//                   size={24} 
//                   color={color} 
//                 />
//               } 
//               title="Offer" 
//             />
//           ),
//         }}
//       />

//       {/* Cart Tab */}
//       <Tabs.Screen
//         name="cart"
//         options={{
//           title: "Panier",
//           headerShown: true,
//           headerTitle: "Mon Panier",
//           tabBarIcon: ({ focused, color }) => (
//             <View className="relative">
//               <TabIcon 
//                 focused={focused} 
//                 icon={
//                   <Ionicons 
//                     name={focused ? "cart" : "cart-outline"} 
//                     size={24} 
//                     color={color} 
//                   />
//                 } 
//                 title="Chart" 
//               />
//               {/* Badge pour le nombre d'articles */}
//               <View className="absolute -top-1 -right-2 bg-red-500 rounded-full min-w-[18px] h-[18px] items-center justify-center">
//                 <Text className="text-white text-xs font-bold">3</Text>
//               </View>
//             </View>
//           ),
//         }}
//       />

//       {/* Profile Tab */}
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: "Profil",
//           headerShown: true,
//           headerTitle: "Mon Profil",
//           tabBarIcon: ({ focused, color }) => (
//             <TabIcon 
//               focused={focused} 
//               icon={
//                 <Feather 
//                   name="user" 
//                   size={24} 
//                   color={color} 
//                 />
//               } 
//               title="Profile" 
//             />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }


import { Slot } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomTabBar from '../../components/navigation/CustomTabBar';

export default function TabsLayout() {
  return (
    <SafeAreaView className="flex-1 bg-transparent">
      {/* Contenu de la page active */}
      <View className="flex-1">
        <Slot />
      </View>
      
      {/* Custom TabBar */}
      <CustomTabBar />
    </SafeAreaView>
  );
}