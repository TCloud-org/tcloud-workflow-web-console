import { Span } from "Config/DataDisplayInterface";
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
    <Form
      {...formItemLayout}
      wrapperCol={
        props.layout === "vertical" ? Span[1] : formItemLayout.wrapperCol
      }
      variant="filled"
      {...props}
      size="small"
    >
      {props.children}
    </Form>
  );
};
