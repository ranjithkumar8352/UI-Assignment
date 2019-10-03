import { Circle, G, Text } from 'react-native-svg';
import React, { PureComponent } from 'react';

import PropTypes from 'prop-types'; // ES6

export default class InnerData extends PureComponent {
  static propTypes = {
    r: PropTypes.number,
    stroke: PropTypes.string,
  };

  render() {
    const { r, stroke, activeValueIndex, data } = this.props;
    const textRadius = r - 10;

    return (
      <G>
        <G transform={{ translate: '0, 3' }}>
          {data.map((h, i) => {
            const x =
              textRadius *
              Math.cos(
                ((2 * Math.PI) / data.length) * i -
                  Math.PI / 2 +
                  Math.PI / data.length / (data.length / 2),
              );
            const y =
              textRadius *
              Math.sin(
                ((2 * Math.PI) / data.length) * i -
                  Math.PI / 2 +
                  Math.PI / data.length / (data.length / 2),
              );
            const isActive = activeValueIndex === i;
            return (
              <G x={x} y={y} key={i}>
                <Circle
                  r={9}
                  strokeWidth={h.special ? 2 : 1}
                  fill={isActive ? stroke : 'transparent'}
                  stroke={h.special ? '#ff7675' : 'transparent'}
                  transform={{ translate: '0, -3' }}
                />
                <Text
                  fill={isActive ? 'white' : stroke}
                  fontSize="9"
                  textAnchor="middle">
                  {h.date}
                </Text>
              </G>
            );
          })}
        </G>
      </G>
    );
  }
}
