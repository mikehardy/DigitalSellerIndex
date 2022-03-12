import appJson from './app.json';
import {
  FlatList,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {
  Headline,
  Provider as PaperProvider,
  Text,
  useTheme,
} from 'react-native-paper';

import {useAppSettings} from './components/AppSettings';
import {Seller, SellerCard} from './components/SellerCard';
import HoverButton from './components/HoverButton';

import sellersJson from './assets/sellers.json';
import {useState} from 'react';
import {LayoutSize, useLayoutInfo} from './components/LayoutInfo';

const App = () => {
  const theme = useTheme();
  const layout = useLayoutInfo();

  // Change number of columns based on window size
  const columnCount =
    layout.layoutSize === LayoutSize.large
      ? 3
      : layout.layoutSize === LayoutSize.medium
      ? 2
      : 1;

  const categories = ['All', 'Sewing', 'Cross Stitch', 'Crochet', 'Embroidery'];
  const [currentCategory, setCurrentCategory] = useState('All');
  const [textOnlyMode, setTextOnlyMode] = useState(false);

  const displayModeHandler = (textOnly: boolean) => {
    // We want the text only mode to always show all sellers
    if (textOnly) {
      setCurrentCategory('All');
    }
    setTextOnlyMode(textOnly);
  };

  const sellers: Seller[] = sellersJson.sellers;
  const filteredSellers = sellers
    // Filter the sellers for current category (or 'All')
    .filter(seller => {
      if (currentCategory === 'All') {
        return seller;
      }
      if (
        [
          seller.category1,
          seller.category2,
          seller.category3,
          seller.category4,
        ].includes(currentCategory)
      ) {
        return seller;
      }
    })
    // Now shuffle the sellers by adding a random key to each and sorting on it
    .map(value => ({value, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .map(({value}) => value);

  const HeaderComponent = () => {
    return (
      <View
        style={[
          styles.fullWidth,
          styles.horizontal,
          styles.centered,
          {
            backgroundColor: theme.colors.primary,
          },
        ]}>
        {/* Here is our middle box providing a little framing */}
        <View style={styles.headerMiddleBox}>
          {/* Here is our box with text in it */}
          <View style={styles.headerTextContainer}>
            <Headline
              style={[
                styles.centered,
                styles.headerHeadline,
                styles.blackText,
              ]}>
              Ukraine Digital Etsy Sellers List
            </Headline>
            <Text
              style={[
                styles.paddedText,
                styles.centeredText,
                styles.blackText,
              ]}>
              If you can spare a few dollars, you can buy something directly
              from a Ukrainian-owned small business. They can really use our
              help now and why not check out all the great creativity of our
              fellow makers experiencing some seriously trying times. Thanks to
              everyone who bought, or shared this information.
            </Text>
            <Text
              style={[
                styles.paddedText,
                styles.centeredText,
                styles.blackText,
              ]}>
              Below are some Ukrainian Etsy sellers who sell digital patterns
              and tutorials for crafty things I like. If you want to put
              together your own list of other digital sellers using this format,
              it's an open source project that{' '}
              <a href="https://github.com/mikehardy">mikehardy</a> and I built
              and it's on Github.
            </Text>
            <Text
              style={[
                styles.paddedText,
                styles.centeredText,
                styles.blackText,
              ]}>
              For the simple text-only version{' '}
              <Pressable onPress={() => displayModeHandler(true)}>
                <Text style={styles.linkText}>go here</Text>
              </Pressable>
              .
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      {textOnlyMode && (
        <ScrollView
          style={[
            // styles.centered,
            styles.flex1,
            styles.paddedText,
            // {backgroundColor: theme.colors.background},
          ]}>
          <Text
            style={[styles.paddedText, styles.centeredText, styles.blackText]}>
            For the full version{' '}
            <Pressable onPress={() => displayModeHandler(false)}>
              <Text style={styles.linkText}>go here</Text>
            </Pressable>
            .
          </Text>
          <Text
            style={[styles.paddedText, styles.centeredText, styles.blackText]}>
            Ukraine Digital Etsy Sellers List
          </Text>
          <View style={styles.paddedText} />
          {filteredSellers.map(seller => {
            const etsyUrl = 'https://etsy.com/shop/' + seller.etsyShopId;
            const instaUrl = 'https://instagram.com/' + seller.instagram;
            return (
              <>
                <Pressable onPress={() => Linking.openURL(etsyUrl)}>
                  <Text style={styles.linkText}>{etsyUrl}</Text>
                </Pressable>
                <Text style={styles.blackText}>
                  Seller: {seller.seller}
                  {seller.city ? ' in ' + seller.city : ''}
                </Text>
                {seller.instagram !== undefined && seller.instagram !== '' && (
                  <Pressable onPress={() => Linking.openURL(instaUrl)}>
                    <Text style={styles.linkText}>
                      Instagram @{seller.instagram}
                    </Text>
                  </Pressable>
                )}
                <Text style={styles.blackText}>{seller.products}</Text>
                <View style={styles.paddedText} />
              </>
            );
          })}
        </ScrollView>
      )}
      {!textOnlyMode && (
        <View
          style={[
            styles.centered,
            styles.flex1,
            {backgroundColor: theme.colors.background},
          ]}>
          {/* Seller cards here */}
          <FlatList
            ListHeaderComponent={HeaderComponent}
            persistentScrollbar={true}
            style={[styles.fullWidth, styles.flex1]}
            initialNumToRender={12}
            contentContainerStyle={styles.flastListContent}
            data={filteredSellers}
            keyExtractor={(_unusued, index) => index + ''}
            key={columnCount}
            numColumns={columnCount}
            renderItem={({item, index}) => {
              // console.log('seller is ' + JSON.stringify(item));
              return <SellerCard key={index} seller={item} />;
            }}
          />

          {/* Category selectors here */}
          <View style={styles.horizontal}>
            {categories.map(category => {
              // console.log('current category? ' + currentCategory);
              return (
                <HoverButton
                  key={category}
                  buttonLabel={category}
                  selected={category === currentCategory ? true : false}
                  onPress={(arg: string) => setCurrentCategory(arg)}
                />
              );
            })}
          </View>
          {/* Category selectors end */}

          {/* End seller cards */}
          <Text>
            If you would like to add a shop to this list or make a correction,
            contact me at Instagram. @desewtropia
          </Text>
        </View>
      )}
    </>
  );
};

const TabbedApp = () => {
  const appSettings = useAppSettings();

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <PaperProvider theme={appSettings.currentTheme}>
        <NavigationContainer
          theme={appSettings.currentTheme}
          linking={{
            prefixes: ['teresahardy.com/ukraine', 'localhost'],
            config: {
              screens: {
                Home: {
                  path: '', // omit '/Home' in the browser URL bar, this is our '/' URL (vs '/App/Home')
                },
                // Seller: 'seller/:etsyShopId?',
              },
            },
          }}
          documentTitle={{
            formatter: (options, route) =>
              `${appJson.displayName}${
                options?.title || route?.name
                  ? ' - ' + options?.title ?? route?.name
                  : ' '
              }`,
          }}>
          {/* <TopTabNavigator /> */}
          <App />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
    flexGrow: 1,
  },
  centered: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredText: {textAlign: 'center'},
  paddedText: {padding: 20},
  horizontal: {
    flexDirection: 'row',
  },
  fullWidth: {
    width: '100%',
    // flex: 1,
    // flexGrow: 1,
  },
  flastListContent: {
    width: '100%',
    heigth: '100%',
    flex: 1,
    flexGrow: 1,
    alignContent: 'center',
    //justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    //   paddingHorizontal: 24,
  },
  headerMiddleBox: {
    width: '50%',
    margin: 10,
    padding: 10,
    // alignContent: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignSelf: 'center',
    backgroundColor: '#404040',
  },
  headerTextContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 20,
    paddingVertical: 30,
    margin: 20,
  },
  headerHeadline: {paddingBottom: 10, textAlign: 'center'},
  whiteText: {color: 'white'},
  blackText: {color: 'black'},
  linkText: {color: 'blue', textDecorationLine: 'underline'},
  // sectionTitle: {
  //   fontSize: 24,
  //   fontWeight: '600',
  // },
  // sectionDescription: {
  //   marginTop: 8,
  //   fontSize: 18,
  //   fontWeight: '400',
  // },
  // highlight: {
  //   fontWeight: '700',
  // },
});

export default TabbedApp;
