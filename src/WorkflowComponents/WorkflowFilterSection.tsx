import { Span } from "Config/DataDisplayInterface";
import { EditableColumn } from "Config/LayoutConfig";
import { AppRow } from "LayoutComponents/AppRow";
import { formatCamelCaseKey } from "Utils/ObjectUtils";
import { Checkbox, Col, Flex, Typography } from "antd";
import { Dispatch, SetStateAction } from "react";

export const WorkflowFilterSection = (props: {
  data: EditableColumn;
  selected?: { [key: string]: { [key: string]: boolean } };
  setSelected?: Dispatch<
    SetStateAction<{ [key: string]: { [key: string]: boolean } }>
  >;
}) => {
  const { data, selected = {}, setSelected = () => {} } = props;

  return (
    <Flex gap="16px" align="flex-start" style={{ width: "100%" }}>
      <Typography.Text strong style={{ flex: 2 }}>
        {formatCamelCaseKey(data.dataIndex || "")}
      </Typography.Text>
      <AppRow style={{ flex: 6 }}>
        {data.customFilters?.map((filter, i) => (
          <Col key={i} {...Span[4]}>
            <Checkbox
              checked={
                selected[data.dataIndex || ""]?.[filter.value.toString()]
              }
              style={{ flex: 1 }}
              key={i}
              onClick={() =>
                setSelected((prev) => ({
                  ...prev,
                  [data.dataIndex || ""]: {
                    ...prev[data.dataIndex || ""],
                    [filter.value.toString()]: !(
                      prev[data.dataIndex || ""]?.[filter.value.toString()] ||
                      false
                    ),
                  },
                }))
              }
            >
              {filter.text}
            </Checkbox>
          </Col>
        ))}
      </AppRow>
    </Flex>
  );
};
