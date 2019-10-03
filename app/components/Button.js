import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import React from 'react';

const Button = props => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#EAD1DC',
    borderRadius: 20,
    backgroundColor: 'white',
    elevation: 3,
  },
  buttonText: {
    color: '#EAD1DC',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default Button;
