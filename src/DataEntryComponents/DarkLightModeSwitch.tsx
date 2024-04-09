import { MoonFilled, SunFilled } from "@ant-design/icons";
import { Switch, SwitchProps } from "antd";

export const DarkLightModeSwitch = (props: SwitchProps) => {
  return (
    <Switch
      checkedChildren={<SunFilled />}
      unCheckedChildren={<MoonFilled />}
      defaultChecked
      {...props}
    />
  );
};
