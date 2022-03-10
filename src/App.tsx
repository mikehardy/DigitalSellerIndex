import appJson from './app.json';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider, Title, useTheme} from 'react-native-paper';

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

  const categories = [
    'All',
    'Sewing',
    'Cross Stitch',
    'Knit/Crochet',
    'Embroidery',
  ];
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
      <Title style={styles.centered}>Digital Seller Index</Title>

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
      <FlatList
        persistentScrollbar={true}
        style={styles.flatList}
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
  },
  centered: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontal: {
    flexDirection: 'row',
  },
  flatList: {
    width: '100%',
    flex: 1,
    flexGrow: 1,
  },
  flastListContent: {
    // borderColor: 'red',
    // borderWidth: 1,
    width: '100%',
    heigth: '100%',
    flex: 1,
    flexGrow: 1,
    alignContent: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  // sectionContainer: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  // },
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
