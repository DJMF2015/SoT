import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react-native';
import App from './App';

jest.mock('react-native-safe-area-context', () => {
  const inset = {top: 0, right: 0, bottom: 0, left: 0};
  return {
    ...jest.requireActual('react-native-safe-area-context'),
    SafeAreaProvider: jest.fn(({children}) => children),
    SafeAreaConsumer: jest.fn(({children}) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => ({x: 0, y: 0, width: 390, height: 844})),
  };
});

describe('App', () => {
  it('renders the App component successfully', () => {
    render(<App />);
  });

  it('renders Loading component when fetching data', () => {
    render(<App />);
    expect(screen.getByTestId('categories-page-loader')).toBeDefined();
  });

  it('renders the tab navigation bar', () => {
    render(<App />);
    const home = screen.getByRole('button', {
      name: 'Home, tab, 1 of 4',
    });

    const bookmarks = screen.getByRole('button', {
      name: 'Bookmarks, tab, 2 of 4',
    });

    const search = screen.getByRole('button', {
      name: 'Search, tab, 3 of 4',
    });

    const settings = screen.getByRole('button', {
      name: 'Settings, tab, 4 of 4',
    });

    expect(home).toBeDefined();
    expect(bookmarks).toBeDefined();
    expect(search).toBeDefined();
    expect(settings).toBeDefined();
    expect(screen.getAllByRole('button')).toHaveLength(4);
  });

  it('renders the home screen when home tab is pressed', () => {
    render(<App />);
    const home = screen.getByRole('button', {
      name: 'Home, tab, 1 of 4',
    });
    fireEvent.press(home);
    expect(screen.getByTestId('categories-page-loader')).toBeDefined();
  });

  it('renders the bookmark screen when bookmark tab is pressed', () => {
    render(<App />);
    const bookmarks = screen.getByRole('button', {
      name: 'Bookmarks, tab, 2 of 4',
    });
    fireEvent.press(bookmarks);
    expect(screen.getByText('BOOKMARKS PLACEHOLDER')).toBeDefined();
  });

  it('renders the search screen when search tab is pressed', () => {
    render(<App />);
    const search = screen.getByRole('button', {
      name: 'Search, tab, 3 of 4',
    });
    fireEvent.press(search);
    expect(screen.getByText('SEARCH PLACEHOLDER')).toBeDefined();
  });

  it('renders the settings screen when settings tab is pressed', () => {
    render(<App />);
    const settings = screen.getByRole('button', {
      name: 'Settings, tab, 4 of 4',
    });
    fireEvent.press(settings);
    expect(screen.getByText('SETTINGS PLACEHOLDER')).toBeDefined();
  });
});
