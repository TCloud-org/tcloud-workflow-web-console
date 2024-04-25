import { Input } from "antd";
import { CSSProperties } from "react";
import ReactInputMask from "react-input-mask";

export const AppMaskInput = (props: {
  mask: string;
  value?: string;
  onChange?: (e: any) => void;
  placeholder?: string;
  style?: CSSProperties;
}) => {
  const { mask, value, onChange, placeholder, style } = props;
  return (
    <ReactInputMask
      mask={mask}
      autoComplete="off"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={style}
    >
      <Input style={style} />
    </ReactInputMask>
  );
};
