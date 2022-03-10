/* eslint-disable @typescript-eslint/no-unused-vars */
import {useState} from 'react';
import {
  Image,
  LayoutRectangle,
  Linking,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {
  Avatar,
  Caption,
  Paragraph,
  Surface,
  Text,
  useTheme,
} from 'react-native-paper';
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
  const backgroundStyle = {backgroundColor: theme.colors.background, flex: 1};

  return (
    <View style={styles.sellerCard}>
      <Surface style={[styles.flex1, styles.sellerCard]}>
        {props.seller.instagram !== undefined && props.seller.instagram !== '' && (
          <Pressable
            onPress={() => {
              console.log('instagram ' + props.seller.instagram);
              Linking.openURL(
                'https://instagram.com/' + props.seller.instagram,
              );
            }}>
            <View style={[styles.horizontal, styles.verticalCenter]}>
              <Icon
                size={18}
                style={[styles.padding5, styles.instagramColor]}
                name="instagram"
              />
              <Caption>{props.seller.instagram}</Caption>
            </View>
          </Pressable>
        )}
        <Pressable
          style={styles.detailsContainer}
          // @ts-ignore - because types don't have onHoverIn/onHoverOut - see react-native-web repo issues
          onHoverIn={() => setHovered(true)}
          onHoverOut={() => setHovered(false)}
          onLayout={event => {
            setLayout(event.nativeEvent.layout);
            console.log(
              'layout is ' + JSON.stringify(event.nativeEvent.layout),
            );
          }}
          onPress={() => {
            console.log('seller: ' + props.seller.etsyShopId);
            Linking.openURL('https://etsy.com/shop/' + props.seller.etsyShopId);
          }}>
          <Paragraph style={styles.verticalCenter}>
            {props.seller.shopName}
          </Paragraph>
          <View style={styles.horizontal}>
            <Avatar.Image
              size={24}
              // in case there is no avatar image, set background to surface color so it's invisible
              style={{backgroundColor: theme.colors.surface}}
              source={{
                uri: props.seller.avatarURI,
              }}
            />
            <View>
              <Text>
                Seller: {props.seller.seller}
                {props.seller.city ? ' in ' + props.seller.city : ''}
              </Text>
              <Caption style={styles.productDescriptionText}>
                {props.seller.products}
              </Caption>
            </View>
          </View>
          <Image
            style={styles.productImage}
            source={{uri: props.seller.productURI}}
          />
          {hovered && (
            <View
              style={{
                opacity: 50,
                backgroundColor: 'grey',
                position: 'absolute',
                top: layout?.y,
                height: layout?.height,
                left: layout?.x,
                width: layout?.width,
              }}
            />
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
  detailsContainer: {
    // flex: 1,
    // alignContent: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  horizontal: {
    flexDirection: 'row',
  },
  verticalCenter: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  padding5: {
    padding: 5,
  },
  sellerCard: {
    width: 250,
    // minWidth: 200,
    height: 300,
    // minHeight: 200,
    padding: 10,
    margin: 10,
  },
  productDescriptionText: {
    width: 150,
    flexWrap: 'wrap',
  },
  productImage: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  instagramColor: {
    // backgroundColor: 'red',
    color: '#fbad50',
  },
});
