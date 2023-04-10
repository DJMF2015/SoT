import React from 'react';
import {StyleSheet, View, Image, FlatList, Pressable} from 'react-native';
import {useQuery, gql} from '@apollo/client';
import Loader from './Common/Loader';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {RootStackParamList} from './HomeStack';
import Paragraph from './Text/Paragraph';
import Heading from './Text/Heading';

export type CategoriesPageNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Categories',
  undefined
>;

export const GET_CATEGORY_TILE_COLLECTION = gql`
  query categoriesQuery {
    categoryTileCollection {
      items {
        categoryName
        categoryId
        categoryImage {
          url
        }
      }
    }
  }
`;

const CategoriesPage = ({
  navigation,
}: {
  navigation: CategoriesPageNavigationProps;
}) => {
  const {loading, error, data} = useQuery(GET_CATEGORY_TILE_COLLECTION);
  if (loading) {
    return <Loader testID={'categories-page-loader'} />;
  }
  if (error) {
    return <Paragraph>{error.message}</Paragraph>;
  }

  return (
    <SafeAreaView edges={['right', 'bottom', 'left']}>
      <View style={styles.innerContainer}>
        <FlatList
          data={data.categoryTileCollection.items}
          renderItem={({item}) => (
            <View style={[styles.shadowProp, styles.tileContainer]}>
              <Pressable
                onPress={() =>
                  navigation.navigate('Category Page', {
                    categoryImage: item.categoryImage.url,
                    categoryName: item.categoryName,
                    categoryId: item.categoryId,
                  })
                }>
                <Image
                  style={styles.coverImg}
                  source={{
                    uri: item.categoryImage.url,
                  }}
                />
                <View style={styles.overlay} />
                <Heading style={styles.title} type={'H1'}>
                  {item.categoryName}
                </Heading>
              </Pressable>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    paddingBottom: 40,
    marginBottom: 40,
    width: '100%',
    height: '100%',
    marginTop: 20,
  },
  tileContainer: {
    display: 'flex',
    alignSelf: 'center',
    width: 360,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    elevation: 7,
  },
  title: {
    top: 50,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    color: 'white',
    fontSize: 20,
  },
  coverImg: {
    position: 'relative',
    width: 360,
    height: 130,
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 7},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
export default CategoriesPage;
