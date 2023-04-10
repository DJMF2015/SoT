import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {CONTENTFUL_SPACE_ID, CONTENTFUL_SPACE_TOKEN} from '@env';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import HomeStack from './components/HomeStack';
import Bookmarks from './components/Bookmarks';
import Settings from './components/Settings';
import Search from './components/Search';

type TabBarSettingsProps = {
  name: string;
  color: string;
  size: number;
  active: string;
};

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`,
  cache,
  credentials: 'same-origin',
  headers: {
    Authorization: `Bearer ${CONTENTFUL_SPACE_TOKEN}`,
  },
});

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#F8F8F8',
  },
};

const Tab = createBottomTabNavigator();

const tabBarSettings = ({
  name,
  color,
  size,
  active,
}: TabBarSettingsProps): BottomTabNavigationOptions => ({
  tabBarIcon: ({focused}) => (
    <Icon name={focused ? active : name} size={size} color={color} />
  ),
  tabBarShowLabel: false,
  headerShown: active !== 'home',
  headerTitleStyle: {
    fontSize: 20,
  },
  tabBarStyle: {
    justifyContent: 'space-between',
  },
  headerTitleAlign: 'center',
});

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={MyTheme}>
        <ApolloProvider client={client}>
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={HomeStack}
              options={tabBarSettings({
                name: 'home-outline',
                color: '#000',
                size: 30,
                active: 'home',
              })}
            />
            <Tab.Screen
              name="Bookmarks"
              component={Bookmarks}
              options={tabBarSettings({
                name: 'bookmarks-outline',
                color: '#000',
                size: 30,
                active: 'bookmarks',
              })}
            />
            <Tab.Screen
              name="Search"
              component={Search}
              options={tabBarSettings({
                name: 'search-outline',
                color: '#000',
                size: 30,
                active: 'search',
              })}
            />
            <Tab.Screen
              name="Settings"
              component={Settings}
              options={tabBarSettings({
                name: 'settings-outline',
                color: '#000',
                size: 30,
                active: 'settings',
              })}
            />
          </Tab.Navigator>
        </ApolloProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
