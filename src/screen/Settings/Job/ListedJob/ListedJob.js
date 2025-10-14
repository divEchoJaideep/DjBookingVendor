import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import styles from '../styles';
import { useTheme } from '../../../../ThemeContext/ThemeContext';
import { getJob, updateJobStatus } from '../../../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListedJob = ({ searchQuery = '' }) => {
  const { isEnabled } = useTheme();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [jobData, setJobData] = useState({
    total: 0,
    items: [],
    last_page: 1,
  });

  const navigation = useNavigation();
  const containerStyle = isEnabled ? styles.darkContainer : styles.lightContainer;
  const grayContainer = isEnabled ? styles.darkgray : styles.lightContainer;
  const textStyle = isEnabled ? styles.darkText : styles.lightText;


  useEffect(() => {
    fetchJob(1, true);
  }, [])

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchJob(1, true);
      setPage(1);
    },);
    return () => clearTimeout(debounce);
  }, [searchQuery]);



  const fetchJob = async (customPage = 1, isReset = false) => {
    if (loading || refreshing || (jobData.last_page && customPage > jobData.last_page)) return;

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const header = `Bearer ${token}`;

      const response = await getJob(searchQuery, header);
      const jobs = response?.data?.jobs || response?.data?.data || [];

      setJobData(prev => ({
        total: response?.data?.total || jobs.length,
        last_page: response?.data?.totalPages || 1,
        items: isReset ? jobs : [...prev.items, ...jobs],
      }));

      setPage(customPage + 1);
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchJob(1, true);
    setRefreshing(false);
  };

  const handleLoadMore = () => {
    if (!loading && page <= jobData.last_page) {
      fetchJob(page, false);
    }
  };

  const handleStatusChange = async (jobId, currentStatus, jobTitle) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

    Alert.alert(
      'Confirm Status Change',
      `Are you sure you want to mark "${jobTitle}" as ${newStatus}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('userToken');
              const header = `Bearer ${token}`;
              const response = await updateJobStatus(jobId, { status: newStatus }, header);

              if (response?.success || response?.data?.success) {
                setJobData(prevState => ({
                  ...prevState,
                  items: prevState.items.map(job =>
                    job.id === jobId ? { ...job, status: newStatus } : job
                  ),
                }));
                Alert.alert('Success', 'Status updated successfully');
              } else {
                Alert.alert('Error', response?.message || 'Failed to update status');
              }
            } catch (error) {
            
              Alert.alert('Error', 'Something went wrong');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderFooter = () => (
    loading ? (
      <View style={{ paddingVertical: 20, alignItems: 'center' }}>
        <ActivityIndicator size="small" color="#007bff" />
      </View>
    ) : null
  );

  return (
    <View style={[styles.screenContainer, containerStyle]}>
      <FlatList
        data={jobData.items}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.card, grayContainer]}
            onPress={() => navigation.navigate('JobDetails', { job: item, jobTitle: item?.title })}
          >
            <View style={styles.cardContent}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

                <Text style={[styles.jobTitle, textStyle]}>
                  {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                </Text>
                <Text style={styles.jobDate}>
                  Posted on: {new Date(item.created_at).toLocaleDateString()}
                </Text>
              </View>
              <Text style={[styles.jobDescription, textStyle]}>Description: {item.description}</Text>
              <Text style={styles.jobQualification}>Qualification: {item.qualification}</Text>
              <Text style={styles.jobExperience}>Experience: {item.experience}</Text>
              <Text style={styles.jobSalary}>Salary: {item.salary}</Text>
              <Text style={styles.jobEmail}>Email: {item.email}</Text>
              <Text style={styles.jobMobile}>Mobile: {item.mobile}</Text>
              <Text style={styles.jobAddress}>Location: {item.address}</Text>
              <Text style={styles.jobSeller}>Seller: {item.seller.name}</Text>
              <Text
                style={[
                  styles.jobStatus,
                  item.status === 'active' ? styles.activeStatus : styles.inactiveStatus,
                ]}
              >
                Status: {item.status}
              </Text>
              <TouchableOpacity
                style={styles.statusChangeButton}
                onPress={() => handleStatusChange(item.id, item.status, item.title)}
              >
                <Text style={styles.statusChangeButtonText}>
                  Change Status to {item.status === 'active' ? 'Inactive' : 'Active'}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter}
        initialNumToRender={10}
        ListEmptyComponent={
          !loading &&
          <View style={styles.centeredWrap}>
            <Text style={[styles.emptyText, textStyle]}>No Job Available...</Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#007bff"
            colors={['#007bff']}
          />
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default ListedJob;
