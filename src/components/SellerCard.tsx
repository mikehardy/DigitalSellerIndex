/* eslint-disable @typescript-eslint/no-unused-vars */
import {Image, Linking, Pressable, StyleSheet, View} from 'react-native';
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
  const backgroundStyle = {backgroundColor: theme.colors.background, flex: 1};

  return (
    <View style={styles.sellerCard}>
      <Surface style={{flex: 1}}>
        {props.seller.instagram && (
          <Pressable
            onPress={() => {
              console.log('instagram');
              Linking.openURL(
                'https://instagram.com/' + props.seller.instagram,
              );
            }}>
            <View style={[styles.horizontal, styles.verticalCenter]}>
              <Icon
                size={18}
                style={[styles.padding5, {color: 'fbad50'}]}
                name="instagram"
              />
              <Caption>{props.seller.instagram}</Caption>
            </View>
          </Pressable>
        )}
        <Pressable
          style={styles.detailsContainer}
          // @ts-ignore - because types don't have onHoverIn/onHoverOut - see react-native-web repo issues
          onHoverIn={() => console.log('hoverIn')}
          onHoverOut={() => console.log('hoverOut')}
          onPress={() => {
            console.log('seller: ' + props.seller.etsyShopId);
            Linking.openURL('https://etsy.com/shop/' + props.seller.etsyShopId);
          }}>
          <Caption>{props.seller.shopName}</Caption>
          <View style={styles.horizontal}>
            <Avatar.Image
              size={24}
              source={{
                uri: props.seller.avatarURI,
              }}
            />
            <View>
              <Text>
                Seller: {props.seller.seller}
                {props.seller.city ? ' in ' + props.seller.city : ''}
              </Text>
              <Caption style={{width: 100, flexWrap: 'wrap'}}>
                {props.seller.products}
              </Caption>
            </View>
          </View>
          <Image
            style={{height: 110, width: 110, resizeMode: 'contain'}}
            source={{uri: props.seller.productURI}}
          />
        </Pressable>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  padding5: {
    padding: 5,
  },
  sellerCard: {
    width: 200,
    minWidth: 200,
    height: 300,
    minHeight: 200,
    padding: 10,
  },
});
