import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Component } from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

type Props = { plan?: string, onSelect?: Function };

export default class RateCard extends Component<Props> {
  render() {
    const isMonthly = this.props.plan === 'monthly';
    const isSelected = this.props.isSelected;
    const [dollars, cents] = this.props.price.toString().split('.');
    return (
      <TouchableOpacity onPress={this.onSelect} activeOpacity={0.8}>
        <View
          style={[
            styles.container,
            isSelected ? styles.Active : styles.inActive,
          ]}>
          <View style={styles.withPadding}>
            <Text style={styles.subTitle}>BILLED</Text>
            <View style={styles.titleBlock}>
              <Text style={styles.title}>
                {isMonthly ? 'MONTHLY' : 'ANNUALLY'}
              </Text>
              {isSelected ? (
                <Icon name="ios-radio-button-on" color="#E88987" size={20} />
              ) : (
                <Icon name="ios-radio-button-off" color="#a5a5a5" size={20} />
              )}
            </View>
          </View>
          <View style={styles.ribbonContainer}>
            {!isMonthly && (
              <ImageBackground
                source={require('../../images/ribbon.png')}
                style={styles.ribbon}>
                <Text style={styles.ribbonText}>BEST OFFER</Text>
              </ImageBackground>
            )}
          </View>
          <View style={styles.withPadding}>
            <Text style={styles.price}>
              ${dollars}
              {cents ? '.' : null}
              {cents ? <Text style={styles.cents}>{cents}</Text> : null}
            </Text>
            <Text style={styles.daysFree}>7 Days Free</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  onSelect = () => {
    if (this.props.onSelect) {
      this.props.onSelect(this.props.plan);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    elevation: 4,
    borderRadius: 10,
  },
  withPadding: {
    paddingHorizontal: 15,
  },
  subTitle: {
    fontSize: 10,
    lineHeight: 12,
    color: '#707070',
    marginTop: 6,
  },
  titleBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Lato-Bold',
    marginTop: 2,
    fontSize: 16,
    lineHeight: 19,
    color: '#707070',
  },
  ribbonContainer: {
    height: 21,
    marginVertical: 6,
    alignItems: 'flex-end',
  },
  ribbon: {
    width: 92,
    height: 21,
    paddingLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ribbonText: {
    color: 'white',
    fontFamily: 'Lato-Bold',
    fontSize: 12,
  },
  price: {
    color: '#707070',
    fontSize: 28,
    fontFamily: 'Lato-Bold',
  },
  cents: {
    fontSize: 20,
  },
  inActive: {
    opacity: 0.7,
  },
  active: {
    opacity: 1,
  },
  daysFree: {
    fontSize: 16,
    lineHeight: 19,
    fontFamily: 'Lato-Regular',
    color: '#707070',
    marginTop: 2,
    marginBottom: 5,
  },
});
