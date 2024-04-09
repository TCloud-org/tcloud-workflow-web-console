import { Form, FormProps } from "antd";
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

export const AppForm = (
  props: FormProps & {
    children?: ReactNode;
  }
) => {
  return (
    <Form {...formItemLayout} variant="filled" {...props} size="small">
      {props.children}
    </Form>
  );
};
