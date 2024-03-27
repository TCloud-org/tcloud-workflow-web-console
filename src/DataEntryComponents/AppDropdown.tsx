import { Dropdown, DropdownProps } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";

export const AppDropdown = (props: DropdownProps & { items: ItemType[] }) => {
  return (
    <Dropdown
      trigger={["click"]}
      menu={{ items: props.items }}
      placement="bottomRight"
      disabled={props.disabled}
    >
      {props.children}
    </Dropdown>
  );
};
