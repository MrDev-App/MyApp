import React from 'react';
import Svg, { Path, Circle, Text as SvgText } from 'react-native-svg';
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
export const SunriseIcon = (props: SvgIconProps) => {
  const { size, color, strokeWidth } = getIconProps(props, 20, 2);
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
      <Path d="M12 2v6M4.93 10.93l1.41 1.41M20 18H4M19.07 10.93l-1.41 1.41M22 22H2M8 18a4 4 0 0 1 8 0" />
    </Svg>
  );
};

export const ShieldCrossIcon = (props: SvgIconProps) => {
  const { size, color, strokeWidth } = getIconProps(props, 22, 2);
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
      <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <Path d="M12 8v8M8 12h8" />
    </Svg>
  );
};

export const CoinsIcon = (props: SvgIconProps) => {
  const { size, color, strokeWidth } = getIconProps(props, 22, 2);
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
      <Path d="M9 3c3.31 0 6 1.34 6 3s-2.69 3-6 3-6-1.34-6-3 2.69-3 6-3z" />
      <Path d="M3 6v3c0 1.66 2.69 3 6 3s6-1.34 6-3V6" />
      <Path d="M15 12c3.31 0 6 1.34 6 3s-2.69 3-6 3-6-1.34-6-3" />
      <Path d="M9 15v3c0 1.66 2.69 3 6 3s6-1.34 6-3v-3" />
    </Svg>
  );
};

export const BookStudyIcon = (props: SvgIconProps) => {
  const { size, color, strokeWidth } = getIconProps(props, 22, 2);
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
      <Path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <Path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <Path d="M8 7h8M8 11h6" />
    </Svg>
  );
};

export const HomeFamilyIcon = (props: SvgIconProps) => {
  const { size, color, strokeWidth } = getIconProps(props, 22, 2);
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
      <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <Path d="M9 22V12h6v10" />
    </Svg>
  );
};

export const ChildrenIcon = (props: SvgIconProps) => {
  const { size, color, strokeWidth } = getIconProps(props, 22, 2);
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
      <Circle cx="8" cy="8" r="3" />
      <Circle cx="16" cy="8" r="3" />
      <Path d="M4 20c0-3 2.5-5 5-5s3 2 3 2 0.5-2 3-2 5 2 5 5" />
    </Svg>
  );
};

export const LotusSpiritualIcon = (props: SvgIconProps) => {
  const { size, color, strokeWidth } = getIconProps(props, 22, 2);
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
      <Path d="M12 3c-2 4-2 9 0 13 2-4 2-9 0-13z" />
      <Path d="M12 16c-3.5 0-7-2-9-6 1 4 4.5 7 9 7 4.5 0 8-3 9-7-2 4-5.5 6-9 6z" />
      <Path d="M3 10c2-1 6 0 9 6" />
      <Path d="M21 10c-2-1-6 0-9 6" />
    </Svg>
  );
};

export const OmIcon = (props: SvgIconProps) => {
  const { size, color } = getIconProps(props, 24, 2);
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ backgroundColor: 'transparent' }}
    >
      <SvgText
        x="50"
        y="78"
        fontSize="85"
        fontWeight="bold"
        textAnchor="middle"
        fill={color}
      >
        ॐ
      </SvgText>
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

export const CameraIcon = (props: SvgIconProps) => {
  const { size, color, strokeWidth } = getIconProps(props, 14, 2);
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
      <Path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <Circle cx="12" cy="13" r="4" />
    </Svg>
  );
};

export const CloseIcon = (props: SvgIconProps) => {
  const { size, color, strokeWidth } = getIconProps(props, 16, 2);
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
      <Path d="M18 6L6 18M6 6l12 12" />
    </Svg>
  );
};

export const ExpandIcon = (props: SvgIconProps) => {
  const { size, color, strokeWidth } = getIconProps(props, 16, 2.2);
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
      {/* Top Left */}
      <Path d="M3 9V3h6" />
      <Path d="M3 3l6 6" />
      {/* Top Right */}
      <Path d="M21 9V3h-6" />
      <Path d="M21 3l-6 6" />
      {/* Bottom Left */}
      <Path d="M3 15v6h6" />
      <Path d="M3 21l6-6" />
      {/* Bottom Right */}
      <Path d="M21 15v6h-6" />
      <Path d="M21 21l-6-6" />
    </Svg>
  );
};

