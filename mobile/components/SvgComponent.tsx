import { ColorValue, View } from "react-native";
import Svg, { Path, LinearGradient, Stop } from "react-native-svg";

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
  fill: ColorValue | ColorValue[];
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
      {typeof fill === "object" ? (
        <>
          <LinearGradient id="grad1" x1="0%" y1="100%" x2="0%" y2="0%">
            {fill.map((f, i) => (
              <Stop
                offset={
                  fill.length === 1 ? "0%" : `${(i / (fill.length - 1)) * 100}%`
                }
                stopColor={f}
                stopOpacity="1"
                key={i}
              />
            ))}
          </LinearGradient>
          <Path
            d={d}
            fill={"url(#grad1)"}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        </>
      ) : (
        <Path d={d} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
      )}
    </Svg>
  );
};
