import React from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';

const Bookmarks = () => {
  return (
    <SafeAreaView>
      <Text style={styles.container}>BOOKMARKS PLACEHOLDER</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    color: 'black',
    display: 'flex',
  },
});

export default Bookmarks;