export const ResetIcon = (props: SvgIconProps) => {
  const { size, color, strokeWidth } = getIconProps(props, 16, 2.2);
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
      <Path d="M1 4v6h6" />
      <Path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
    </Svg>
  );
};

export const ZapIcon = (props: SvgIconProps) => {
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
      <Path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </Svg>
  );
};

export const ChartBarIcon = (props: SvgIconProps) => {
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
      <Path d="M18 20V10" />
      <Path d="M12 20V4" />
      <Path d="M6 20v-6" />
    </Svg>
  );
};

export const PlusIcon = (props: SvgIconProps) => {
  const { size, color, strokeWidth } = getIconProps(props, 16, 2.2);
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
      <Path d="M12 5v14M5 12h14" />
    </Svg>
  );
};

export const MinusIcon = (props: SvgIconProps) => {
  const { size, color, strokeWidth } = getIconProps(props, 16, 2.2);
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
      <Path d="M5 12h14" />
    </Svg>
  );
};

export const TrashIcon = (props: SvgIconProps) => {
  const { size, color, strokeWidth } = getIconProps(props, 16, 2);
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
      <Path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
    </Svg>
  );
};

export const PlayIcon = (props: SvgIconProps) => {
  const { size, color } = getIconProps(props, 20, 2);
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      style={{ backgroundColor: 'transparent' }}
    >
      <Path d="M8 5v14l11-7z" />
    </Svg>
  );
};

export const PauseIcon = (props: SvgIconProps) => {
  const { size, color } = getIconProps(props, 20, 2);
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      style={{ backgroundColor: 'transparent' }}
    >
      <Path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </Svg>
  );
};

export const Rewind15Icon = (props: SvgIconProps) => {
  const { size, color, strokeWidth } = getIconProps(props, 22, 2);
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
      <Path d="M3.05 11a9 9 0 11.5 4m-.5-4v-5m0 5h5" />
      <SvgText
        x="12"
        y="14.5"
        textAnchor="middle"
        fontSize="6.5"
        fontWeight="bold"
        fill={color}
        stroke="none"
      >
        15
      </SvgText>
    </Svg>
  );
};

export const Forward15Icon = (props: SvgIconProps) => {
  const { size, color, strokeWidth } = getIconProps(props, 22, 2);
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
      <Path d="M20.95 11a9 9 0 10-.5 4m.5-4v-5m0 5h-5" />
      <SvgText
        x="12"
        y="14.5"
        textAnchor="middle"
        fontSize="6.5"
        fontWeight="bold"
        fill={color}
        stroke="none"
      >
        15
      </SvgText>
    </Svg>
  );
};

export const RepeatIcon = (props: SvgIconProps) => {
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
      <Path d="M17 1l4 4-4 4" />
      <Path d="M3 11V9a4 4 0 014-4h14" />
      <Path d="M7 23l-4-4 4-4" />
      <Path d="M21 13v2a4 4 0 01-4 4H3" />
    </Svg>
  );
};

export const ShuffleIcon = (props: SvgIconProps) => {
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
      <Path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
    </Svg>
  );
};

export const SkipBackIcon = (props: SvgIconProps) => {
  const { size, color } = getIconProps(props, 20, 2);
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      style={{ backgroundColor: 'transparent' }}
    >
      <Path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
    </Svg>
  );
};

export const SkipForwardIcon = (props: SvgIconProps) => {
  const { size, color } = getIconProps(props, 20, 2);
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      style={{ backgroundColor: 'transparent' }}
    >
      <Path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
    </Svg>
  );
};

