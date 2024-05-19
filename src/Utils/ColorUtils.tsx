import { Color } from "./ObjectUtils";

export const getStatusCodeColor = (statusCode: number): Color => {
  if (statusCode >= 200 && statusCode <= 299) {
    return "green";
  }
  if (statusCode >= 300 && statusCode <= 399) {
    return "blue";
  }
  if (statusCode >= 400 && statusCode <= 599) {
    return "red";
  }
  return "geekblue";
};
