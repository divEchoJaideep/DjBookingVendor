import { View, Text, TouchableOpacity, Image, Modal, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react';
import styles from './styles';
import { useTheme } from '../../ThemeContext/ThemeContext';
import InvoiceTextInput from '../../../components/invoiceTextInput';
import MyButton from '../../../components/MyButton';
import TopHeader from '../../../components/header/topHeader';
import Container from '../../../components/Container';

const BankDetails = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [newAccount, setNewAccount] = useState({
        accountHolderName: '',
        accountNumber: '',
        bankName: '',
        branchName: '',
        ifscCode: ''
    });
    const [bankAccounts, setBankAccounts] = useState([
        {
            id: '1',
            accountHolderName: 'RAM',
            accountNumber: '12345567899',
            bankName: 'Federal Bank',
            branchName: 'Jaipur',
            ifscCode: '65485',
        },
        {
            id: '2',
            accountHolderName: 'RAM',
            accountNumber: '98765432100',
            bankName: 'Bank of Baroda',
            branchName: 'jaipur',
            ifscCode: '65432',
        },
        
    ]);
    const { isEnabled, toggleSwitch } = useTheme();

    const containerStyle = isEnabled ? styles.darkContainer : styles.backgroundContainer;
    const textStyle = isEnabled ? styles.darkText : styles.lightText;

    const handleDelete = (id) => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete this account?",
            [
                { text: "No", style: "cancel" },
                { text: "Yes", onPress: () => deleteAccount(id) },
            ]
        );
    };

    const deleteAccount = (id) => {
        setBankAccounts(bankAccounts.filter(account => account.id !== id));
    };

    const handleAddAccount = () => {
        const newId = (bankAccounts.length + 1).toString();
        const newBankAccount = { id: newId, ...newAccount };
        setBankAccounts([...bankAccounts, newBankAccount]);
        setNewAccount({
            accountHolderName: '',
            accountNumber: '',
            bankName: '',
            branchName: '',
            ifscCode: ''
        });
        setModalVisible(false);
    };

    const handleInputChange = (name, value) => {
        setNewAccount({ ...newAccount, [name]: value });
    };
