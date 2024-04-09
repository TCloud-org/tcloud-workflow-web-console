import { Color } from "./ObjectUtils";

export const getStatusCodeColor = (statusCode: number): Color => {
  if (statusCode >= 200 && statusCode <= 299) {
    return "success";
  }
  if (statusCode >= 300 && statusCode <= 399) {
    return "processing";
  }
  if (statusCode >= 400 && statusCode <= 599) {
    return "error";
  }
  return "geekblue";
};
