import { ColorValue } from "react-native";
import Svg, { Path } from "react-native-svg";

type TDim<T> = T extends string ? T : never | number;

export const SvgComponent = <T, V>({
  d,
  fill,
  width,
  height,
  strokeWidth,
  stroke,
}: {
  d: string;
  fill: ColorValue;
  height: TDim<T>;
  width: TDim<V>;
  strokeWidth?: number;
  stroke?: ColorValue;
}) => {
  return (
    <Svg
      height={width}
      width={height}
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
    >
      <Path d={d} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
    </Svg>
  );
};
