import { Select } from "antd";
import { KeyboardEvent, useEffect, useState } from "react";

export const AppChipInput = (props: {
  value?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
}) => {
  const { onChange = () => {}, placeholder, value = [] } = props;

  const [values, setValues] = useState<string[]>(value);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    setValues(value);
  }, [value]);

  const handleSearch = (value: string) => {
    setQuery(value);
  };

  const handleChange = (changes: string[]) => {
    setValues(changes);
    onChange(changes);
  };

  const handleInputEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      if (query) {
        const newValues = [...values, query];
        setValues(newValues);
        onChange(newValues);
        setQuery("");
      }
    }
  };

  return (
    <Select
      mode="multiple"
      placeholder={placeholder}
      onSearch={handleSearch}
      onInputKeyDown={handleInputEnter}
      onChange={handleChange}
      value={values}
      searchValue={query}
      dropdownStyle={{ display: "none" }}
      suffixIcon={null}
    />
  );
};
