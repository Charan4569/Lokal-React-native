import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookmarksScreen = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const storedBookmarks = await AsyncStorage.getItem('bookmarks');
        setBookmarks(storedBookmarks ? JSON.parse(storedBookmarks) : []);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    };

    fetchBookmarks();
  }, []);

  const renderBookmark = ({ item }) => (
    <View style={{ padding: 16, backgroundColor: '#fff', marginBottom: 8, borderRadius: 8 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
      <Text>{item.location}</Text>
    </View>
  );

  return (
    <FlatList
      data={bookmarks}
      renderItem={renderBookmark}
      keyExtractor={(item, index) => item.id?.toString() || `fallback-${index}`}
    />
  );
};

export default BookmarksScreen;
