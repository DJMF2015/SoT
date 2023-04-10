import React from 'react';
import CategoryPage from './CategoryPage';
import {useQuery} from '@apollo/client';
import {render, screen} from '@testing-library/react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from './HomeStack';

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
  gql: jest.fn(),
}));

const mockNavigation: any = {
  navigate: jest.fn(),
};

const mockRoute: RouteProp<RootStackParamList, 'Category Page'> = {
  key: 'mock key',
  name: 'Category Page',
  params: {
    categoryId: 'faqs',
    categoryName: 'mock category page',
    categoryImage: 'image',
  },
};

describe('CategoryPage', () => {
  it('exports a function', () => {
    expect(typeof CategoryPage).toBe('function');
  });

  it('should render title', () => {
    (useQuery as jest.Mock).mockReturnValueOnce({
      loading: false,
      error: false,
      data: {
        postCollection: {
          items: [
            {
              __typename: 'Post',
              category: ['faqs'],
              content: {__typename: 'PostContent', json: {}},
              coverImage: {
                __typename: 'Asset',
                url: 'test url',
              },
              title: 'Test title',
            },
          ],
        },
      },
    });

    render(<CategoryPage route={mockRoute} navigation={mockNavigation} />);
    const title = screen.getByText('Test title');

    expect(title).toBeDefined();
  });

  it('should return an error when error is defined', () => {
    (useQuery as jest.Mock).mockReturnValueOnce({
      loading: false,
      error: {message: 'test error'},
      data: {
        postCollection: {
          items: [
            {
              __typename: 'Post',
              category: ['faqs'],
              content: {__typename: 'PostContent', json: {}},
              coverImage: {
                __typename: 'Asset',
                url: 'test url',
              },
              title: 'Test title',
            },
          ],
        },
      },
    });

    render(<CategoryPage route={mockRoute} navigation={mockNavigation} />);
    const error = screen.getByText('test error');

    expect(error).toBeDefined();
  });
});
