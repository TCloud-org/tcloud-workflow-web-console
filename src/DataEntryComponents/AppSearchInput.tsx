import { SearchOutlined } from "@ant-design/icons";
import { Icon } from "SlateRichTextEditorComponents/RichTextToolbarComponents";
import { Dropdown, Input, InputProps, InputRef, theme } from "antd";
import { useRef, useState } from "react";
import { AppIconButton } from "./AppIconButton";

export const AppSearchInput = (props: InputProps) => {
  const { token } = theme.useToken();

  const inputRef = useRef<InputRef>(null);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);

  const handleFilterClick = () => {
    setFilterOpen((prev) => !prev);
  };

  const content = (
    <div
      style={{
        backgroundColor: "white",
        boxShadow: token.boxShadow,
        borderRadius: token.borderRadiusLG,
        padding: 16,
      }}
    >
      <div>Content</div>
    </div>
  );

  return (
    <Dropdown
      open={filterOpen}
      dropdownRender={() => content}
      trigger={["click"]}
      placement="bottomRight"
    >
      <Input
        ref={inputRef}
        prefix={<SearchOutlined />}
        suffix={
          <AppIconButton type="text" size="small" onClick={handleFilterClick}>
            <Icon>tune</Icon>
          </AppIconButton>
        }
        placeholder="Type to search"
        {...props}
      />
    </Dropdown>
  );
};
