import React, { JSX } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import LayoutScreen from '../(tabs)/LayoutScreen';
import ExploreScreen from '../(tabs)/ExploreScreen';
import IndexScreen from '../(tabs)/IndexScreen';

export type TabParamList = {
  Layout: undefined;
  Explore: undefined;
  Index: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator(): JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2E8B57', // Cor verde frutal
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Layout"
        component={LayoutScreen}
        options={{
          title: 'Layout',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          title: 'Explorar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Index"
        component={IndexScreen}
        options={{
          title: 'Índice',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}