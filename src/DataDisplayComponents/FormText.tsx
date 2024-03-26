import { Form, Typography } from "antd";
import { FormLayout } from "antd/es/form/Form";
import { CSSProperties } from "react";

export const FormText = (props: {
  value?: string;
  style?: CSSProperties;
  label?: string;
  tooltip?: string;
  layout?: FormLayout;
}) => {
  const { value, style, label, tooltip, layout = "vertical" } = props;
  return (
    <Form layout={layout} style={{ marginBottom: "-24px", ...style }}>
      <Form.Item label={label} tooltip={tooltip}>
        <Typography.Text>{value}</Typography.Text>
      </Form.Item>
    </Form>
  );
};