export const PinIcon = (props: SvgIconProps) => {
  const { size, color } = getIconProps(props, 14, 2);
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ backgroundColor: 'transparent' }}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.1218 1.87023C15.7573 0.505682 13.4779 0.76575 12.4558 2.40261L9.61062 6.95916C9.61033 6.95965 9.60913 6.96167 9.6038 6.96549C9.59728 6.97016 9.58336 6.97822 9.56001 6.9848C9.50899 6.99916 9.44234 6.99805 9.38281 6.97599C8.41173 6.61599 6.74483 6.22052 5.01389 6.87251C4.08132 7.22378 3.61596 8.03222 3.56525 8.85243C3.51687 9.63502 3.83293 10.4395 4.41425 11.0208L7.94975 14.5563L1.26973 21.2363C0.879206 21.6269 0.879206 22.26 1.26973 22.6506C1.66025 23.0411 2.29342 23.0411 2.68394 22.6506L9.36397 15.9705L12.8995 19.5061C13.4808 20.0874 14.2853 20.4035 15.0679 20.3551C15.8881 20.3044 16.6966 19.839 17.0478 18.9065C17.6998 17.1755 17.3043 15.5086 16.9444 14.5375C16.9223 14.478 16.9212 14.4114 16.9355 14.3603C16.9421 14.337 16.9502 14.3231 16.9549 14.3165C16.9587 14.3112 16.9606 14.31 16.9611 14.3098L21.5177 11.4645C23.1546 10.4424 23.4147 8.16307 22.0501 6.79853L17.1218 1.87023ZM14.1523 3.46191C14.493 2.91629 15.2528 2.8296 15.7076 3.28445L20.6359 8.21274C21.0907 8.66759 21.0041 9.42737 20.4584 9.76806L15.9019 12.6133C14.9572 13.2032 14.7469 14.3637 15.0691 15.2327C15.3549 16.0037 15.5829 17.1217 15.1762 18.2015C15.1484 18.2752 15.1175 18.3018 15.0985 18.3149C15.0743 18.3316 15.0266 18.3538 14.9445 18.3589C14.767 18.3699 14.5135 18.2916 14.3137 18.0919L5.82846 9.6066C5.62872 9.40686 5.55046 9.15333 5.56144 8.97583C5.56651 8.8937 5.58877 8.84605 5.60548 8.82181C5.61855 8.80285 5.64516 8.7719 5.71886 8.74414C6.79869 8.33741 7.91661 8.56545 8.68762 8.85128C9.55668 9.17345 10.7171 8.96318 11.3071 8.01845L14.1523 3.46191Z"
        fill={color}
      />
    </Svg>
  );
};

export const LocationIcon = (props: SvgIconProps) => {
  const { size, color } = getIconProps(props, 14, 2);
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ backgroundColor: 'transparent' }}
    >
      <Path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
        fill={color}
      />
    </Svg>
  );
};

export const TagIcon = (props: SvgIconProps) => {
  const { size, color } = getIconProps(props, 14, 2);
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill={color}
      style={{ backgroundColor: 'transparent' }}
    >
      <Circle cx="7" cy="7" r="2" fill={color} />
      <Path
        d="M10.3 19.7l-9-9C1.1 10.5 1 10.3 1 10V2c0-0.6 0.4-1 1-1h8c0.3 0 0.5 0.1 0.7 0.3l9 9c0.4 0.4 0.4 1 0 1.4l-8 8C11.3 20.1 10.7 20.1 10.3 19.7z M3 9.6l8 8l6.6-6.6l-8-8H3V9.6z"
        fill={color}
      />
    </Svg>
  );
};

export const ShareIcon = (props: SvgIconProps) => {
  const { size, color, strokeWidth } = getIconProps(props, 16, 2);
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
      <Circle cx="18" cy="5" r="3" />
      <Circle cx="6" cy="12" r="3" />
      <Circle cx="18" cy="19" r="3" />
      <Path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
    </Svg>
  );
};

export const CopyIcon = (props: SvgIconProps) => {
  const { size, color, strokeWidth } = getIconProps(props, 16, 2);
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
      <Path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
      <Path d="M15 2H9a1 1 0 00-1 1v2a1 1 0 001 1h6a1 1 0 001-1V3a1 1 0 00-1-1z" />
    </Svg>
  );
};

export const ImageIcon = (props: SvgIconProps) => {
  const { size, color, strokeWidth } = getIconProps(props, 20, 2);
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
      <Path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z" />
      <Circle cx="8.5" cy="8.5" r="1.5" />
      <Path d="M21 15l-5-5L5 21" />
    </Svg>
  );
};

