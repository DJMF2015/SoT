import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';

export type HeadingProps = {
  type: 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6';
  children: React.ReactNode;
  style?: TextStyle;
};

const Heading = (props: HeadingProps) => {
  return (
    <Text style={style[props.type]} {...props}>
      {props.children}
    </Text>
  );
};

const fontFamily = 'Poppins-SemiBold';
const color = '#323232';
const marginTop = 10;
const marginBottom = 5;

const style = StyleSheet.create({
  H1: {
    fontFamily,
    fontSize: 32,
    color,
    marginTop,
    marginBottom,
  },
  H2: {
    fontFamily,
    fontSize: 26,
    color,
    marginTop,
    marginBottom,
  },
  H3: {
    fontFamily,
    fontSize: 24,
    color,
    marginTop,
    marginBottom,
  },
  H4: {
    fontFamily,
    fontSize: 20,
    color,
    marginTop,
    marginBottom,
  },
  H5: {
    fontFamily,
    fontSize: 18,
    color,
    marginTop,
    marginBottom,
  },
  H6: {
    fontFamily,
    fontSize: 16,
    color,
    marginTop,
    marginBottom,
  },
});

export default Heading;
