import { EditableColumn } from "Config/LayoutConfig";
import { AppSurface } from "DataDisplayComponents/AppSurface";
import { AppAnimatedBox } from "LayoutComponents/AppAnimatedBox";
import { AppRow } from "LayoutComponents/AppRow";
import { AppSpace } from "LayoutComponents/AppSpace";
import { Col, Flex, Switch, Typography } from "antd";
import { useEffect, useRef } from "react";

export const WorkflowSettingsToolbar = (props: {
  rows?: any[];
  columns?: EditableColumn[];
  active?: boolean;
}) => {
  const { rows = [], columns = [], active } = props;

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

  const selected = columns.reduce((res: { [key: string]: boolean }, col) => {
    res[col.dataIndex || ""] = true;
    return res;
  }, {});

  useEffect(() => {
    if (boxRef.current) {
      const height = boxRef.current.scrollHeight;
      boxRef.current.style.maxHeight = active ? `${height}px` : "0";
    }
  }, [boxRef, active]);

  return (
    <AppAnimatedBox ref={boxRef}>
      <div style={{ height: "8px" }} />
      <AppSurface>
        <AppSpace>
          <Typography.Text strong>Attributes</Typography.Text>
          <AppRow>
            {attributes.map((attribute, i) => (
              <Col key={i} span={12}>
                <Flex gap="8px" align="center">
                  <Switch
                    checked={selected[attribute]}
                    size="small"
                    onChange={(checked) => console.log(attribute, checked)}
                  />
                  <Typography.Text>{attribute}</Typography.Text>
                </Flex>
              </Col>
            ))}
          </AppRow>
        </AppSpace>
      </AppSurface>
    </AppAnimatedBox>
  );
};
