import { Span } from "Config/DataDisplayInterface";
import { Form, FormProps } from "antd";
import { ReactNode } from "react";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
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
      colon={false}
      wrapperCol={
        props.layout === "vertical" ? Span[1] : formItemLayout.wrapperCol
      }
      variant="filled"
      labelAlign="left"
      size="small"
      {...props}
    >
      {props.children}
    </Form>
  );
};
