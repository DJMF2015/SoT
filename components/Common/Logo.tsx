import React from 'react';
import {StyleSheet, Image, Text} from 'react-native';
import {useQuery, gql} from '@apollo/client';
import Loader from './Loader';

const GET_LOGO_COLLECTION = gql`
  query logoQuery {
    logoCollection {
      items {
        name
        image {
          url
        }
      }
    }
  }
`;

const Logo: React.FC = () => {
  const {loading, error, data} = useQuery(GET_LOGO_COLLECTION);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <Image
      style={styles.logo}
      source={{
        uri: data?.logoCollection?.items?.[0]?.image?.url,
      }}
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    position: 'absolute',
    top: -25,
    left: 0,
    height: 57,
    aspectRatio: '1/1',
    resizeMode: 'contain',
  },
});

export default Logo;
