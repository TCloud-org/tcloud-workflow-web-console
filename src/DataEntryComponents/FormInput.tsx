import { Form, Input } from "antd";
import { FormLayout } from "antd/es/form/Form";
import { CSSProperties } from "react";

export const FormInput = (props: {
  value?: string;
  style?: CSSProperties;
  label?: string;
  tooltip?: string;
  layout?: FormLayout;
  disabled?: boolean;
  onChange?: () => void;
  showTooltip?: boolean;
}) => {
  const {
    value,
    style,
    label,
    tooltip,
    layout = "vertical",
    disabled,
    onChange,
    showTooltip,
  } = props;
  return (
    <Form
      layout={layout}
      style={{
        marginBottom: "-24px",
        ...style,
      }}
    >
      <Form.Item
        label={label}
        tooltip={tooltip || (showTooltip ? value : undefined)}
      >
        <Input value={value} disabled={disabled} onChange={onChange} />
      </Form.Item>
    </Form>
  );
};
