import { AutoComplete, AutoCompleteProps } from "antd";

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
        ...props.style,
      }}
      variant="borderless"
      placeholder={props.placeholder}
    />
  );
};
