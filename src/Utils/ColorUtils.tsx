import { Color } from "./ObjectUtils";

export const getStatusCodeColor = (statusCode: number): Color => {
  if (statusCode >= 200 && statusCode <= 299) {
    return "green-inverse";
  }
  if (statusCode >= 300 && statusCode <= 399) {
    return "blue-inverse";
  }
  if (statusCode >= 400 && statusCode <= 599) {
    return "red-inverse";
  }
  return "geekblue-inverse";
};
