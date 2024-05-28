import { Button, Form } from "antd";
import { ButtonType } from "antd/es/button";
import { FormLayout } from "antd/es/form/Form";
import { CSSProperties } from "react";

export const FormButton = (props: {
  children?: string;
  style?: CSSProperties;
  label?: string;
  tooltip?: string;
  layout?: FormLayout;
  disabled?: boolean;
  onClick?: () => void;
  width?: string | number | undefined;
  type?: ButtonType;
}) => {
  const {
    children,
    style,
    label,
    tooltip,
    layout = "vertical",
    disabled,
    onClick,
    width,
    type,
  } = props;
  return (
    <Form
      layout={layout}
      style={{
        marginBottom: "-24px",
        ...style,
      }}
    >
      <Form.Item label={label} tooltip={tooltip}>
        <Button
          type={type}
          style={{ width: width }}
          disabled={disabled}
          onClick={onClick}
          size="small"
        >
          {children}
        </Button>
      </Form.Item>
    </Form>
  );
};
