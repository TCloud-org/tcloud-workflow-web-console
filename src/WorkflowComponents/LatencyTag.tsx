import { AppTag } from "../DataDisplayComponents/AppTag";
import { Color } from "../Utils/ObjectUtils";

export const getLatencyColor = (latency: number): Color => {
  if (latency > 1000 && latency < 10000) {
    return "gold-inverse";
  } else if (latency >= 10000) {
    return "red-inverse";
  }
  return "green-inverse";
};

export const LatencyTag = (props: { latency: number }) => {
  const { latency } = props;

  return <AppTag color={getLatencyColor(latency)}>{`${latency} ms`}</AppTag>;
};
