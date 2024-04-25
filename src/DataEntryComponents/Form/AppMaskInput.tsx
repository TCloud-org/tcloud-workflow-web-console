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
  const { mask, value = "", onChange = () => {}, placeholder, style } = props;
  return (
    <ReactInputMask
      mask={mask}
      maskChar={null}
      alwaysShowMask={false}
      value={value}
      onChange={onChange}
      defaultValue=""
      placeholder={placeholder}
      style={style}
    >
      {((inputProps: any) => <Input style={style} {...inputProps} />) as any}
    </ReactInputMask>
  );
};
