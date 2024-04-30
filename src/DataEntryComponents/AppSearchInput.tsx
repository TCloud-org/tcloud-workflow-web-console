import { SearchOutlined } from "@ant-design/icons";
import { Icon } from "SlateRichTextEditorComponents/RichTextToolbarComponents";
import { Dropdown, Input, InputProps, InputRef, theme } from "antd";
import { ReactNode, useRef, useState } from "react";
import { AppIconButton } from "./AppIconButton";
import { AppEmpty } from "DataDisplayComponents/AppEmpty";

export const AppSearchInput = (
  props: InputProps & {
    renderFilter?: ReactNode;
    showFilter?: boolean;
  }
) => {
  const { renderFilter, showFilter = true } = props;

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
      {renderFilter ? renderFilter : <AppEmpty />}
    </div>
  );

  const handleOpenChange = (open: boolean, info: any) => {
    if (!open && info.source === "trigger") {
      setFilterOpen(false);
    }
  };

  return (
    <Dropdown
      open={filterOpen}
      dropdownRender={() => content}
      trigger={["click"]}
      placement="bottomRight"
      onOpenChange={handleOpenChange}
    >
      <Input
        ref={inputRef}
        prefix={<SearchOutlined />}
        suffix={
          showFilter && (
            <AppIconButton type="text" size="small" onClick={handleFilterClick}>
              <Icon>tune</Icon>
            </AppIconButton>
          )
        }
        placeholder="Type to search"
        {...props}
      />
    </Dropdown>
  );
};
