import React from 'react';
import {StyleSheet, Text, Platform} from 'react-native';
type ParagraphProps = {
  type?:
    | 'bold'
    | 'italic'
    | 'underline'
    | 'text'
    | 'code'
    | 'hyperlink'
    | 'quote';
  children: React.ReactNode;
};

const Paragraph = (props: ParagraphProps) => {
  return (
    <Text style={style[props.type || 'text']} {...props}>
      {props.children}
    </Text>
  );
};

const fontFamily = 'Poppins-Regular';
const color = '#323232';
const fontSize = 16;
const marginBottom = 10;

const style = StyleSheet.create({
  text: {
    fontFamily,
    fontSize,
    color,
    marginBottom,
    paddingRight: Platform.OS === 'android' ? 10 : 0,
  },
  bold: {
    fontFamily,
    fontSize,
    fontWeight: 'bold',
    color,
    marginBottom,
  },
  italic: {
    fontFamily: 'Poppins-Italic',
    fontSize,
    fontStyle: 'italic',
    color,
    marginBottom,
  },
  underline: {
    fontFamily,
    fontSize,
    textDecorationLine: 'underline',
    color,
    marginBottom,
  },
  code: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize,
    color,
    marginBottom,
    backgroundColor: '#dcdedc',
  },
  hyperlink: {
    fontFamily,
    fontSize,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#2897ff',
    marginBottom,
  },
  quote: {
    fontFamily: 'Poppins-Italic',
    fontSize,
    color,
    fontStyle: 'italic',
    marginBottom,
    marginTop: 10,
  },
});

export default Paragraph;
