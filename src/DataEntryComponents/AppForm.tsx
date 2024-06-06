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
  const customizeRequiredMark = (
    label: React.ReactNode,
    { required }: { required: boolean }
  ) => (
    <>
      {label}
      {required && <span style={{ color: "red", marginLeft: 4 }}>*</span>}
    </>
  );

  return (
    <Form
      {...formItemLayout}
      colon={false}
      requiredMark={customizeRequiredMark}
      wrapperCol={
        props.layout === "vertical" ? Span[1] : formItemLayout.wrapperCol
      }
      labelCol={props.layout === "vertical" ? Span[1] : formItemLayout.labelCol}
      labelAlign="left"
      {...props}
    >
      {props.children}
    </Form>
  );
};
