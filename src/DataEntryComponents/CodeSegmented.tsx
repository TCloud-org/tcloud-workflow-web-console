import { Flex } from "antd";
import { CSSProperties, useState } from "react";

interface CodeSegmentedOption {
  label: string;
  value: string;
}
export interface CodeSegmentedProps {
  options?: CodeSegmentedOption[];
  value?: string;
  onChange?: (value: string) => void;
}

const selectedColor = "#5145e5";
const textColor = "#f8fafc";

export const CodeSegmented = (props: CodeSegmentedProps) => {
  const { options = [], value = "", onChange = () => {} } = props;

  const [selected, setSelected] = useState<string>(value);

  const selectedStyle: CSSProperties = {
    backgroundColor: selectedColor,
  };

  return (
    <Flex align="center" gap={8}>
      {options.map((option, i) => (
        <div
          key={i}
          className={`cursor-pointer px-1.5 py-0.5 ${
            selected !== option.value ? "segmented" : ""
          } rounded-md font-medium`}
          style={{
            color: textColor,
            ...(selected === option.value && selectedStyle),
          }}
          onClick={() => {
            setSelected(option.value);
            onChange(option.value);
          }}
        >
          {option.label}
        </div>
      ))}
    </Flex>
  );
};
