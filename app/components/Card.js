import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Feather from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react';

const Card = props => {
  return (
    <View style={styles.container}>
      <View
        style={[styles.slide, props.item.special ? styles.specialBg : null]}>
        <View style={styles.navBar}>
          <TouchableOpacity>
            <FontAwesome name="calendar" size={16} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="share" size={16} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{`${props.item.monthName}  ${
          props.item.date
        }`}</Text>
        <Text style={styles.subTitle}>DAILY HOROSCOPE</Text>
        <Text style={styles.content}>
          A problem could come out this morning. Be careful of the words you
          choose. It appears as if you will be playing kiss and make up for the
          remaining of the day. You see progress and a new alignment occuring.
          Tonight: Finally smiling.
        </Text>
      </View>
      <View style={styles.planetContainer}>
        <Image style={styles.planet} source={require('../images/planet.png')} />
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    position: 'relative',
  },
  slide: {
    backgroundColor: '#606871',
    elevation: 3,
    height: 250,
    borderRadius: 8,
    padding: 15,
  },
  title: {
    marginTop: 5,
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 5,
  },
  subTitle: {
    marginTop: 2,
    textAlign: 'center',
    color: 'white',
    opacity: 0.6,
    fontSize: 9,
    letterSpacing: 1,
  },
  content: {
    fontSize: 12,
    lineHeight: 18,
    color: 'white',
    marginTop: 20,
    marginHorizontal: 20,
    textAlign: 'justify',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  planetContainer: {
    elevation: 4,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  planet: {
    width: 50,
    height: 50,
  },
  specialBg: {
    backgroundColor: '#ff7675',
  },
});
