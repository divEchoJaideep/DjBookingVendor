import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import Container from '../../../components/Container';
import Content from '../../../components/Content';
import TopHeader from '../../../components/header/topHeader';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../src/ThemeContext/ThemeContext';
import { Colors } from '../../../components/colors/colors';

const Pricing = () => {
    const navigation = useNavigation();
    const { isEnabled } = useTheme();
    const textColor = isEnabled ? '#fff' : '#121212';
    const containerStyle = isEnabled ? styles.darkContainer : styles.lightContainer;

    const B = ({ children }) => (
        <Text style={[styles.bold, { color: textColor }]}>{children}</Text>
    );

    return (
        <Container
            conatinerStyle={[styles.Container, containerStyle]}
            lightContent={isEnabled}
            safeAreaView
            safeAreaViewHeader>
            <TopHeader
                leftImage
                onLeftPress={() => navigation.goBack()}
                onTitletextPress={() => navigation.goBack()}
                titleText
                rightImage={false}
                title={'Pricing'}
                stylesText={{ color: isEnabled ? 'white' : 'black' }}
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
                    {/* <Text style={[styles.title, { color: textColor }]}>Pricing</Text> */}
                    <Text style={[styles.text, { color: textColor }]}>
                        Our <B>Basic Plan</B> is designed for individuals and new service providers who are just starting out and want to test the waters. This plan provides the essential tools to get your business online and start connecting with customers.{'\n\n'}
                        <B>Price:</B> ₹499 per month{'\n'}
                        <B>Best For:</B> Freelancers, small businesses, and new service providers.{'\n'}
                        <B>Listings:</B> You can create up to 5 service listings.{'\n'}
                        <B>Core Features:</B> Includes profile creation, direct messaging with customers, and the ability to receive reviews and ratings.{'\n'}
                        <B>Visibility:</B> Your service listings will appear in standard search results.{'\n\n'}
                        This plan is perfect for those who want to establish an online presence without a big financial commitment.
                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>PLAN 2: Pro Plan</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        The <B>Pro Plan</B> is our most popular option, built for established professionals and growing businesses looking to expand their reach. It offers enhanced visibility and more powerful features to help you attract and retain a larger customer base.{'\n\n'}
                        <B>Price:</B> ₹1,499 per month{'\n'}
                        <B>Best For:</B> Growing businesses and professionals with a steady client base.{'\n'}
                        <B>Listings:</B> Enjoy unlimited service listings to showcase your full range of offerings.{'\n'}
                        <B>Enhanced Visibility:</B> Your listings are prioritized in search results, and you get a featured listing on the app's homepage.{'\n'}
                        <B>Promotional Tools:</B> This plan gives you access to in-app promotion features to run special offers and discounts.{'\n\n'}
                        The Pro Plan is the ideal choice for businesses ready to take their growth to the next level.
                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>PLAN 3: Enterprise Plan</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        The <B>Enterprise Plan</B> is a premium, customized solution for large agencies, franchises, and multi-location businesses that require maximum exposure and dedicated support.{'\n\n'}
                        <B>Price:</B> Custom Quote{'\n'}
                        <B>Best For:</B> Large organizations with extensive and ongoing service needs.{'\n'}
                        <B>Visibility:</B> Get the highest level of visibility with your listings appearing at the top of all search results.{'\n'}
                        <B>Dedicated Support:</B> You will have a dedicated account manager to assist with strategy, profile management, and any support issues.{'\n'}
                        <B>Advanced Features:</B> Includes all Pro features, plus a fully branded profile page to showcase your brand identity.{'\n\n'}
                        The Enterprise Plan is tailored to meet the unique needs of large-scale operations, ensuring a seamless experience and optimal results.
                    </Text>
                </ScrollView>
            </Content>
        </Container>
    );
};

export default Pricing;

const styles = StyleSheet.create({
    Container: {
        padding: 20,
        paddingBottom: 80, // prevents text hiding behind nav bar
    },
    scrollContent: {
        paddingBottom: 60,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 8,
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
        backgroundColor: Colors.lightContainer,
    },
    darkContainer: {
        backgroundColor: Colors.darkContainer,
    },
});
