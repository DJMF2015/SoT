import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  Platform,
} from 'react-native';
import {useQuery, gql} from '@apollo/client';
import Loader from './Common/Loader';
import Paragraph from './Text/Paragraph';
import Heading from './Text/Heading';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from './HomeStack';

export type CategoryPageNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Category Page',
  undefined
>;

const GET_CATEGORY_TILE_COLLECTION = gql`
  query {
    postCollection {
      items {
        title
        content {
          json
        }
        category
        coverImage {
          url
        }
      }
    }
  }
`;

const CategoryPage = ({route, navigation}: CategoryPageNavigationProps) => {
  const {categoryId} = route.params;
  const {loading, error, data} = useQuery(GET_CATEGORY_TILE_COLLECTION);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Text>{error.message}</Text>;
  }

  let specifiedCategory = categoryId;
  let filteredArray = data.postCollection.items.filter(function (itm: {
    category: string;
  }) {
    return specifiedCategory.indexOf(itm.category) > -1;
  });

  filteredArray = {postCollection: filteredArray};

  return (
    <SafeAreaView edges={['right', 'bottom', 'left']}>
      <View style={styles.innerContainer}>
        <FlatList
          data={filteredArray.postCollection}
          renderItem={({item}) => (
            <View>
              <Pressable
                onPress={() =>
                  navigation.navigate('Post Page', {
                    postImage: item.coverImage.url,
                    postName: item.title,
                    postContent: item.content.json,
                  })
                }
                style={styles.tileContainer}>
                <Image
                  style={styles.coverImg}
                  source={{
                    uri: item.coverImage.url,
                  }}
                />
                <View>
                  <Text style={styles.title}>
                    <Heading type="H4">{item.title}</Heading>
                  </Text>
                  <Text style={styles.description}>
                    <Paragraph>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nam libero leo, maximus eu fringilla sed, egestas at
                      tellus. Cras odio dui, convallis ac efficitur tincidunt,
                      faucibus eu eros.
                    </Paragraph>
                  </Text>
                </View>
              </Pressable>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 5,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    borderRadius: 20,
  },
  innerContainer: {
    justifyContent: 'center',
    marginTop: 25,
  },
  categoryHeader: {
    alignItems: 'center',
  },
  categoryImage: {
    width: 250,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 30,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 10,
    color: '#ee2e34',
  },
  tileContainer: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    marginBottom: 25,
    marginLeft: 15,
    marginRight: 15,
    padding: 0,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 10,
    shadowColor: '#000000',
    backgroundColor: 'white',
    shadowOpacity: Platform.OS === 'ios' ? 0.2 : 0.5,
    elevation: Platform.OS === 'ios' ? 0 : 7,
    shadowRadius: 2,
    shadowOffset: {
      height: 4,
      width: 0,
    },
  },
  title: {
    marginTop: 15,
    marginLeft: 23,
    marginRight: 22,
    height: 35,
  },
  description: {
    marginLeft: 23,
    marginRight: 22,
    marginBottom: 33,
  },
  coverImg: {
    resizeMode: 'cover',
    height: 140,
    width: '100%',
    flex: 1,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 7},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default CategoryPage;
