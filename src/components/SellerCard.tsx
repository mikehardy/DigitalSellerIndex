import {useState} from 'react';
import {
  Image,
  LayoutRectangle,
  Linking,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {Avatar, Caption, Surface, Text, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface Seller {
  shopName: string;
  seller: string;
  avatarURI?: string;
  hidden?: string;
  city?: string;
  country?: string;
  etsyShopId: string | number;
  instagram?: string;
  products?: string;
  productURI?: string;
  category1: string;
  category2?: string;
  category3?: string;
  category4?: string;
}

export interface SellerCardProps {
  seller: Seller;
}
export function SellerCard(props: SellerCardProps): JSX.Element | null {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  const [layout, setLayout] = useState<LayoutRectangle | undefined>();

  const dynamicStyles = StyleSheet.create({
    sellerCardOverlay: {
      opacity: 0.8,
      backgroundColor: 'black',
      position: 'absolute',
      top: 0,
      height: layout ? layout!.height : 0,
      left: 0 - 10, // compensating for margin/border
      width: layout ? layout!.width + 20 : 0, // compensating for 2x margin/border
    },
  });

  return (
    <View style={styles.sellerCard}>
      <Surface style={[styles.flex1, styles.sellerCard]}>
        <View style={[styles.horizontal, styles.justifySpaceBetween]}>
          <Text style={[styles.black, styles.shopNameText]}>
            {props.seller.shopName}
          </Text>
          {props.seller.instagram !== undefined &&
            props.seller.instagram !== '' && (
              <Pressable
                onPress={() => {
                  console.log('instagram ' + props.seller.instagram);
                  Linking.openURL(
                    'https://instagram.com/' + props.seller.instagram,
                  );
                }}>
                <View style={[styles.horizontal, styles.allCentered]}>
                  <Icon
                    size={18}
                    style={[styles.padding5, styles.instagramColor]}
                    name="instagram"
                  />
                </View>
              </Pressable>
            )}
        </View>
        <Pressable
          style={styles.detailsContainer}
          // @ts-ignore - because types don't have onHoverIn/onHoverOut - see react-native-web repo issues
          onHoverIn={() => setHovered(true)}
          onHoverOut={() => setHovered(false)}
          onLayout={event => {
            setLayout(event.nativeEvent.layout);
          }}
          onPress={() => {
            console.log('seller: ' + props.seller.etsyShopId);
            Linking.openURL('https://etsy.com/shop/' + props.seller.etsyShopId);
          }}>
          <View style={[styles.horizontal, styles.marginBottom5]}>
            <Avatar.Image
              size={80}
              // in case there is no avatar image, set background to surface color so it's invisible
              style={{backgroundColor: theme.colors.surface}}
              source={{
                uri: props.seller.avatarURI,
              }}
            />
            <View>
              <Text style={[styles.black, styles.sellerName]}>
                Seller: {props.seller.seller}
                {props.seller.city ? ' in ' + props.seller.city : ''}
              </Text>
              <Caption style={[styles.productDescriptionText, styles.black]}>
                {props.seller.products}
              </Caption>
            </View>
          </View>
          <Image
            style={styles.productImage}
            source={{uri: props.seller.productURI}}
            resizeMode="contain"
          />
          {hovered && (
            <View
              style={[
                dynamicStyles.sellerCardOverlay,
                styles.allCentered,
                styles.padding5,
              ]}>
              <Icon color={'white'} name="link" size={48} />
              <Text style={styles.white}>Go to the</Text>
              <Text style={styles.white}>{props.seller.shopName}</Text>
              <Text style={styles.white}>shop on Etsy!</Text>
            </View>
          )}
        </Pressable>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  detailsContainer: {},
  horizontal: {
    flexDirection: 'row',
  },
  allCentered: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  padding5: {
    padding: 5,
  },
  marginBottom5: {marginBottom: 5},
  black: {
    color: 'black',
  },
  white: {
    color: 'white',
  },
  sellerCard: {
    width: 300,
    height: 370,
    padding: 10,
    margin: 10,
    elevation: 0,
  },
  productDescriptionText: {
    width: 210,
    paddingLeft: 5,
    flexWrap: 'wrap',
    fontWeight: '300',
    fontSize: 14,
    lineHeight: 15,
    letterSpacing: 0,
  },
  productImage: {
    height: 238,
    width: 300,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  shopNameText: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 16,
    paddingBottom: 6,
  },
  justifySpaceBetween: {justifyContent: 'space-between'},
  sellerName: {paddingLeft: 5},
  instagramColor: {
    color: '#0057b7',
    padding: 0,
  },
});
