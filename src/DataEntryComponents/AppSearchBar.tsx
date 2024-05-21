import { SearchRounded } from "@mui/icons-material";
import { AutoComplete, AutoCompleteProps, Input } from "antd";

export const AppSearchBar = (props: AutoCompleteProps) => {
  return (
    <AutoComplete
      options={props.options}
      onSelect={props.onSelect}
      onChange={props.onChange}
      value={props.value}
      onKeyDown={props.onKeyDown}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        ...props.style,
      }}
      className={props.className}
    >
      <Input
        size={props.size}
        prefix={<SearchRounded style={{ fontSize: "inherit" }} />}
        placeholder={props.placeholder as string}
      />
    </AutoComplete>
  );
};
