// src/navigation/AppNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import jobsScreen from '../screens/jobsScreen';
import bookmarksScreen from '../screens/bookmarksScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Jobs" component={jobsScreen} />
        <Tab.Screen name="Bookmarks" component={bookmarksScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