const grayContainer = isEnabled ? styles.darkGrayContaine : styles.lightContainer;

    const renderBankItem = ({ item }) => (
        <View style={[styles.bankAccountDetailsWrap,grayContainer]}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View>
                    <Text style={[styles.mainTitleText, textStyle]}>{item.accountHolderName}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.bankName}>Account Number : </Text>
                        <Text style={[styles.bankNameText, textStyle]}>{item.accountNumber}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", gap: 10, marginVertical: "auto" }}>
                    <TouchableOpacity style={styles.opreationImageWrap}>
                        <Image source={require('../../Images/editing.png')} style={styles.opreationImage} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.opreationImageWrap} onPress={() => handleDelete(item.id)}>
                        <Image source={require('../../Images/delete.png')} style={styles.opreationImage} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.dottedLine} />
            <View style={styles.bankNameWrap}>
                <View>
                    <Text style={styles.bankName}>Bank Name</Text>
                    <Text style={styles.bankNameText}>{item.bankName}</Text>
                </View>
                <View>
                    <Text style={styles.bankName}>Branch</Text>
                    <Text style={styles.bankNameText}>{item.branchName}</Text>
                </View>
                <View>
                    <Text style={styles.bankName}>IFSC Code</Text>
                    <Text style={styles.bankNameText}>{item.ifscCode}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <Container lightContent={isEnabled} safeAreaView safeAreaViewHeader paddingBottomContainer={true} conatinerStyle={containerStyle}>
            <View style={[styles.container, containerStyle,]}>
                <TopHeader
                    leftImage={true}
                    onLeftPress={() => navigation.goBack()}
                    titleText={true}
                    onTitletextPress={() => navigation.goBack()}
                    stylesText={{ color: isEnabled ? "#fff" : "#121212" }}
                    tintColorLeft={isEnabled ? '#fff' : '#121212'}
                    title={'Bank Details'}
                    rightImage={true}
                />
                <View>
                    <View style={styles.firstButton}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={[styles.mainTitleText, textStyle]}>Total Bank Accounts</Text>
                            <View style={styles.productsQuantityWrap}>
                                <Text style={styles.productsQuantity}>{bankAccounts.length}</Text>
                            </View>
                        </View>
                        <View style={styles.buttonWrap}>
                            <TouchableOpacity style={styles.addNewProducts} onPress={() => setModalVisible(true)}>
                                <Image source={require('../../Images/addwhite.png')} style={styles.addPlusImg} />
                            </TouchableOpacity>
                            {/* <TouchableOpacity style={styles.addFilter}>

                                <Image source={require('../../Images/setting.png')} style={[styles.addFilterImg]} tintColor={isEnabled ? '#fff' : '#121212'} />

                            </TouchableOpacity> */}
                        </View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => setModalVisible(false)}
                        >
                            <View style={styles.modalWrap}>
                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <View style={styles.modalBackground}>
                                        <View style={[styles.modalContainer, containerStyle]}>
                                            <View style={styles.modalHeader}>
                                                <Text style={[styles.modalTitle, textStyle]}>Add Bank Details</Text>
                                                <TouchableOpacity style={styles.closeImgWrap} onPress={() => setModalVisible(false)}>
                                                    <Image source={require('../../Images/close.png')} style={styles.closeImg} />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.textInputWrap}>
                                                <Text style={[styles.textInputTitle, textStyle]}>Bank Name</Text>
                                                <InvoiceTextInput
                                                    style={[styles.textInput, containerStyle]}
                                                    placeholderTextColor={isEnabled ? '#fff' : 'gray'}
                                                    value={newAccount.bankName}
                                                    onChangeText={(text) => handleInputChange('bankName', text)}
                                                />
                                            </View>
                                            <View style={styles.textInputWrap}>
                                                <Text style={[styles.textInputTitle, textStyle]}>Account Number</Text>
                                                <InvoiceTextInput
                                                    style={[styles.textInput, containerStyle]}
                                                    placeholderTextColor={isEnabled ? '#fff' : 'gray'}
                                                    value={newAccount.accountNumber}
                                                    onChangeText={(text) => handleInputChange('accountNumber', text)}
                                                />
                                            </View>
                                            <View style={styles.textInputWrap}>
                                                <Text style={[styles.textInputTitle, textStyle]}>Account Holder Name</Text>
                                                <InvoiceTextInput
                                                    style={[styles.textInput, containerStyle]}
                                                    placeholderTextColor={isEnabled ? '#fff' : 'gray'}
                                                    value={newAccount.accountHolderName}
                                                    onChangeText={(text) => handleInputChange('accountHolderName', text)}
                                                />
                                            </View>
                                            <View style={styles.textInputWrap}>
                                                <Text style={[styles.textInputTitle, textStyle]}>Branch Name</Text>
                                                <InvoiceTextInput
                                                    style={[styles.textInput, containerStyle]}
                                                    placeholderTextColor={isEnabled ? '#fff' : 'gray'}
                                                    value={newAccount.branchName}
                                                    onChangeText={(text) => handleInputChange('branchName', text)}
                                                />
                                            </View>
                                            <View style={styles.textInputWrap}>
                                                <Text style={[styles.textInputTitle, textStyle]}>IFSC Code</Text>
                                                <InvoiceTextInput
                                                    style={[styles.textInput, containerStyle]}
                                                    placeholderTextColor={isEnabled ? '#fff' : 'gray'}
                                                    value={newAccount.ifscCode}
                                                    onChangeText={(text) => handleInputChange('ifscCode', text)}
                                                />
                                            </View>
                                            <View style={styles.bottomButtonWrap}>
                                                <MyButton title={'Cancel'} style={styles.cancelButton} styletext={styles.cancelButtonText} onPress={() => setModalVisible(false)} />
                                                <MyButton title={'Save Change'} style={styles.SaveButton} styletext={styles.SaveButtonText} onPress={handleAddAccount} />
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>
                </View>
                <FlatList
                    data={bankAccounts}
                    renderItem={renderBankItem}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </Container>
    );
};

export default BankDetails;
