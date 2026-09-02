import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import colors from '@theme/colors';

export interface SvgIconProps {
  size?: number;
  width?: number;
  height?: number;
  color?: string;
  stroke?: string;
  strokeWidth?: number;
  filled?: boolean;
}

const getIconProps = (
  props: SvgIconProps,
  defaultSize = 18,
  defaultStrokeWidth = 2,
) => {
  const size = props.size || props.width || props.height || defaultSize;
  const color = props.color || props.stroke || colors.ring;
  const strokeWidth =
    props.strokeWidth !== undefined ? props.strokeWidth : defaultStrokeWidth;
  return { size, color, strokeWidth };
};

export const SearchIcon = (props: SvgIconProps) => {
  const { size, color, strokeWidth } = getIconProps(props, 18, 2.5);
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ backgroundColor: 'transparent' }}
    >
      <Circle cx="11" cy="11" r="8" />
      <Path d="M21 21l-4.35-4.35" />
    </Svg>
  );
};

export const HeartIcon = (props: SvgIconProps) => {
  const { size, color, strokeWidth } = getIconProps(props, 18, 2);
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={props.filled ? color : 'none'}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ backgroundColor: 'transparent' }}
    >
      <Path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </Svg>
  );
};

export const SunIcon = (props: SvgIconProps) => {
  const { size, color, strokeWidth } = getIconProps(props, 18, 2);
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ backgroundColor: 'transparent' }}
    >
      <Circle cx="12" cy="12" r="5" />
      <Path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </Svg>
  );
};

export const MoonIcon = (props: SvgIconProps) => {
  const { size, color, strokeWidth } = getIconProps(props, 18, 2);
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ backgroundColor: 'transparent' }}
    >
      <Path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </Svg>
  );
};

export const BackIcon = (props: SvgIconProps) => {
  const { size, color, strokeWidth } = getIconProps(props, 14, 2);
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ backgroundColor: 'transparent' }}
    >
      <Path d="M10.15 0.5L4 6.65C3.95217 6.69489 3.91405 6.74911 3.88799 6.80931C3.86193 6.8695 3.84848 6.9344 3.84848 7C3.84848 7.0656 3.86193 7.1305 3.88799 7.19069C3.91405 7.25089 3.95217 7.30511 4 7.35L10.15 13.5" />
    </Svg>
  );
};

export const ChevronRight = (props: SvgIconProps) => {
  const { size, color, strokeWidth } = getIconProps(props, 18, 2);
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ backgroundColor: 'transparent' }}
    >
      <Path d="M9 5l7 7-7 7" />
    </Svg>
  );
};
