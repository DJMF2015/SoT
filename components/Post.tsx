import React from 'react';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import {StyleSheet, View, Image, ScrollView} from 'react-native';
import {contentfulToReactnative} from '../utils/markupStyling';
import type {RouteProp} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {RootStackParamList} from './HomeStack';

export type PostPageRouteProps = RouteProp<RootStackParamList, 'Post Page'>;

const Post = ({route}: {route: PostPageRouteProps}) => {
  const {postContent, postImage} = route.params;

  return (
    <SafeAreaView edges={['right', 'bottom', 'left']}>
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <Image
          style={styles.postImage}
          source={{
            uri: postImage,
          }}
          accessibilityLabel={'Post image'}
        />
        <View style={styles.postContent}>
          {documentToReactComponents(postContent, contentfulToReactnative)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    // Paddings to handle safe area
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  postImage: {
    width: '100%',
    height: 210,
    resizeMode: 'cover',
  },
  postTitle: {
    fontSize: 30,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 10,
  },
  postContent: {
    padding: 20,
  },
});

export default Post;
