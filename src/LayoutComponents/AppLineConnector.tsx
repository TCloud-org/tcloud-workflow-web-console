import { theme } from "antd";
import Xarrow, { xarrowPropsType } from "react-xarrows";

export const AppLineConnector = (props: xarrowPropsType) => {
  const { token } = theme.useToken();

  const { start, end } = props;

  if (!start || !end) {
    return null;
  }

  return (
    <Xarrow
      headShape="circle"
      headSize={4}
      strokeWidth={2}
      tailSize={4}
      tailShape="circle"
      showTail
      color={token.colorWhite}
      dashness
      {...props}
    />
  );
};
