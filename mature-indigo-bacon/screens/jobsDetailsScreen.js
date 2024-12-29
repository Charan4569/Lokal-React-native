import React from 'react';
import { View, Text, Button } from 'react-native';

const JobDetailsScreen = ({ route, navigation }) => {
  const { job } = route.params;

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Job Role: {job.job_role}</Text>
      <Text>Job Category: {job.job_category}</Text>
      <Text>Description: {job.title}</Text>
      <Text>Job Hours: {job.job_hours}</Text>
      <Text>Location: {job.location}</Text>
      <Text>Salary: ₹{job.salary_min} - ₹{job.salary_max}</Text>
      <Text>Phone: {job.whatsapp_no}</Text>
      <Text>Other Details: {job.other_details}</Text>
      <Button
        title="Bookmark"
        onPress={() => navigation.navigate('Bookmarks', { job })}
      />
    </View>
  );
};

export default JobDetailsScreen;
