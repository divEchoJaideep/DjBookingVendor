import React, { useState, useEffect, useMemo, useCallback } from 'react';
import styles from './styles';
import { View, FlatList, Text, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import TopHeader from '../../../../components/header/topHeader';
import Container from '../../../../components/Container';
import { collection, query, where, getDocs, getFirestore } from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../../ThemeContext/ThemeContext';


const MassageDashboard = () => {
    const navigation = useNavigation();

    const handleUserPress = (item, chatId) => {
        const userInfo = {
            id: item.id,
            userId: item?.userId,
            name: item?.name,
            role: item?.role
        };
        navigation.navigate('Chats', { userInfo, conversationId: chatId});
    };

    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    const [chats, setChats] = useState();

    useFocusEffect(
        useCallback(() => {
            getStoredUser();
        }, [])
    )

    const getStoredUser = async () => {
        try {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                const userData = JSON.parse(user);
                const db = getFirestore();
                const q = query(collection(db, 'chats'), where('participantIds', 'array-contains', `${userData?.id}_vendor`));
                const querySnapshot = await getDocs(q);
                const conversation = [];

                querySnapshot.forEach(doc => {
                    conversation.push({
                        ...doc.data(),
                        key: doc.id,
                    });
                });

                setChats(conversation);
            }
        } catch (error) {
            // Alert.alert('Failed to get user:');
        }
    };

    const toggleSearchBar = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    const handleSearchChange = (text) => {
        setSearchQuery(text);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // const filteredMessages = useMemo(() => {
    //     return chats.filter(
    //         (message) =>
    //             message.sender.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
    //             message.content.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    //     );
    // }, [debouncedSearchQuery]);



    const { isEnabled } = useTheme();


    // const containerStyle = isEnabled ? styles.darkContainer : styles.lightContainer;
    // const darkgrayContainer = isEnabled ? styles.lightGrayContainer : styles.lightContainer;
    // const searchBarTheme = isEnabled ? styles.SearchBarDark : styles.SearchBarLight;
    // const textStyle = isEnabled ? styles.darkText : styles.lightText;
    // const grayContainer = isEnabled ? styles.darkContainer : styles.grayContainer;

  const containerStyle = isEnabled ? styles.darkContainer : styles.lightContainer;
      const textStyle = isEnabled ? styles.darkText : styles.lightText;
      const grayContainer = isEnabled ? styles.darkGrayContainer : styles.lightContainer;
    


    const renderMessage = ({ item }) => {
        const user = item?.participants.find(p => p.role === 'user');

        return (
            <TouchableOpacity key={item?.key} onPress={() => handleUserPress(user, item?.key)} >
                <View style={[styles.messageContainer, grayContainer]}>
                    {/* <Image source={item.image} style={styles.avatar} /> */}
                    <View style={styles.messageInfo}>
                        <Text style={[styles.senderName, textStyle,{ textTransform: 'capitalize' }]}>{user.name}</Text>
                        <Text style={[styles.messageContent, textStyle,]}>{item.lastMessage}</Text>
                        {/* <Text style={[styles.timestamp, { color: isEnabled ? '#fff' : 'gray' }]}>{item.timestamp}</Text> */}
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <Container lightContent={isEnabled} afeAreaView safeAreaViewHeader conatinerStyle={containerStyle} >
            <View style={[styles.container, containerStyle]}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={{ flex: 1 }}>

                        <TopHeader
                            // leftImage={false}
                            // rightImage={true}
                            titleText={true}
                            tintColorLeft={isEnabled ? '#fff' : '#121212'}
                            stylesText={{ color: isEnabled ? '#fff' : '#121212' }}
                            title="Message"
                            onLeftPress={() => navigation.goBack()}
                            // onRightPress={toggleSearchBar}

                        />
                        {/* {isSearchVisible && (
                            <SearchBar
                                style={[styles.SearchBar, searchBarTheme, containerStyle]}
                                placeholder="Search People..."
                                value={searchQuery}
                                onChangeText={handleSearchChange}
                                placeholderTextColor={isEnabled ? '#fff' : '#aaa'}
                                color={isEnabled ? '#fff' : '#121212'}
                            />
                        )} */}

                        <FlatList
                            data={chats}
                            renderItem={renderMessage}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item.key}
                            contentContainerStyle={{ paddingBottom: 20 }}
                            ListEmptyComponent={<Text>No messages found</Text>}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </Container>
    );
};

export default MassageDashboard;
