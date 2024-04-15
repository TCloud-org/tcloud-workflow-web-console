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
      style={{
        width: "100%",
        backgroundColor: "transparent",
        ...props.style,
      }}
      size={props.size}
      variant="borderless"
    >
      <Input
        placeholder={props.placeholder}
        size={props.size}
        style={{ width: "100%" }}
        variant="filled"
      />
    </AutoComplete>
  );
};
