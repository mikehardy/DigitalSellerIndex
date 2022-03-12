import appJson from './app.json';
import {FlatList, StyleSheet, View} from 'react-native';
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

  const sellers: Seller[] = sellersJson.sellers;
  return (
    <View
      style={[
        styles.centered,
        styles.flex1,
        {backgroundColor: theme.colors.background},
      ]}>
      {/* Header content here */}
      {/* Here is our external blue box */}
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
            <Headline style={[styles.centered, styles.headerHeadline]}>
              Digital Seller Index
            </Headline>
            <Text style={styles.centeredText}>
              If you can spare a few dollars, you can buy something directly
              from a Ukrainian owned small business. They can really use our
              help now and why not check out all the great creativity of our
              fellow makers experiencing some seriously trying times. Thanks to
              everyone who bought, or shared this information. For a plain, copy
              and pastable version, go here: Ukrainian Digital Etsy Sellers List
              (simple)
            </Text>
          </View>
        </View>
      </View>
      {/* Header content end */}

      {/* Category selectors here */}
      <View style={styles.horizontal}>
        {categories.map(category => {
          console.log('current category? ' + currentCategory);
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

      {/* Seller cards here */}
      <FlatList
        persistentScrollbar={true}
        style={[styles.fullWidth, styles.flex1]}
        initialNumToRender={12}
        contentContainerStyle={styles.flastListContent}
        data={sellers.filter(seller => {
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
        })}
        keyExtractor={(_unusued, index) => index + ''}
        key={columnCount}
        numColumns={columnCount}
        renderItem={({item, index}) => {
          // console.log('seller is ' + JSON.stringify(item));
          return <SellerCard key={index} seller={item} />;
        }}
      />
      {/* End seller cards */}
      <Text>
        If you would like to add a shop to this list or make a correction,
        contact me at Instagram. @desewtropia
      </Text>
    </View>
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
            prefixes: ['teresahardy.com/digitalsellers', 'localhost'],
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
    backgroundColor: 'black',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 20,
    paddingVertical: 30,
  },
  headerHeadline: {paddingBottom: 10, textAlign: 'center'},
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
