import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import Container from '../../../components/Container';
import Content from '../../../components/Content';
import { useTheme } from '../../../src/ThemeContext/ThemeContext';
import TopHeader from '../../../components/header/topHeader';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../../components/colors/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Terms = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const { isEnabled } = useTheme();
    const textColor = isEnabled ? '#fff' : '#121212';
    const containerStyle = isEnabled ? styles.darkContainer : styles.lightContainer;


    const B = ({ children }) => (
        <Text style={[styles.bold, { color: textColor }]}>{children}</Text>
    );

    return (
        <Container conatinerStyle={[styles.Container, containerStyle]} lightContent={isEnabled} safeAreaView safeAreaViewHeader>
            <TopHeader
                leftImage={true}
                onLeftPress={() => navigation.goBack()}
                onTitletextPress={() => navigation.goBack()}
                titleText
                rightImage={false}
                title={'Terms & Conditions'}
                stylesText={{ color: isEnabled ? "white" : "black" }}
                tintColorLeft={isEnabled ? '#fff' : '#121212'}
            />
            <Content
                hasHeader
                // scrollEnabled
                // contentContainerStyle={[
                //     styles.scrollContent, containerStyle,

                // ]}
                extraScrollHeight={50}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[styles.scrollContent, containerStyle]}
                >
                    {/* <Text style={[styles.title, { color: textColor }]}>Terms & Conditions</Text> */}
                    <Text style={[styles.subText, { color: textColor }]}>
                        Last Updated: October 15, 2025
                    </Text>

                    <Text style={[styles.text, { color: textColor }]}>
                        Welcome to <B>TISA BOOKING!</B> These Terms & Conditions govern your use of our mobile
                        application and its services. By using our app, you agree to these terms. If you don't agree,
                        please do not use the application.
                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>1. Definitions</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        <B>"App"</B> refers to the <B>TISA BOOKING VENDOR</B> mobile application.{'\n'}
                        <B>"Services"</B> refers to the service listing, messaging, and related features on the App.{'\n'}
                        <B>"Service Provider"</B> refers to any individual or business that lists their services on the App.{'\n'}
                        <B>"Customer"</B> refers to any individual using the App to find and hire services.{'\n'}
                        <B>"User"</B> refers to both Service Providers and Customers.
                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>2. User Accounts</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        To access the App's features, you must create an account. You are responsible for keeping your
                        account information confidential and for all activities that occur under your account. Please
                        notify us immediately of any unauthorized use.
                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>3. User Responsibilities</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        • You must be at least <B>18 years old</B> to use our Services.{'\n'}
                        • You are responsible for the accuracy of all information you provide.{'\n'}
                        • You agree not to use the Services for any unlawful purpose.{'\n'}
                        • You will not post false, misleading, or fraudulent information.{'\n'}
                        • You will not interfere with the proper working of the App.
                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>
                        4. Service Listings and Content Rules
                    </Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        <B>Service Providers</B> must post genuine listings that represent actual services.{'\n'}
                        You may not post services that are illegal, fraudulent, or sexually explicit.{'\n'}
                        We reserve the right to remove any listing that violates these terms.
                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>5. Disclaimer of Warranties</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        The Services are provided on an <B>"as is"</B> and <B>"as available"</B> basis without any warranties.
                        We do not guarantee that the App will be error-free or that the services listed will meet your needs.
                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>6. Limitation of Liability</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        In no event will <B>TISA BOOKING</B> be liable for any indirect, incidental, special, or consequential
                        damages arising from your use of the Services.
                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>7. Governing Law</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        These Terms & Conditions are governed by the laws of <B>India</B>. Any disputes will be subject
                        to the exclusive jurisdiction of the courts of India.
                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>8. Changes to the Terms</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        We may update these terms at any time. Your continued use of the App after any changes means
                        you accept the new terms.
                    </Text>

                    <Text style={[styles.title, { color: textColor, marginTop: 20 }]}>Privacy Policy</Text>
                    <Text style={[styles.subText, { color: textColor }]}>
                        Last Updated: October 15, 2025
                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>1. Information We Collect</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        <B>For Service Providers:</B> Name, email, phone number, business details, service listings, and billing info.{'\n'}
                        <B>For Customers:</B> Name, email, phone number, and information provided when searching for services.{'\n'}
                        <B>Automatically Collected:</B> IP address, device type, and usage activity.
                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>2. How We Use Your Information</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        • To provide and improve our Services.{'\n'}
                        • To facilitate communication between Service Providers and Customers.{'\n'}
                        • To process payments.{'\n'}
                        • To personalize your experience.{'\n'}
                        • To send notifications and updates.
                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>3. Information Sharing</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        <B>With Other Users:</B> Customer name and message are shared with Service Providers to facilitate requests.{'\n'}
                        <B>With Third-Party Service Providers:</B> We may share data for payment or analytics purposes, under strict confidentiality.{'\n'}
                        <B>Legal Compliance:</B> We may disclose your data if required by law.
                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>4. Data Security</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        We use reasonable security measures to protect your personal data. However, no method of data
                        transmission is 100% secure.
                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>5. Your Choices</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        You can access or delete your account information anytime by contacting our support team.
                    </Text>

                    <Text style={[styles.title, { color: textColor, marginTop: 20 }]}>Refund & Cancellation Policy</Text>

                    <Text style={[styles.heading, { color: textColor }]}>
                        1. For Service Providers (Paid Subscriptions)
                    </Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        <B>Cancellation:</B> You can cancel your subscription anytime. Cancellation takes effect after the current billing cycle.{'\n'}
                        <B>Refund Eligibility:</B> Subscriptions are non-refundable.{'\n'}
                        <B>No Partial Refunds:</B> We do not offer partial refunds for any reason.
                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>2. Changes to the Policy</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        We may update this policy at any time. Continued use of the App means you accept the updated terms.
                    </Text>

                    {/* CONTACT */}
                    <Text style={[styles.title, { color: textColor, marginTop: 20 }]}>Contact Us</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        <B>📞 Mob:</B> 8824515171{'\n'}
                        <B>📧 Email:</B> kanaramjatt27@gmail.com{'\n'}
                        <B>📍 Address:</B> GROUND, SHOP NO.9, ROYAL CITY, Machwa Kalwar Road, Machwa, Jaipur, Jaipur, Rajasthan, 303706
                    </Text>
                </ScrollView>
            </Content>
        </Container>
    );
};

export default Terms;

const styles = StyleSheet.create({
    Container: {
        padding: 20,
        flex: 1,

    },
    scrollContent: {
        // marginBottom: 40,
        paddingBottom: 50,
        flex: 1
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 8,
    },
    subText: {
        fontSize: 14,
        opacity: 0.7,
        marginBottom: 10,
    },
    heading: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 16,
        marginBottom: 6,
    },
    text: {
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 6,
    },
    bold: {
        fontWeight: '700',
    },
    lightContainer: {
        backgroundColor: Colors.lightContainer
    },
    darkContainer: {
        backgroundColor: Colors.darkContainer
    },
    lightText: {
        color: Colors.lightText
    },
    darkText: {
        color: Colors.darkText
    },

    lightGrayContainer: {
        backgroundColor: Colors.lightGray
    },

    buttonbackgroundContrainer: {
        backgroundColor: Colors.buttonBackground
    },
});
