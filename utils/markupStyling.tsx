// @ts-nocheck
import React from 'react';
import {BLOCKS, INLINES, MARKS} from '@contentful/rich-text-types';
import {StyleSheet, Text, View, Linking, Image, Dimensions} from 'react-native';
import Paragraph from '../components/Text/Paragraph';
import Heading from '../components/Text/Heading';
import {gql, useQuery} from '@apollo/client';
import Loader from '../components/Common/Loader';

const GET_MEDIA_ASSET = gql`
  query getMediaAssetQuery($mediaId: String!) {
    asset(id: $mediaId) {
      url
      contentType
      height
      width
    }
  }
`;

export const contentfulToReactnative: Options = {
  renderMark: {
    [MARKS.UNDERLINE]: text => {
      return <Paragraph type="underline">{text}</Paragraph>;
    },
    [MARKS.BOLD]: text => {
      return <Paragraph type="bold">{text}</Paragraph>;
    },
    [MARKS.ITALIC]: text => {
      return <Paragraph type="italic">{text}</Paragraph>;
    },
    [MARKS.CODE]: text => {
      return <Paragraph type="code">{text}</Paragraph>;
    },
  },
  renderNode: {
    [INLINES.HYPERLINK]: (node, children) => (
      <Paragraph
        type="hyperlink"
        onPress={() => Linking.openURL(node.data.uri)}>
        {children}
      </Paragraph>
    ),
    [BLOCKS.EMBEDDED_ENTRY]: () => {
      return null;
    },
    [BLOCKS.PARAGRAPH]: (node, children) => <Paragraph>{children}</Paragraph>,
    [BLOCKS.EMBEDDED_ASSET]: node => {
      const {loading, error, data} = useQuery(GET_MEDIA_ASSET, {
        variables: {mediaId: node.data.target.sys.id},
      });

      if (loading) {
        return <Loader />;
      }

      if (error) {
        return <Text>{error.message}</Text>;
      }

      let percentage = 0.75;

      return (
        // eslint-disable-next-line react-native/no-inline-styles
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{
              width: Dimensions.get('window').width * percentage,
              aspectRatio: data.asset.width / data.asset.height,
            }}
            src={data.asset.url}
          />
        </View>
      );
    },
    [BLOCKS.HEADING_1]: (node, children) => (
      <Heading type="H1">{children}</Heading>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <Heading type="H2">{children}</Heading>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <Heading type="H3">{children}</Heading>
    ),
    [BLOCKS.HEADING_4]: (node, children) => (
      <Heading type="H4">{children}</Heading>
    ),
    [BLOCKS.HEADING_5]: (node, children) => (
      <Heading type="H5">{children}</Heading>
    ),
    [BLOCKS.HEADING_6]: (node, children) => (
      <Heading type="H6">{children}</Heading>
    ),
    [BLOCKS.UL_LIST]: (node, children) => {
      return (
        <View style={styles.bulletList}>
          {children?.map((child, i) => {
            return (
              <View key={i} style={styles.bulletListItem}>
                <Text style={styles.bullet}>•</Text>
                {child}
              </View>
            );
          })}
        </View>
      );
    },
    [BLOCKS.OL_LIST]: (node, children) => {
      return (
        <View style={styles.bulletList}>
          {children?.map((child, i) => {
            return (
              <View key={i} style={styles.bulletListItem}>
                <Text style={styles.bullet}>{i + 1}.</Text>
                {child}
              </View>
            );
          })}
        </View>
      );
    },
    [BLOCKS.LIST_ITEM]: (node, child) => {
      return <View>{child}</View>;
    },
    [BLOCKS.QUOTE]: (node, child) => {
      return (
        <View style={styles.quoteContainer}>
          <Paragraph type="quote">{child}</Paragraph>
        </View>
      );
    },
    [BLOCKS.HR]: () => {
      return <View style={styles.hr} />;
    },
  },
};

const styles = StyleSheet.create({
  postCoverImg: {
    width: 250,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  bulletList: {
    marginBottom: 10,
    width: '100%',
  },
  bulletListItem: {
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 5,
  },
  bullet: {
    marginRight: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  quoteContainer: {
    borderLeftWidth: 5,
    borderLeftColor: '#ff323c',
    paddingLeft: 10,
    backgroundColor: '#dcdedc',
  },
  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 15,
    marginTop: 15,
  },
});
