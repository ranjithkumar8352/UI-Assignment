import { Image, StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';

import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';

export default class Subscriptions extends Component {
  render() {
    return (
      <LinearGradient colors={['#F2D3B2', '#8D81FB']} style={styles.gradientBg}>
        <View style={styles.container}>
          <Image
            source={require('../images/ora_premium_logo.png')}
            style={styles.logo}
          />
          <Text style={styles.unlockText}>UNLOCK FREE TRIAL</Text>
          <View style={styles.swiperContainer}>{this.renderSwiper()}</View>
        </View>
      </LinearGradient>
    );
  }
  renderSwiper = () => (
    <Swiper
      style={styles.swiperWrapper}
      dotStyle={[styles.dotStyle, styles.inActiveDotStyle]}
      activeDotStyle={[styles.dotStyle, styles.activeDotStyle]}
      paginationStyle={styles.swiperPagination}>
      {features.map(feature => (
        <View style={styles.slide}>
          <Text style={styles.featureTitle}>{feature.title}</Text>
          <Image source={feature.image} style={styles.featureImage} />
          <Text style={styles.featureDescription}>{feature.description}</Text>
        </View>
      ))}
    </Swiper>
  );

  swiperDot = () => <View style={styles.swiperDot} />;
}

const styles = StyleSheet.create({
  gradientBg: {
    flex: 1,
  },
  container: {
    padding: 15,
  },
  logo: {
    height: 95,
    width: 95,
    alignSelf: 'center',
  },
  unlockText: {
    fontFamily: 'Lato-Bold',
    color: 'white',
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
    marginVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'center',
    paddingVertical: 2,
    paddingHorizontal: 20,
    borderColor: '#707070',
    borderRadius: 10,
  },
  slide: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  swiperContainer: {
    height: 220,
    backgroundColor: 'white',
    elevation: 4,
    borderRadius: 10,
  },
  swiperWrapper: {
    backgroundColor: 'transparent',
    borderRadius: 10,
  },
  featureTitle: {
    fontSize: 16,
    lineHeight: 19,
    color: '#707070',
    fontFamily: 'Lato-Bold',
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
  swiperDot: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 15,
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

const features = [
  {
    title: 'Compatibility Matching',
    image: require('../images/premium-feature.png'),
    description:
      'Donec laoreet suscipit vehicula. Morbi ullamcorper ipsum magna, velvenenatis lectus sagittis et. Nunc pulvinar',
  },
  {
    title: 'Compatibility Matching',
    image: require('../images/premium-feature.png'),
    description:
      'Donec laoreet suscipit vehicula. Morbi ullamcorper ipsum magna, velvenenatis lectus sagittis et. Nunc pulvinar',
  },
  {
    title: 'Compatibility Matching',
    image: require('../images/premium-feature.png'),
    description:
      'Donec laoreet suscipit vehicula. Morbi ullamcorper ipsum magna, velvenenatis lectus sagittis et. Nunc pulvinar',
  },
];
