import { StyleSheet, Text, ScrollView, TouchableOpacity, View } from 'react-native';
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
                title={'Refund Policy'}
                stylesText={{ color: isEnabled ? 'white' : 'black' }}
                tintColorLeft={isEnabled ? '#fff' : '#121212'}
            />

            <Content hasHeader extraScrollHeight={50}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[styles.scrollContent, containerStyle]}
                >


                    {/* <Text style={[styles.mainTitle, { color: textColor }]}>
                        Refund Policy
                    </Text> */}

                    <Text style={[styles.heading, { color: textColor }]}>1. Overview</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        Our platform is a product listing and booking service that connects customers with vendors.
                        We display vendor products to customers for booking purposes only. We do not process any payments from customers.
                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>2. Customer Payment Policy</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        - <B>No Payment Collection from Customers:</B> Our platform does not collect any payments from customers.{'\n'}
                        - <B>Direct Vendor Payment:</B>  All customer payments (including advances) are made directly to vendors.{'\n'}
                        - <B>No Customer Refund Responsibility:</B> We are not responsible for any customer refunds as we don't handle customer payments.
                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>3. Vendor Listing Fees</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        - <B>Product Listing Charges:</B> We charge vendors for displaying/listing their products on our platform .{'\n'}
                        - <B>Product Boosting Charges:</B> We charge vendors for boosting/promoting their products for better visibility.{'\n'}
                        - <B>Non-Refundable Policy:</B> All vendor listing and boosting fees are completely non-refundable under any circumstances.{'\n'}
                        - <B>No Exceptions:</B>  Regardless of booking outcomes, cancellations, or any other circumstances, vendor fees will not be refunded.
                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>4. Booking Process</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        - Customers browse products listed by vendors on our platform.{'\n'}
                        - Customers contact vendors directly for bookings and payments.{'\n'}
                        - All booking confirmations and payment arrangements are between customers and vendors.{'\n'}
                        - We facilitate the connection but are not party to the transaction.
                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>5. Customer-Vendor Transactions</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        - <B>Payment Terms:</B> Determined solely by individual vendors.{'\n'}
                        - <B>Advance Payments:</B>  Made directly to vendors as per their requirements.{'\n'}
                        - <B>Refund Policies:</B> Each vendor sets their own refund and cancellation policies.{'\n'}
                        - <B>Disputes:</B> All payment disputes must be resolved directly between customers and vendors.
                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>6. Platform Responsibilities</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        - <B>Service Provided: </B> Product listing and customer-vendor connection facilitation.{'\n'}
                        - <B>Payment Disclaimer:</B> We do not guarantee, mediate, or get involved in payment transactions.{'\n'}
                        - <B>Listing Accuracy:</B>  We display vendor-provided information but do not verify product details.
                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>7. Vendor Obligations</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        - Provide accurate product information for listing.{'\n'}
                        - Handle all customer payments and refunds independently.{'\n'}
                        - Maintain their own cancellation and refund policies.{'\n'}
                        - Communicate directly with customers regarding bookings.
                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>8. Platform Limitations</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        - We are not liable for customer-vendor payment disputes.{'\n'}
                        - We do not guarantee vendor reliability or service quality.{'\n'}
                        - We do not process, hold, or manage any customer funds.{'\n'}
                        - Vendor listing fees are our only revenue source and are non-negotiable.
                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>9. Contact Information</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        For platform queries only:{'\n'}
                        <B>📞 Mob:</B> 8824515171{'\n'}
                        <B>📧 Email:</B> kanaramjatt27@gmail.com{'\n'}
                        <B>📍 Address:</B> GROUND, SHOP NO.9, ROYAL CITY, Machwa Kalwar Road, Machwa, Jaipur, Jaipur, Rajasthan, 303706

                    </Text>

                    {/* ================== HINDI VERSION ================== */}

                    <Text style={[styles.mainTitle, { color: textColor, marginTop: 20 }]}>
                        रिफंड नीति
                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>1. सामान्य जानकारी</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        हमारा प्लेटफॉर्म एक उत्पाद सूची और बुकिंग सेवा है जो ग्राहकों को विक्रेताओं से जोड़ती है। हम केवल बुकिंग के उद्देश्य से ग्राहकों को विक्रेता उत्पाद दिखाते हैं। हम ग्राहकों से कोई भुगतान प्रक्रिया नहीं करते।
                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>2. ग्राहक भुगतान नीति</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        - <B>ग्राहकों से कोई भुगतान संग्रह नहीं:</B> हमारा प्लेटफॉर्म ग्राहकों से कोई भुगतान एकत्रित नहीं करता।{'\n'}
                        - <B>सीधा विक्रेता भुगतान:</B> सभी ग्राहक भुगतान (एडवांस सहित) सीधे विक्रेताओं को किए जाते हैं।{'\n'}
                        - <B>कोई ग्राहक रिफंड जिम्मेदारी नहीं:</B> हम किसी भी ग्राहक रिफंड के लिए जिम्मेदार नहीं हैं क्योंकि हम ग्राहक भुगतान नहीं संभालते।
                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>3. विक्रेता लिस्टिंग फीस</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        - <B>उत्पाद लिस्टिंग शुल्क:</B> हम विक्रेताओं से उनके उत्पादों को हमारे प्लेटफॉर्म पर प्रदर्शित/सूचीबद्ध करने के लिए शुल्क लेते हैं।{'\n'}
                        - <B>उत्पाद बूस्टिंग शुल्क:</B> हम विक्रेताओं से बेहतर दृश्यता के लिए उनके उत्पादों को बूस्ट/प्रमोट करने के लिए शुल्क लेते हैं।{'\n'}
                        - <B>गैर-वापसी योग्य नीति:</B> सभी विक्रेता लिस्टिंग और बूस्टिंग फीस किसी भी परिस्थिति में पूर्णतः गैर-वापसी योग्य हैं।{'\n'}
                        - <B>कोई अपवाद नहीं:</B> बुकिंग परिणाम, रद्दीकरण, या किसी अन्य परिस्थिति की परवाह किए बिना, विक्रेता फीस वापस नहीं की जाएगी।
                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>4. बुकिंग प्रक्रिया</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        - ग्राहक हमारे प्लेटफॉर्म पर विक्रेताओं द्वारा सूचीबद्ध उत्पादों को देखते हैं।{'\n'}
                        - ग्राहक बुकिंग और भुगतान के लिए सीधे विक्रेताओं से संपर्क करते हैं।{'\n'}
                        - सभी बुकिंग पुष्टि और भुगतान व्यवस्था ग्राहकों और विक्रेताओं के बीच होती है।{'\n'}
                        - हम कनेक्शन की सुविधा प्रदान करते हैं लेकिन लेन-देन में पार्टी नहीं हैं।

                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>5. ग्राहक-विक्रेता लेनदेन</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        - <B>भुगतान शर्तें:</B> केवल व्यक्तिगत विक्रेताओं द्वारा निर्धारित।{'\n'}
                        - <B>एडवांस भुगतान</B> उनकी आवश्यकताओं के अनुसार सीधे विक्रेताओं को किया जाता है।{'\n'}
                        - <B>रिफंड नीतियां:</B> प्रत्येक विक्रेता अपनी स्वयं की रिफंड और रद्दीकरण नीतियां निर्धारित करता है।{'\n'}
                        - <B>विवाद समाधान:</B> सभी भुगतान विवाद सीधे ग्राहकों और विक्रेताओं के बीच हल किए जाने चाहिए
                        ।
                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>6. प्लेटफॉर्म जिम्मेदारियां</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        - <B>प्रदान की गई सेवा:</B> उत्पाद सूची और ग्राहक-विक्रेता कनेक्शन सुविधा।{'\n'}
                        - <B>भुगतान अस्वीकरण:</B> हम भुगतान लेन-देन की गारंटी, मध्यस्थता या इसमें शामिल नहीं होते।{'\n'}
                        - <B>लिस्टिंग सटीकता:</B> हम विक्रेता-प्रदान की गई जानकारी प्रदर्शित करते हैं लेकिन उत्पाद विवरण सत्यापित नहीं करते।
                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>7. विक्रेता दायित्व</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        - लिस्टिंग के लिए सटीक उत्पाद जानकारी प्रदान करना।{'\n'}
                        - सभी ग्राहक भुगतान और रिफंड स्वतंत्र रूप से संभालना।{'\n'}
                        - अपनी स्वयं की रद्दीकरण और रिफंड नीतियां बनाए रखना।{'\n'}
                        - बुकिंग के संबंध में ग्राहकों के साथ सीधे संवाद करना।

                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>8. प्लेटफॉर्म सीमाएं</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        - हम ग्राहक-विक्रेता भुगतान विवादों के लिए उत्तरदायी नहीं हैं।{'\n'}
                        - हम विक्रेता विश्वसनीयता या सेवा गुणवत्ता की गारंटी नहीं देते।{'\n'}
                        - हम किसी भी ग्राहक फंड को प्रक्रिया, होल्ड या प्रबंधित नहीं करते।{'\n'}
                        - विक्रेता लिस्टिंग फीस हमारा एकमात्र राजस्व स्रोत है और गैर-परक्राम्य है।

                    </Text>

                    <Text style={[styles.heading, { color: textColor }]}>9. संपर्क जानकारी</Text>
                    <Text style={[styles.text, { color: textColor }]}>
                        प्लेटफॉर्म संबंधित प्रश्नों के लिए:{'\n'}
                        <B>📞 Mob:</B> 8824515171{'\n'}
                        <B>📧 Email:</B> kanaramjatt27@gmail.com{'\n'}
                        <B>📍 Address:</B> GROUND, SHOP NO.9, ROYAL CITY, Machwa Kalwar Road, Machwa, Jaipur, Jaipur, Rajasthan, 303706

                    </Text>

                    <Text style={[styles.mainTitle, { color: textColor }]}>
                        Liability
                    </Text>
                    <Text style={[styles.text, { color: textColor }]}>You agree not to hold Tisa Booking responsible and/or liable for any issues or claims arising out of disputes between customers and vendors. Tisa Booking is only a facilitator of connections and does not verify the quality, delivery, or legitimacy of services provided by vendors. You agree to indemnify and hold harmless Tisa Booking, its owners, affiliates, and employees from any claim, damage, or legal action arising out of your use of the platform or interaction with any third-party vendor listed on the platform.
                    </Text>
                    <B>Suspicious or Fraudulent Activity</B>
                    <Text style={[styles.text, { color: textColor }]}>Users are required to report any suspicious or potentially fraudulent vendor listings, profiles, or user behavior to us immediately via
                        <TouchableOpacity onPress={() => { }} style={{ alignItems: 'baseline', }}>
                            <Text style={[styles.email, { color: '#007bff', marginBottom: -4, marginRight: 2 }]}>
                                support@tisabooking.com
                            </Text>
                        </TouchableOpacity>
                        . Tisa Booking will review the reported cases and take necessary actions, including suspending or removing such accounts if violations are confirmed. However, Tisa Booking shall not be held liable for any damage or loss incurred due to such activity if it occurred outside the control of the platform.
                    </Text>
                    <B>Refunds & Payments (For Future Monetization)</B>
                    <Text style={[styles.text, { color: textColor }]}>In case Tisa Booking introduces paid features such as promoted listings or vendor packages in the future, and there is a technical issue preventing service delivery, a refund may be processed to the original payment method used. Once a sponsored feature has been successfully delivered (e.g., listing has gone live), no refund shall be provided under normal circumstances. Refund decisions will be at the sole discretion of Tisa Booking.

                    </Text>
                    <B>Chargebacks (Future Clause for Paid Services)</B>
                    <Text style={[styles.text, { color: textColor }]}>If a transaction related to a future paid service (e.g., advertising or premium placement) is disputed, reversed, unauthorized, or deemed suspicious, Tisa Booking reserves the right to remove any associated benefits from the user/vendor account. The user agrees to fully cooperate with Tisa Booking during such investigations and provide necessary documentation within three (3) business days if requested. Any loss or penalty arising due to chargebacks will be the sole responsibility of the user or vendor involved.

                    </Text>
                    <B>User-Generated Content Policy</B>
                    <Text style={[styles.text, { color: textColor }]}>All listings, images, service descriptions, and reviews posted by vendors or users on Tisa Booking are considered user-generated content.
                    </Text>
                    <Text style={[styles.text, { color: textColor }]}>Tisa Booking does not verify or take responsibility for the accuracy, authenticity, or legality of such content.
                    </Text>
                    <Text style={[styles.text, { color: textColor }]}>Users are advised to exercise discretion and caution when relying on any information provided by other users or vendors.</Text>
                    <Text style={[styles.text, { color: textColor }]}>Tisa Booking does not endorse or guarantee the truthfulness, quality, or reliability of any user-generated content on the platform.
                    </Text>
                    <View style={styles.oneLine}>
                        <Text style={[styles.text, { color: textColor, }]}>
                            If any content is found to be offensive, false, misleading, inappropriate, or unlawful, users can report it to:
                            <TouchableOpacity onPress={() => { }} style={{ alignItems: 'baseline', }}>
                                <Text style={[styles.email, { color: '#007bff', marginBottom: -4, marginLeft: 5 }]}>
                                    support@tisabooking.com
                                </Text>
                            </TouchableOpacity>
                            , we will take appropriate action within 48 hours.
                        </Text>
                    </View>
                    <Text style={[styles.mainTitle, { color: textColor }]}>
                        देयता (Liability)

                    </Text>
                    <Text style={[styles.text, { color: textColor }]}>आप सहमत हैं कि Tisa Booking को किसी भी प्रकार के विवाद या समस्या के लिए उत्तरदायी नहीं ठहराया जाएगा जो ग्राहक और विक्रेता के बीच उत्पन्न होते हैं। Tisa Booking केवल एक माध्यम (मध्यस्थ) है और विक्रेताओं द्वारा दी गई सेवाओं की गुणवत्ता, विश्वसनीयता या वैधता की पुष्टि नहीं करता। आप सहमत हैं कि किसी भी प्रकार के दावे, क्षति या कानूनी कार्रवाई की स्थिति में, आप Tisa Booking, उसके मालिकों, सहयोगियों और कर्मचारियों को पूर्ण रूप से क्षतिपूर्ति देंगे और उन्हें किसी प्रकार की कानूनी जिम्मेदारी से मुक्त रखेंगे।</Text>
                    <B>संदेहास्पद या धोखाधड़ीपूर्ण गतिविधि</B>
                    <Text style={[styles.text, { color: textColor }]}>यदि कोई उपयोगकर्ता किसी भी संदेहास्पद गतिविधि, फर्जी लिस्टिंग, या अनुचित व्यवहार को देखता है, तो उसे तुरंत हमें
                        <TouchableOpacity onPress={() => { }} style={{ alignItems: 'baseline', }}>
                            <Text style={[styles.email, { color: '#007bff', marginBottom: -4, marginRight: 2 }]}>
                                support@tisabooking.com
                            </Text>
                        </TouchableOpacity>
                        पर सूचित करना चाहिए। रिपोर्ट मिलने के बाद Tisa Booking आवश्यक कार्रवाई करेगा, जिसमें उपयोगकर्ता या विक्रेता का खाता निलंबित या हटाया जाना भी शामिल हो सकता है। हालांकि, अगर ऐसी गतिविधियाँ हमारे प्लेटफ़ॉर्म के बाहर हुई हैं, तो उनके लिए Tisa Booking जिम्मेदार नहीं होगा। </Text>
                    <B>रिफंड और भुगतान (भविष्य की सुविधाओं के लिए)</B>
                    <Text style={[styles.text, { color: textColor }]}>यदि भविष्य में Tisa Booking पर पेड सुविधाएँ जैसे कि प्रमोटेड लिस्टिंग या विक्रेता पैकेज शुरू किए जाते हैं और किसी तकनीकी कारण से सेवा प्रदान नहीं की जा सकती, तो भुगतान की गई राशि उसी खाते में वापस कर दी जाएगी जिससे भुगतान किया गया था। एक बार सेवा (जैसे कि लिस्टिंग लाइव होना) सफलतापूर्वक शुरू हो गई, तो सामान्यतः रिफंड नहीं किया जाएगा। रिफंड के संबंध में अंतिम निर्णय Tisa Booking द्वारा लिया जाएगा।
                    </Text>
                    <B>चार्जबैक (भविष्य की भुगतान सेवा के लिए)</B>
                    <Text style={[styles.text, { color: textColor }]}>यदि कोई भुगतान विवादित हो जाता है, अस्वीकृत किया जाता है, या संदेहास्पद माना जाता है, तो Tisa Booking उस सेवा से संबंधित सभी लाभों को हटाने का अधिकार रखता है। उपयोगकर्ता सहमत होता है कि वह किसी भी जांच प्रक्रिया में Tisa Booking को पूरा सहयोग देगा और माँगी गई जानकारी या दस्तावेज़ तीन (3) कार्यदिवसों के भीतर प्रदान करेगा। चार्जबैक से उत्पन्न किसी भी हानि या दंड के लिए पूर्ण जिम्मेदारी उपयोगकर्ता की होगी।
                    </Text>
                    <B>उपयोगकर्ता द्वारा उत्पन्न सामग्री (User-Generated Content)</B>
                    <Text style={[styles.text, { color: textColor }]}>Tisa Booking पर पोस्ट की गई सभी लिस्टिंग, चित्र, सेवा विवरण और समीक्षाएँ उपयोगकर्ताओं या विक्रेताओं द्वारा स्वतंत्र रूप से साझा की गई हैं।
                    </Text>
                    <Text style={[styles.text, { color: textColor }]}>Tisa Booking ऐसी किसी भी सामग्री की सच्चाई, वैधता या प्रामाणिकता की पुष्टि नहीं करता। </Text>
                    <Text style={[styles.text, { color: textColor }]}>उपयोगकर्ताओं को सलाह दी जाती है कि वे किसी भी जानकारी का उपयोग सोच-समझकर करें और अपनी विवेकशीलता का प्रयोग करें।</Text>
                    <Text style={[styles.text, { color: textColor }]}>हम किसी भी सामग्री की सत्यता या गुणवत्ता की गारंटी नहीं देते हैं।
                    </Text>
                    <View style={styles.oneLine}>
                        <Text style={[styles.text, { color: textColor, }]}>
                            यदि उपयोगकर्ता को कोई सामग्री आपत्तिजनक, भ्रामक, अवैध या अनुचित लगे, तो वह उसे
                            <TouchableOpacity onPress={() => { }} style={{ alignItems: 'baseline', }}>
                                <Text style={[styles.email, { color: '#007bff', marginBottom: -4, marginLeft: 5 }]}>
                                    support@tisabooking.com
                                </Text>
                            </TouchableOpacity>
                            पर रिपोर्ट कर सकता है। हम 48 घंटे के भीतर उचित कार्रवाई करेंगे।

                        </Text>
                    </View>
                </ScrollView>
            </Content>
        </Container>
    );
};

export default Pricing;

const styles = StyleSheet.create({
    Container: {
        padding: 20,
        paddingBottom: 80,
    },
    scrollContent: {
        paddingBottom: 60,
    },
    mainTitle: {
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
    supportBTN: {
        // backgroundColor:'red',
        marginTop: 20
    },
    oneLine: {
        //  flexDirection: 'row',
        // flexWrap: 'nowrap',
        alignItems: 'center',
        // backgroundColor:'red'
    },

    email: {
        fontWeight: '700',
        textDecorationLine: 'underline',
    },


});
