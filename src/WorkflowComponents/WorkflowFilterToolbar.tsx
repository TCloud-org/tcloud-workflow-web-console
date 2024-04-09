import { EditableColumn } from "Config/LayoutConfig";
import { AppSurface } from "DataDisplayComponents/AppSurface";
import { AppSpace } from "LayoutComponents/AppSpace";
import { formatCamelCaseKey } from "Utils/ObjectUtils";
import { Divider, Flex, Tag } from "antd";
import { Dispatch, Fragment, SetStateAction, useEffect, useRef } from "react";
import { WorkflowFilterSection } from "./WorkflowFilterSection";
import { AppButton } from "DataEntryComponents/AppButton";
import { CloseOutlined } from "@ant-design/icons";
import { AppAnimatedBox } from "LayoutComponents/AppAnimatedBox";

export const WorkflowFilterToolbar = (props: {
  show?: boolean;
  columns?: EditableColumn[];
  rows?: any[];
  filtered?: { [dataIndex: string]: { [value: string]: boolean } };
  setFiltered?: Dispatch<
    SetStateAction<{ [dataIndex: string]: { [value: string]: boolean } }>
  >;
}) => {
  const { show, columns = [], filtered = {}, setFiltered = () => {} } = props;

  const filteredColumns = columns.filter(
    (col) => col.customFilters && col.customFilters.length > 0
  );

  const flexRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (flexRef.current) {
      const height = flexRef.current.scrollHeight;
      flexRef.current.style.maxHeight = show ? `${height}px` : "0";
    }
  }, [flexRef, show, filtered]);

  const anyFilters = (): boolean => {
    return Object.values(filtered).some((filter) =>
      Object.values(filter).some((checked) => checked === true)
    );
  };

  const handleRemoveFilter = (attribute: string, filterValue: string) => {
    setFiltered((prev) => ({
      ...prev,
      [attribute]: {
        ...prev[attribute],
        [filterValue]: !prev[attribute][filterValue],
      },
    }));
  };

  const handleClearFilters = () => {
    setFiltered({});
  };

  return (
    <AppAnimatedBox ref={flexRef}>
      <div style={{ height: "8px" }} />
      <AppSurface>
        <AppSpace>
          <Flex gap="8px" wrap="wrap">
            {filteredColumns.map((col, i) => (
              <Fragment key={i}>
                {i > 0 && <Divider style={{ margin: "8px 0" }} />}
                <WorkflowFilterSection
                  data={col}
                  selected={filtered}
                  setSelected={setFiltered}
                />
              </Fragment>
            ))}
          </Flex>
          {anyFilters() && (
            <Flex justify="space-between" align="flex-start" gap="16px">
              <Flex gap="8px" wrap="wrap">
                {Object.entries(filtered).map(([attribute, filter], i) =>
                  Object.entries(filter).map(
                    ([filterValue, checked], j) =>
                      checked && (
                        <Tag
                          color="processing"
                          key={`${i}-${j}`}
                          closable
                          style={{ margin: 0 }}
                          onClose={() =>
                            handleRemoveFilter(attribute, filterValue)
                          }
                        >
                          {`${formatCamelCaseKey(attribute)} = ${filterValue}`}
                        </Tag>
                      )
                  )
                )}
              </Flex>
              <Flex>
                <AppButton
                  icon={<CloseOutlined />}
                  onClick={handleClearFilters}
                >
                  Clear filters
                </AppButton>
              </Flex>
            </Flex>
          )}
        </AppSpace>
      </AppSurface>
    </AppAnimatedBox>
  );
};
