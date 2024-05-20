import { theme } from "antd";
import { xarrowPropsType } from "react-xarrows";
import Xarrow from "react-xarrows";

export const AppLineConnector = (props: xarrowPropsType) => {
  const { token } = theme.useToken();
  return (
    <Xarrow
      headShape="circle"
      headSize={4}
      strokeWidth={2}
      tailSize={4}
      tailShape="circle"
      showTail
      color={token.colorPrimary}
      dashness
      {...props}
    />
  );
};
