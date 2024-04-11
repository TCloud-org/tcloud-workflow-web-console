import { AutoComplete, AutoCompleteProps, Input, InputProps } from "antd";

export const AppSearchBar = (
  props: InputProps & {
    options?: AutoCompleteProps["options"];
    onAutoSelect?: AutoCompleteProps["onSelect"];
    onAutoChange?: AutoCompleteProps["onChange"];
  }
) => {
  return (
    <AutoComplete
      options={props.options}
      onSelect={props.onAutoSelect}
      onChange={props.onAutoChange}
      value={props.value}
      onKeyDown={props.onKeyDown}
      style={{ width: "100%", ...props.style }}
    >
      <Input placeholder={props.placeholder} />
    </AutoComplete>
  );
};
