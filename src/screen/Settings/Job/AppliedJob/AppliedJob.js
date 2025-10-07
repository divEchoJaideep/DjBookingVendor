import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import styles from '../styles';
import { useTheme } from '../../../../ThemeContext/ThemeContext';
import { getApplicant } from '../../../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

const AppliedJob = ({ searchQuery = '' }) => {
  const { isEnabled } = useTheme();

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [applicantData, setApplicantData] = useState({
    items: [],
    last_page: 1,
    total: 0,
  });
  console.log('applicantData :', applicantData)
  const navigation = useNavigation();

  const containerStyle = isEnabled ? styles.darkContainer : styles.lightContainer;
  const grayContainer = isEnabled ? styles.darkgray : styles.lightContainer;
  const textStyle = isEnabled ? styles.darkText : styles.lightText;

  // useEffect(() => {
  //     fetchApplicant(1, true);
  //   }, [])
  useFocusEffect(
    useCallback(() => {
      fetchApplicant(1, true);
      setApplicantData({ items: [], last_page: 1, total: 0 });
    }, [])
  )

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchApplicant(1, searchQuery, true);
      setPage(1);
    }, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);


  const fetchApplicant = async (pageNumber = 1, search = '', isReset = false) => {
    if (loading || refreshing || (applicantData.last_page && pageNumber > applicantData.last_page)) return;

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const header = `Bearer ${token}`;
      const response = await getApplicant(pageNumber, search, header);

      if (response?.success) {
        const { applications, total, last_page } = response.data;

        setApplicantData(prev => ({
          total,
          last_page,
          items: isReset ? applications : [...prev.items, ...applications],
        }));

        setPage(pageNumber + 1);
      } else {
        Alert.alert('Error', 'Failed to fetch applicants');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    await fetchApplicant(1, searchQuery, true);
    setRefreshing(false);
  };

  const handleLoadMore = () => {
    if (!loading && page <= applicantData.last_page) {
      fetchApplicant(page, searchQuery, false);
    }
  };

  const filteredApplicants = useMemo(() => {
    if (!searchQuery.trim()) return applicantData.items;

    const lowerQuery = searchQuery.toLowerCase();

    return applicantData.items.filter(item => {
      const applicantName = item.name?.toLowerCase() || '';
      const jobTitle = item.job?.title?.toLowerCase() || '';
      return applicantName.includes(lowerQuery) || jobTitle.includes(lowerQuery);
    });
  }, [searchQuery, applicantData.items]);

  return (
    <View style={[styles.screenContainer, containerStyle]}>
      <FlatList
        data={filteredApplicants}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, grayContainer]}
            onPress={() => navigation.navigate('JobDetails', { job: item.job })}
          >
            <View style={styles.cardContent}>
              <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>

                <Text style={[styles.jobTitle, textStyle]}>{item.job?.title ?? 'No Title'}</Text>
                <Text style={styles.jobDate}>
                  Applied on: {new Date(item.created_at).toLocaleDateString()}
                </Text>
              </View>
              <Text style={[styles.jobDescription, textStyle]}>Applicant Name: {item.name}</Text>
              <Text style={styles.jobQualification}>Qualification: {item.qualification}</Text>
              <Text style={styles.jobExperience}>Experience: {item.experience}</Text>
              <Text style={styles.jobSalary}>Salary: {item?.job?.salary}</Text>
              <Text style={styles.jobEmail}>Email: {item.email}</Text>
              <Text style={styles.jobMobile}>Mobile: {item.phone}</Text>
              <Text style={styles.jobAddress}>Location: {item.address}</Text>
            </View>
          </TouchableOpacity>
        )}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          loading && <ActivityIndicator size="small" color="#007bff" style={{ margin: 20 }} />
        }
        ListEmptyComponent={
          !loading &&
          <View style={styles.centeredWrap}>
            <Text style={[styles.emptyText, textStyle]}>No applicants found...</Text>
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

export default AppliedJob;
