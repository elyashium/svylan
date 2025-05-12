import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface LogoProps {
  width?: number;
  height?: number;
  color?: string;
}

export default function Logo({ width = 40, height = 40, color = '#38A66A' }: LogoProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 40 40" fill="none">
      <Circle cx="20" cy="20" r="18" fill={color} />
      <Path
        d="M20 8C14.5 8 10 12.5 10 18C10 20.8 11.1 23.3 12.9 25.1C13.4 25.6 14.1 26 14.5 26.4C16.1 28 16.5 30 16.5 32H23.5C23.5 30 23.9 28 25.5 26.4C25.9 26 26.6 25.6 27.1 25.1C28.9 23.3 30 20.8 30 18C30 12.5 25.5 8 20 8Z"
        fill="white"
      />
      <Path
        d="M17 32V34.5C17 35.9 18.1 37 19.5 37H20.5C21.9 37 23 35.9 23 34.5V32H17Z"
        fill="white"
      />
      <Path
        d="M20 15C18.9 15 18 15.9 18 17C18 18.1 18.9 19 20 19C21.1 19 22 18.1 22 17C22 15.9 21.1 15 20 15Z"
        fill={color}
      />
      <Path
        d="M20 23C21.1 23 22 22.1 22 21C22 19.9 21.1 19 20 19C18.9 19 18 19.9 18 21C18 22.1 18.9 23 20 23Z"
        fill={color}
      />
    </Svg>
  );
}