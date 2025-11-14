import { Alert, Platform, Share, Linking } from 'react-native';

const handleShare = async (product) => {
    console.log('product share:,',product);
    
  try {
    const productId = product.id;
    const appSchemeUrl = `djbookinguser://open-product?product=${productId}`; // app deep link
    const universalLink = `https://w.tisabooking.com/open?product=${productId}`; // clickable HTTPS link
    const playStoreUrl = `https://play.google.com/store/apps/details?id=com.djbooking.user`;
    const appStoreUrl = `https://apps.apple.com/app/idYOUR_APP_ID`;

    // Decide fallback URL if app is not installed
    const canOpenApp = await Linking.canOpenURL(appSchemeUrl);
    const urlToOpen = canOpenApp
      ? appSchemeUrl
      : (Platform.OS === 'android' ? playStoreUrl : appStoreUrl);

    const priceMeta = product?.metas?.find(meta => meta.meta_key === 'price');
    const price = priceMeta?.meta_value || 'N/A';
    const name = product?.title || product?.name || 'Unnamed Product';
    const location = [
      product?.house,
      product?.locality?.locality,
      product?.city?.city,
      product?.state?.name,
      product?.country || 'India',
      product?.postal
    ].filter(Boolean).join(', ');

    // Message for sharing (always clickable HTTPS link)
    const message = `Check out this product: ${name}\nPrice: ₹${price}\nLocation: ${location}\nClick here to view: ${universalLink}\nThank you Tisa Booking`;

    // Share
    await Share.share({ message });

    Alert.alert('Shared Successfully');
  } catch (err) {
    console.log(err);
    Alert.alert('Error', 'Something went wrong while sharing.');
  }
};

export default handleShare;
