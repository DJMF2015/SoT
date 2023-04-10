import React from 'react';
import CategoriesPage from './CategoriesPage';
import CategoryPage from './CategoryPage';
import Logo from './Common/Logo';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import Post from './Post';
import {Document} from '@contentful/rich-text-types';

export type RootStackParamList = {
  Categories: undefined;
  ['Category Page']: {
    categoryImage: string;
    categoryName: string;
    categoryId: string;
  };
  ['Post Page']: {
    postContent: Document;
    postImage?: string;
    postName?: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const appHeaderOptions: NativeStackNavigationOptions = {
  headerLeft: () => <Logo />,
  headerTitleStyle: {
    fontSize: 20,
  },
  headerTitleAlign: 'center',
};

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Categories"
      component={CategoriesPage}
      options={appHeaderOptions}
    />
    <Stack.Screen
      name="Category Page"
      options={({route}) => ({
        ...appHeaderOptions,
        headerLeft: () => null,
        title: route.params.categoryName,
      })}
      component={CategoryPage}
    />
    <Stack.Screen
      name="Post Page"
      component={Post}
      options={({route}) => ({
        title: route.params.postName,
        ...appHeaderOptions,
        headerLeft: () => null,
      })}
    />
  </Stack.Navigator>
);

export default HomeStack;
