import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Component } from 'react';

import { Actions } from 'react-native-router-flux';
import Button from '../components/Button';
import Card from '../components/Card';
import Carousel from 'react-native-snap-carousel';
import CircularSlider from '../components/CircularSlider';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import moment from 'moment';

const primaryColor = '#8EAEC8';

export default class Home extends Component {
  state = {
    startAngle: 0,
    angleLength: 0,
    data: this.getDates(),
  };

  getDates() {
    const today = moment();
    let dates = [
      {
        date: today.date(),
        month: today.month(),
        monthName: today.format('MMMM').toUpperCase(),
        year: today.year(),
      },
    ];
    for (let i = 0; i < 21; i++) {
      //next 21 days
      let date = moment(today).add(i + 1, 'days');
      dates.push({
        date: date.date(),
        month: date.month(),
        monthName: date.format('MMMM').toUpperCase(),
        year: date.year(),
      });
    }
    for (let i = 6; i >= 0; i--) {
      //Previous 7 days
      let date = moment(today).subtract(i + 1, 'days');
      dates.push({
        date: date.date(),
        month: date.month(),
        monthName: date.format('MMMM').toUpperCase(),
        year: date.year(),
      });
    }
    dates[12].special = true; //Key dates
    dates[20].special = true;
    dates[26].special = true;
    return dates;
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.innerContainer}>
        <View style={styles.navBar}>
          <View style={styles.leftNav}>
            <TouchableOpacity>
              <SimpleLineIcon
                name="settings"
                size={20}
                color={primaryColor}
                onPress={Actions.connections}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>
            Frankie <Text style={styles.bold}>Marshal</Text>
          </Text>
        </View>
        <Button title="VIEW NATAL CHART" />
        <View style={styles.sliderContainer}>
          <CircularSlider
            startAngle={this.state.startAngle}
            angleLength={this.state.angleLength}
            onUpdate={({ startAngle, angleLength }) =>
              this.setState({ startAngle, angleLength })
            }
            segments={5}
            strokeWidth={20}
            radius={140}
            gradientColorFrom={primaryColor}
            gradientColorTo={primaryColor}
            showInnerData
            innerDataColor={primaryColor}
            bgCircleColor={primaryColor}
            data={this.state.data}
            onValueChange={this.navigateToItem}
          />
        </View>
        <View style={styles.cardsContainer}>
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            scrollEnabled={false}
            data={this.state.data}
            renderItem={({ item, i }) => <Card item={item} />}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width * 0.7}
            layout={'stack'}
            layoutCardOffset={18}
          />
        </View>
      </ScrollView>
    );
  }

  navigateToItem = index => {
    if (this._carousel) {
      this._carousel.snapToItem(index);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    padding: 15,
  },
  sliderContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  cardsContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  navBar: {
    flexDirection: 'row',
    padding: 15,
    paddingTop: 5,
    marginBottom: 5,
  },
  leftNav: {
    flex: 0.2,
  },
  title: {
    flex: 0.6,
    textAlign: 'center',
    color: primaryColor,
    fontSize: 14,
    letterSpacing: 2,
  },
  bold: {
    fontWeight: 'bold',
  },
});
