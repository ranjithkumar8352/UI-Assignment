import { Image, PanResponder, StyleSheet, View } from 'react-native';
import React, { PureComponent } from 'react';
import Svg, { Circle, G, Path, TSpan, Text, TextPath } from 'react-native-svg';

import InnerData from './InnerData';
import PropTypes from 'prop-types'; // ES6
import range from 'lodash.range';

function calculateArcCircle(
  index0,
  segments,
  radius,
  startAngle0 = 0,
  angleLength0 = 2 * Math.PI,
) {
  // Add 0.0001 to the possible angle so when start = stop angle, whole circle is drawn
  const startAngle = startAngle0 % (2 * Math.PI);
  const angleLength = angleLength0 % (2 * Math.PI);
  const index = index0 + 1;
  const fromAngle = (angleLength / segments) * (index - 1) + startAngle;
  const toAngle = (angleLength / segments) * index + startAngle;
  const fromX = radius * Math.sin(fromAngle);
  const fromY = -radius * Math.cos(fromAngle);
  const realToX = radius * Math.sin(toAngle);
  const realToY = -radius * Math.cos(toAngle);

  // add 0.005 to start drawing a little bit earlier so segments stick together
  const toX = radius * Math.sin(toAngle + 0.005);
  const toY = -radius * Math.cos(toAngle + 0.005);

  return {
    fromX,
    fromY,
    toX,
    toY,
    realToX,
    realToY,
  };
}

export default class CircularSlider extends PureComponent {
  static propTypes = {
    onUpdate: PropTypes.func.isRequired,
    startAngle: PropTypes.number.isRequired,
    angleLength: PropTypes.number.isRequired,
    segments: PropTypes.number,
    strokeWidth: PropTypes.number,
    radius: PropTypes.number,
    gradientColorFrom: PropTypes.string,
    gradientColorTo: PropTypes.string,
    showInnerData: PropTypes.bool,
    innerDataColor: PropTypes.string,
    bgCircleColor: PropTypes.string,
    stopIcon: PropTypes.element,
    startIcon: PropTypes.element,
    data: PropTypes.array,
  };

  static defaultProps = {
    segments: 5,
    strokeWidth: 40,
    radius: 145,
    gradientColorFrom: '#ff9800',
    gradientColorTo: '#ffcf00',
    innerDataColor: '#9d9d9d',
    bgCircleColor: '#171717',
  };

  state = {
    circleCenterX: false,
    circleCenterY: false,
  };

  UNSAFE_componentWillMount() {
    this._handlePanResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => this.setCircleCenter(),
      onPanResponderMove: (evt, { moveX, moveY }) => {
        const { circleCenterX, circleCenterY } = this.state;
        const { startAngle, onUpdate } = this.props;

        let newAngle =
          Math.atan2(moveY - circleCenterY, moveX - circleCenterX) +
          Math.PI / 2;
        let newAngleLength = (newAngle - startAngle) % (2 * Math.PI);

        if (newAngleLength < 0) {
          newAngleLength += 2 * Math.PI;
        }

        onUpdate({ startAngle, angleLength: newAngleLength });
      },
    });
  }

  onLayout = () => {
    this.setCircleCenter();
  };

  setCircleCenter = () => {
    this._circle.measure((x, y, w, h, px, py) => {
      const halfOfContainer = this.getContainerWidth() / 2;
      this.setState({
        circleCenterX: px + halfOfContainer,
        circleCenterY: py + halfOfContainer,
      });
    });
  };

  getContainerWidth() {
    const { strokeWidth, radius } = this.props;
    return strokeWidth + radius * 2 + 2;
  }

  render() {
    const {
      startAngle,
      angleLength,
      segments,
      strokeWidth,
      radius,
      gradientColorFrom,
      gradientColorTo,
      bgCircleColor,
      showInnerData,
      innerDataColor,
      startIcon,
      stopIcon,
      data,
    } = this.props;

    const containerWidth = this.getContainerWidth();

    const start = calculateArcCircle(
      0,
      segments,
      radius,
      startAngle,
      angleLength,
    );
    const stop = calculateArcCircle(
      segments - 1,
      segments,
      radius,
      startAngle,
      angleLength,
    );
    let calculatedIndex = Math.floor(
      (angleLength / (Math.PI * 2)) * data.length,
    );
    if (calculatedIndex < 0) {
      calculatedIndex = 0;
    }
    if (this.activeValueIndex !== calculatedIndex) {
      this.props.onValueChange && this.props.onValueChange(calculatedIndex);
    }
    this.activeValueIndex = calculatedIndex;

    return (
      <View
        style={{ width: containerWidth, height: containerWidth }}
        onLayout={this.onLayout}>
        <Svg
          height={containerWidth}
          width={containerWidth}
          ref={circle => (this._circle = circle)}>
          {/*
            ##### Circle
          */}

          <G
            transform={{
              translate: `${strokeWidth / 2 + radius + 1}, ${strokeWidth / 2 +
                radius +
                1}`,
            }}>
            <Circle
              r={radius + 10}
              strokeWidth={1}
              fill="transparent"
              stroke={bgCircleColor}
            />
            {showInnerData && (
              <InnerData
                r={radius - strokeWidth / 2}
                stroke={innerDataColor}
                angleLength={angleLength}
                activeValueIndex={this.activeValueIndex}
                data={data}
              />
            )}
            {range(segments).map(i => {
              const { fromX, fromY, toX, toY } = calculateArcCircle(
                i,
                segments,
                radius,
                startAngle,
                angleLength,
              );
              const d = `M ${fromX.toFixed(2)} ${fromY.toFixed(
                2,
              )} A ${radius} ${radius} 0 0 1 ${toX.toFixed(2)} ${toY.toFixed(
                2,
              )}`;

              return (
                <Path
                  d={d}
                  key={i}
                  strokeWidth={strokeWidth}
                  stroke={gradientColorFrom}
                  fill="transparent"
                />
              );
            })}

            {/*
              ##### Start Icon
            */}

            <G
              fill={gradientColorFrom}
              transform={{ translate: `${start.fromX}, ${start.fromY}` }}>
              <Circle
                r={(strokeWidth - 1) / 2}
                fill={bgCircleColor}
                stroke={gradientColorFrom}
                strokeWidth="1"
              />
              {startIcon}
            </G>

            {/*
              ##### Stop Icon
            */}

            <G
              fill={gradientColorTo}
              transform={{ translate: `${stop.toX}, ${stop.toY}` }}
              onPressIn={() =>
                this.setState({ angleLength: angleLength + Math.PI / 2 })
              }
              {...this._handlePanResponder.panHandlers}>
              <Circle
                r={(strokeWidth - 1) / 2}
                fill={'#34495e'}
                stroke={gradientColorTo}
                strokeWidth="1"
              />
              {stopIcon}
            </G>
            <Circle
              r={radius - 70}
              strokeWidth={15}
              id="moodRing"
              fill="transparent"
              stroke={
                data[this.activeValueIndex].special ? '#ff7675' : '#D2D2D2'
              }
            />
            <Text fill="#8EAEC8" fontSize="14" fontWeight="bold">
              <TextPath href="#moodRing">
                <TSpan dx={300} dy={-15}>
                  {data[this.activeValueIndex].monthName}
                </TSpan>
              </TextPath>
            </Text>
          </G>
        </Svg>
        <View style={styles.avatarContainer}>
          <Image
            source={require('../images/woman.jpg')}
            style={styles.avatar}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatarContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
});
