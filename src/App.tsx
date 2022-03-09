import appJson from './app.json';
import {
  // Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  initialWindowMetrics,
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
// import {useLinkTo} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider, useTheme} from 'react-native-paper';

import {useAppSettings} from './components/AppSettings';

const App = () => {
  const theme = useTheme();
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View>
        <Text style={{color: theme.colors.text}}>Digital Seller Index</Text>
      </View>
    </ScrollView>
  );
};

// *****************************************************************************************************
// The rest of the file is to set up a react-navigation and react-native-vector-icons demonstration:
const Tab = createMaterialTopTabNavigator();
const TopTabNavigator = () => {
  // Used for status bar layout in react-navigation
  const insets = useSafeAreaInsets();

  // Allows us to use web-compatible navigation
  // const linkTo = useLinkTo();

  // Theming items
  const theme = useTheme();
  const backgroundStyle = {backgroundColor: theme.colors.background, flex: 1};

  const Seller = () => (
    <View style={[backgroundStyle, styles.detailsContainer]}>
      <Icon name="rocket" size={30} color={'red'} />
      <Text style={{color: theme.colors.text}}>
        If you see a rocket, react-native-vector-icons is working!
      </Text>
    </View>
  );

  const screenOptions = {
    tabBarStyle: {
      paddingTop: insets.top,
    },
  };

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Tab.Screen component={App} key={'Home'} name={'Home'} />
      <Tab.Screen component={Seller} key={'Seller'} name={'Seller'} />
    </Tab.Navigator>
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
                Seller: 'seller',
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
          <TopTabNavigator />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default TabbedApp;
