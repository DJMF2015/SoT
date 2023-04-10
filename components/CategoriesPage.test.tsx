import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {MockedProvider, MockedResponse} from '@apollo/client/testing';
import CategoriesPage, {GET_CATEGORY_TILE_COLLECTION} from './CategoriesPage';

const mockNavigation: any = {
  navigate: jest.fn(),
};

const mockData: MockedResponse<Record<string, any>>[] = [
  {
    request: {
      query: GET_CATEGORY_TILE_COLLECTION,
    },
    result: () => {
      return {
        data: {
          categoryTileCollection: {
            items: [
              {
                categoryName: 'Category 1',
                categoryId: '123',
                categoryImage: {
                  url: 'https://mock-category-image-link/image1.png',
                },
              },
              {
                categoryName: 'Category 2',
                categoryId: '456',
                categoryImage: {
                  url: 'https://mock-category-image-link/image2.png',
                },
              },
            ],
          },
        },
      };
    },
  },
];

describe('CategoriesPage', () => {
  it('renders loading indicator while loading data', async () => {
    render(
      <MockedProvider mocks={mockData}>
        <CategoriesPage navigation={mockNavigation} />
      </MockedProvider>,
    );
    expect(screen.getByTestId('categories-page-loader')).toBeDefined();
  });

  it('renders error message when there is an error', async () => {
    const errorMock = {
      request: {
        query: GET_CATEGORY_TILE_COLLECTION,
      },
      error: new Error('Something went wrong'),
    };
    render(
      <MockedProvider mocks={[errorMock]}>
        <CategoriesPage navigation={mockNavigation} />
      </MockedProvider>,
    );

    expect(await screen.findByText('Something went wrong')).toBeDefined();
  });

  it('renders the category tiles when data has loaded', async () => {
    render(
      <MockedProvider mocks={mockData}>
        <CategoriesPage navigation={mockNavigation} />
      </MockedProvider>,
    );

    expect(await screen.findByText('Category 1')).toBeDefined();
    expect(await screen.findByText('Category 2')).toBeDefined();
  });

  it('navigates to the category page when category tile is pressed', async () => {
    render(
      <MockedProvider mocks={mockData}>
        <CategoriesPage navigation={mockNavigation} />
      </MockedProvider>,
    );

    fireEvent.press(await screen.findByText('Category 1'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Category Page', {
      categoryImage: 'https://mock-category-image-link/image1.png',
      categoryName: 'Category 1',
      categoryId: '123',
    });
  });
});
