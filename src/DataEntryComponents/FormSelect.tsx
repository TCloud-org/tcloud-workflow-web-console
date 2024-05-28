import { Form, Select } from "antd";
import { CSSProperties } from "react";
import { SelectItem } from "../Config/DataDisplayInterface";
import { FormLayout } from "antd/es/form/Form";

export const FormSelect = (props: {
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
  options?: SelectItem[];
  style?: CSSProperties;
  label?: string;
  required?: boolean;
  tooltip?: string;
  layout?: FormLayout;
}) => {
  const {
    value,
    onChange,
    options = [],
    style,
    placeholder,
    label,
    required,
    tooltip,
    layout = "vertical",
  } = props;

  return (
    <Form layout={layout} style={{ marginBottom: "-24px", ...style }}>
      <Form.Item label={label} required={required} tooltip={tooltip}>
        <Select
          placeholder={placeholder}
          value={value}
          size="small"
          onChange={onChange}
          options={options}
        />
      </Form.Item>
    </Form>
  );
};
