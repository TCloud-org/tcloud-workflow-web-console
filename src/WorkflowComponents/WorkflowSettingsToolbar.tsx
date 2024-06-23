import { EditableColumn } from "Config/LayoutConfig";
import { AppAnimatedBox } from "LayoutComponents/AppAnimatedBox";
import { AppRow } from "LayoutComponents/AppRow";
import { AppSpace } from "LayoutComponents/AppSpace";
import { Col, Flex, Switch, Typography } from "antd";
import { useEffect, useRef, useState } from "react";

export const WorkflowSettingsToolbar = (props: {
  rows?: any[];
  columns?: EditableColumn[];
  active?: boolean;
  onChange?: (selected: { [key: string]: boolean }) => void;
  disabled?: { [key: string]: boolean };
}) => {
  const {
    rows = [],
    columns = [],
    active,
    onChange = () => {},
    disabled = {},
  } = props;

  const boxRef = useRef<HTMLDivElement>(null);

  const attributes = Object.keys(
    rows.reduce(
      (acc, row) =>
        Object.keys(row).reduce((res: { [key: string]: boolean }, k) => {
          res[k] = true;
          return res;
        }, acc),
      {}
    )
  );

  const [selected, setSelected] = useState<{ [key: string]: boolean }>(
    columns.reduce((res: { [key: string]: boolean }, col) => {
      res[col.dataIndex || ""] = col.hidden === undefined ? true : !col.hidden;
      return res;
    }, {})
  );

  useEffect(() => {
    if (boxRef.current) {
      const height = boxRef.current.scrollHeight;
      boxRef.current.style.maxHeight = active ? `${height}px` : "0";
    }
  }, [boxRef, active]);

  const handleSelect = (attribute: string, checked: boolean) => {
    const updatedSelected = { ...selected, [attribute]: checked };
    setSelected(updatedSelected);
    onChange(updatedSelected);
  };

  return (
    <AppAnimatedBox ref={boxRef}>
      <div style={{ height: "8px" }} />
      <AppSpace>
        <Typography.Text strong>Attributes</Typography.Text>
        <AppRow>
          {attributes.map((attribute, i) => (
            <Col key={i} span={12}>
              <Flex gap="8px" align="center">
                <Switch
                  checked={selected[attribute]}
                  disabled={
                    disabled[attribute] ||
                    columns.findIndex(
                      (item) => item.dataIndex === attribute
                    ) === -1
                  }
                  onChange={(checked) => handleSelect(attribute, checked)}
                />
                <Typography.Text>{attribute}</Typography.Text>
              </Flex>
            </Col>
          ))}
        </AppRow>
      </AppSpace>
    </AppAnimatedBox>
  );
};
