// utils/RazorpayHelper.js
import RazorpayCheckout from 'react-native-razorpay';
import { ToastAndroid, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { Colors } from '../theme'; // apne theme path ke hisaab se adjust kare

/**
 * Reusable Razorpay payment function
 * @param {Object} packageItem - { price: number, name: string }
 * @param {string} RAZORPAY_KEY - Your Razorpay Test/Live Key
 * @param {Object} prefill - Optional: { email, contact, name }
 * @returns {Promise} resolves with paymentData on success
 */
export const makeRazorpayPayment = async (packageItem, RAZORPAY_KEY, prefill = {}) => {
  return new Promise((resolve, reject) => {
    if (!RAZORPAY_KEY) {
      const msg = 'Razorpay Key missing';
      if (Platform.OS === 'android') ToastAndroid.show(msg, ToastAndroid.SHORT);
      else Toast.show({ type: 'error', text1: msg });
      return reject(new Error(msg));
    }

    const options = {
      description: `Credits towards ${packageItem?.name}`,
      image: 'https://clients.divecho.com/matrimony/public/uploads/all/obNS7BPrK6BT00OCcc236Mep0NuvDT4ieUesjQ1O.png',
      currency: 'INR',
      key: RAZORPAY_KEY,
      amount: packageItem?.price * 100, 
      name: `${packageItem?.name} Package`,
      prefill: {
        email: prefill.email || 'user@example.com',
        contact: prefill.contact || '9191919191',
        name: prefill.name || 'User Name',
      },
      theme: { color: Colors.them },
      one_click_checkout: true,
      show_coupons: true,
    };

    RazorpayCheckout.open(options)
      .then(paymentData => {
        Toast.show({
          type: 'success',
          text1: 'Payment Success',
          text2: `Payment ID: ${paymentData.razorpay_payment_id}`,
          topOffset: 70,
        });
        resolve(paymentData);
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: 'Payment Failed',
          text2: 'Transaction cancelled or failed. Try again!',
          topOffset: 70,
        });
        reject(error);
      });
  });
};
