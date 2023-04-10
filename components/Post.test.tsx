import React from 'react';
import {BLOCKS} from '@contentful/rich-text-types';
import Post from './Post';
import {render} from '@testing-library/react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from './HomeStack';
import type {Document} from '@contentful/rich-text-types';

const mockPostContent: Document = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: BLOCKS.HEADING_1,
      data: {},
      content: [{nodeType: 'text', value: 'Post Title', marks: [], data: {}}],
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'React native testing is nothing but pain',
          marks: [],
          data: {},
        },
      ],
    },
  ],
};

const mockedRichTextData = {
  data: {
    postCollection: {
      items: [
        {
          nodeType: BLOCKS.DOCUMENT,
          title: 'Mocked Post data',
          content: {
            json: mockPostContent,
          },
        },
      ],
    },
  },
};

const mockRoute: RouteProp<RootStackParamList, 'Post Page'> = {
  key: 'mock key',
  name: 'Post Page',
  params: {
    postContent: mockedRichTextData.data.postCollection.items[0].content.json,
    postImage: 'https://mocked-content-image-fake-link/image.png',
    postName: mockedRichTextData.data.postCollection.items[0].title,
  },
};

describe('Post', () => {
  it('renders the post name, cover image, and content', () => {
    const {getByText, getByLabelText} = render(<Post route={mockRoute} />);
    expect(getByText('React native testing is nothing but pain')).toBeDefined();
    expect(getByLabelText('Post image')).toBeDefined();
    expect(getByText('Post Title')).toBeDefined();
    const img = getByLabelText('Post image');
    expect(img.props.source.uri).toBe(
      'https://mocked-content-image-fake-link/image.png',
    );
  });
});
