import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

const JobsScreen = ({ navigation }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchJobs = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);
      const newJobs = response.data.results;
      setJobs((prevJobs) => [...prevJobs, ...newJobs]);
      setPage((prevPage) => prevPage + 1);
      if (newJobs.length === 0) setHasMore(false); // No more jobs to fetch
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderJobCard = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('JobDetails', { job: item })}>
      <View style={{ padding: 16, backgroundColor: '#fff', marginBottom: 8, borderRadius: 8 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
        <Text>{item.job_location_slug}</Text>
        <Text>Salary: ₹{item.salary_min} - ₹{item.salary_max}</Text>
        <Text>Phone: {item.whatsapp_no}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={jobs}
      renderItem={renderJobCard}
      keyExtractor={(item, index) => item.id?.toString() || `fallback-${index}`}
      onEndReached={fetchJobs}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loading && <ActivityIndicator size="large" color="#0000ff" />}
    />
  );
};

export default JobsScreen;
