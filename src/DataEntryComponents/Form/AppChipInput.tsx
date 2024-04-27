import { Select } from "antd";
import { FocusEvent, KeyboardEvent, useState } from "react";

export const AppChipInput = (props: {
  value?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
}) => {
  const { onChange = () => {}, placeholder, value = [] } = props;

  const [query, setQuery] = useState<string>("");

  const handleSearch = (value: string) => {
    setQuery(value);
  };

  const handleChange = (changes: string[]) => {
    onChange(changes);
  };

  const handleInputEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      if (query) {
        appendNewQuery();
      }
    }
  };

  const handleBlur = (_: FocusEvent<HTMLInputElement>) => {
    if (query) {
      appendNewQuery();
    }
  };

  const appendNewQuery = () => {
    const newValues = [...value, query];
    onChange(newValues);
    setQuery("");
  };

  return (
    <Select
      mode="multiple"
      disabled={props.disabled}
      placeholder={placeholder}
      onSearch={handleSearch}
      onInputKeyDown={handleInputEnter}
      onClick={(e) => {}}
      onChange={handleChange}
      onBlur={handleBlur}
      value={value}
      searchValue={query}
      dropdownStyle={{ display: "none" }}
      suffixIcon={null}
      autoClearSearchValue={false}
    />
  );
};
