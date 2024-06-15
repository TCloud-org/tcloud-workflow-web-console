import { Spin } from "antd";
import { ReactNode } from "react";

export const AppLoading = (props: {
  children?: ReactNode;
  loading?: boolean;
}) => {
  const { loading = false, children } = props;
  return (
    <Spin tip="Loading" spinning={loading}>
      {children}
    </Spin>
  );
};
