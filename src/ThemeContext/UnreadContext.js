import React, { createContext, useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UnreadContext = createContext();

export const UnreadProvider = ({ children }) => {
    const [hasUnread, setHasUnread] = useState(false);

    const checkUnread = async () => {
        try {
            const user = await AsyncStorage.getItem('user');
            if (!user) return;
            const vendorId = JSON.parse(user).id + '_vendor';
            console.log('userId :', vendorId);

            const snapshot = await firestore()
                .collection('chats')
                .where('participantIds', 'array-contains', vendorId)
                .get();

            let unreadFound = false;
            snapshot.forEach(doc => {
                const data = doc.data();
                const count = data.unreadCounts?.[vendorId] || 0;
                if (count > 0) unreadFound = true;
            });

            setHasUnread(unreadFound);
        } catch (e) {
            console.error("Failed to check unread:", e);
        }
    };

    useEffect(() => {
        let unsubscribe;

        const initListener = async () => {
            const user = await AsyncStorage.getItem('user');
            if (!user) return;
            const vendorId = JSON.parse(user).id + '_vendor';

            unsubscribe = firestore()
                .collection('chats')
                .where('participantIds', 'array-contains', vendorId)
                .onSnapshot(() => checkUnread()); // realtime update

            // Initial check
            checkUnread();
        };

        initListener();

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    return (
        <UnreadContext.Provider value={{ hasUnread, setHasUnread }}>
            {children}
        </UnreadContext.Provider>
    );
};
