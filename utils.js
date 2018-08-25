import { Dimensions } from "react-native";

export function isHortizontal() {
  const window = Dimensions.get("window");
  return window.width > window.height;
}

export function isVertical() {
  return !isHortizontal();
}
