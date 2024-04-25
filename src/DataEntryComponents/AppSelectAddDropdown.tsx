import { PlusOutlined } from "@ant-design/icons";
import { Divider, Flex, Input, InputRef } from "antd";
import { Fragment, MouseEvent, ReactNode, useRef, useState } from "react";
import { AppButton } from "./AppButton";

export const AppSelectAddDropdown = (props: {
  menu?: ReactNode;
  inputPlaceholder?: string;
  buttonLabel?: string;
  buttonOnClick?: (value: string) => void;
}) => {
  const inputRef = useRef<InputRef>(null);
  const [name, setName] = useState("");

  const { buttonOnClick = () => {} } = props;

  const addItem = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    // setItems([...items, name || `New item ${index++}`]);
    setName("");
    buttonOnClick(name);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <Fragment>
      {props.menu}
      <Divider style={{ margin: "8px 0" }} />
      <Flex align="center" style={{ padding: "0 8px 4px", gap: "12px" }}>
        <Input
          placeholder={props.inputPlaceholder}
          ref={inputRef}
          value={name}
          onChange={onNameChange}
          onKeyDown={(e) => e.stopPropagation()}
        />
        <AppButton type="text" icon={<PlusOutlined />} onClick={addItem}>
          {props.buttonLabel || "Add item"}
        </AppButton>
      </Flex>
    </Fragment>
  );
};
