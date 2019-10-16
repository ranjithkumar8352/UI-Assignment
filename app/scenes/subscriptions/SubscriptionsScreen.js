import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Component } from 'react';

import AntIcon from 'react-native-vector-icons/AntDesign';
import FeatureSwiper from './FeatureSwiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import RateCard from './RateCard';

export default class Subscriptions extends Component {
  state = {
    selectedPlan: 'yearly',
    couponInput: '',
  };
  render() {
    const { selectedPlan } = this.state;
    return (
      <LinearGradient colors={['#F2D3B2', '#8D81FB']} style={styles.gradientBg}>
        <ScrollView contentContainerStyle={styles.container}>
          <Image
            source={require('../../images/ora_premium_logo.png')}
            style={styles.logo}
          />
          <Text style={styles.unlockText}>UNLOCK FREE TRIAL</Text>
          <View style={styles.swiperContainer}>
            <FeatureSwiper features={features} />
          </View>
          <View style={styles.pricingContainer}>
            <View style={styles.rateCardContainer}>
              <RateCard
                plan="monthly"
                price={5.99}
                isSelected={selectedPlan === 'monthly'}
                onSelect={this.onPlanSelect}
              />
            </View>
            <Text style={styles.pricingCaption}>OR</Text>
            <View style={styles.rateCardContainer}>
              <RateCard
                plan="yearly"
                price={49.99}
                isSelected={selectedPlan === 'yearly'}
                onSelect={this.onPlanSelect}
              />
            </View>
          </View>
          <View style={styles.couponContainer}>{this.renderCouponBlock()}</View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>START FREE TRIAL</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.disclaimer}>
            Donec laoreet suscipit vehicula. Morbi ullamcorper ipsum magna, vel
            venenatis lectus sagittis et. Nunc pulvinar commodo velit, eu varius
            mauris. Vivamus eget viverra arcu. Proin accumsan lectus non arcu
            bibendum hendrerit. Cras tincidunt tincidunt dui, et bibendum nisl
            luctus et. Morbi consectetur non magna nec finibus.
          </Text>
        </ScrollView>
      </LinearGradient>
    );
  }

  renderCouponBlock = () => {
    if (this.state.verifyingCoupon) {
      return <ActivityIndicator color="white" size="small" />;
    } else if (this.state.couponApplied) {
      return (
        <View style={styles.couponAppliedBlock}>
          <AntIcon name="clockcircle" size={12} color="white" />
          <Text style={styles.couponAppliedText}>
            Coupon valid for <Text style={styles.bold}>10hrs 22mins</Text>
          </Text>
        </View>
      );
    } else {
      return (
        <View>
          {this.renderCouponPlaceholder()}
          <TextInput
            style={styles.couponInput}
            selectionColor="white"
            value={this.state.couponInput}
            onChangeText={val => this.setState({ couponInput: val })}
            onSubmitEditing={this.onCouponSubmit}
          />
        </View>
      );
    }
  };

  renderCouponPlaceholder = () => {
    if (this.state.couponInput === '') {
      return (
        <View style={styles.placeholder}>
          <Icon
            name="ticket"
            color="white"
            size={18}
            style={styles.couponIcon}
          />
          <Text style={styles.placeholderText}>Have a Coupon?</Text>
        </View>
      );
    }
  };

  onPlanSelect = selectedPlan => {
    this.setState({ selectedPlan });
  };

  onCouponSubmit = () => {
    const coupon = this.state.couponInput;
    if (coupon) {
      this.setState({ verifyingCoupon: true });
    }
    setTimeout(() => {
      this.setState({ verifyingCoupon: false, couponApplied: true });
    }, 1000);
  };
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
  swiperContainer: {
    height: 230,
    backgroundColor: 'white',
    elevation: 4,
    borderRadius: 10,
  },
  pricingContainer: {
    marginVertical: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pricingCaption: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    lineHeight: 17,
    color: 'white',
  },
  couponContainer: {
    marginBottom: 15,
    marginHorizontal: 70,
    height: 30,
    justifyContent: 'center',
  },
  couponInput: {
    textAlign: 'center',
    backgroundColor: 'rgba(112, 112, 112, 0.4)',
    borderRadius: 15,
    color: 'white',
    fontSize: 13,
    fontFamily: 'Lato-Regular',
    paddingVertical: 0,
  },
  placeholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontFamily: 'Lato-Regular',
  },
  couponIcon: {
    transform: [{ rotate: '-90deg' }],
    marginRight: 4,
  },
  buttonContainer: {
    marginBottom: 15,
  },
  button: {
    elevation: 5,
    backgroundColor: '#E88987',
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
    borderRadius: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Lato-Bold',
  },
  disclaimer: {
    fontSize: 10,
    color: 'white',
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
    marginHorizontal: 5,
  },
  rateCardContainer: {
    flex: 0.45,
  },
  couponAppliedBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  couponAppliedText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
    fontFamily: 'Lato-Regular',
    marginLeft: 5,
  },
  bold: {
    fontFamily: 'Lato-Bold',
  },
});

const features = [
  {
    title: 'Compatibility Matching',
    image: require('../../images/premium-feature.png'),
    description:
      'Donec laoreet suscipit vehicula. Morbi ullamcorper ipsum magna, velvenenatis lectus sagittis et. Nunc pulvinar',
  },
  {
    title: 'Compatibility Matching',
    image: require('../../images/premium-feature.png'),
    description:
      'Donec laoreet suscipit vehicula. Morbi ullamcorper ipsum magna, velvenenatis lectus sagittis et. Nunc pulvinar',
  },
  {
    title: 'Compatibility Matching',
    image: require('../../images/premium-feature.png'),
    description:
      'Donec laoreet suscipit vehicula. Morbi ullamcorper ipsum magna, velvenenatis lectus sagittis et. Nunc pulvinar',
  },
];
