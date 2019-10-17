import { Image, StyleSheet, Text, View } from 'react-native';

import React from 'react';
import Swiper from 'react-native-swiper';

type Props = {
  featues: Array<Object>,
};

export default function FeatureSwiper(props: Props) {
  return (
    <Swiper
      style={styles.swiperWrapper}
      dotStyle={[styles.dotStyle, styles.inActiveDotStyle]}
      activeDotStyle={[styles.dotStyle, styles.activeDotStyle]}
      paginationStyle={styles.swiperPagination}>
      {props.features.map(feature => (
        <View style={styles.slide}>
          <Text style={styles.featureTitle}>{feature.title}</Text>
          <Image source={feature.image} style={styles.featureImage} />
          <Text style={styles.featureDescription}>{feature.description}</Text>
        </View>
      ))}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  swiperWrapper: {
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  slide: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  featureTitle: {
    fontSize: 16,
    lineHeight: 19,
    color: '#606060',
    fontFamily: 'Lato-Bold',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  featureImage: {
    width: 120,
    height: 120,
    marginVertical: 9,
  },
  featureDescription: {
    color: '#707070',
    fontFamily: 'Lato-Regular',
    fontSize: 12,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  swiperPagination: {
    bottom: 5,
  },
  dotStyle: {
    width: 9,
    height: 9,
    borderRadius: 5,
    borderColor: '#D5D5D5',
    borderWidth: 1,
    marginLeft: 7.5,
    marginRight: 7.5,
    opacity: 0.75,
  },
  inActiveDotStyle: {
    backgroundColor: '#F6F6F6',
  },
  activeDotStyle: {
    backgroundColor: '#D5D5D5',
  },
});
