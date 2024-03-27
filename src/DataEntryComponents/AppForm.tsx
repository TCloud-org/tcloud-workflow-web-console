import { Form } from "antd";
import { ReactNode } from "react";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

export const AppForm = (props: {
  children?: ReactNode;
  onValuesChange?: (e: any) => any;
}) => {
  return (
    <Form
      {...formItemLayout}
      variant="filled"
      onValuesChange={props.onValuesChange}
    >
      {props.children}
    </Form>
  );
};
