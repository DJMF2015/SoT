import React from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';

const Settings = () => {
  return (
    <SafeAreaView>
      <Text style={styles.container}>SETTINGS PLACEHOLDER</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    color: 'black',
    display: 'flex',
  },
});

export default Settings;
