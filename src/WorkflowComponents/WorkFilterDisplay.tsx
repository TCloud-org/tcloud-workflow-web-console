import { CloseOutlined } from "@ant-design/icons";
import { Clause } from "Config/FilterConfig";
import { AppEmpty } from "DataDisplayComponents/AppEmpty";
import { AppSurface } from "DataDisplayComponents/AppSurface";
import { AppTag } from "DataDisplayComponents/AppTag";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppSpace } from "LayoutComponents/AppSpace";
import { formatDateString } from "Utils/DateUtils";
import { noFilters } from "Utils/ObjectUtils";
import { Flex, Typography } from "antd";
import { Dispatch, SetStateAction } from "react";

export const WorkFilterDisplay = (props: {
  data: Clause[];
  setClauses?: Dispatch<SetStateAction<any[]>>;
}) => {
  const { data = [], setClauses = () => {} } = props;

  const handleCloseCheckbox = (value: string, index: number) => {
    const clauses = [...data];
    clauses[index].checkbox = {
      ...clauses[index].checkbox,
      [value]: false,
    };
    setClauses(clauses);
  };

  const handleClose = (index: number) => {
    const clauses = [...data];
    clauses.splice(index, 1);
    setClauses(clauses);
  };

  const renderFilterTags = (item: Clause, i: number) => {
    if (item.checkbox) {
      return Object.entries(item.checkbox).map(([k, v], j) =>
        v ? (
          <AppTag
            key={`${i}-${j}`}
            closable
            color="geekblue"
            onClose={() => handleCloseCheckbox(k, i)}
          >
            {`${item.attribute} = ${k}`}
          </AppTag>
        ) : null
      );
    }

    if (item.date) {
      const date = item.date;
      const start = formatDateString(date.start as string);
      let value = `${item.condition} ${start}`;
      if (date.end) {
        value = `${start} AND ${formatDateString(date.end as string)}`;
      }
      return (
        <AppTag
          key={i}
          closable
          color="geekblue"
          onClose={() => handleClose(i)}
        >
          {`${item.attribute} ${item.condition} ${value}`}
        </AppTag>
      );
    }

    return (
      <AppTag
        key={`${item.attribute}-${i}`}
        closable
        color="geekblue"
        onClose={() => handleClose(i)}
      >
        {`${item.attribute} ${item.condition}${
          item.input ? ` ${item.input.trim()}` : ""
        }`}
      </AppTag>
    );
  };

  return (
    <AppSurface type="form" className="h-full w-full">
      <AppSpace>
        <Typography.Title style={{ margin: 0 }} level={5}>
          Filters
        </Typography.Title>

        {noFilters(data) ? (
          <AppEmpty />
        ) : (
          <Flex wrap="wrap" gap="8px">
            {data.map((item, i) => renderFilterTags(item, i))}
            <AppButton
              icon={<CloseOutlined style={{ fontSize: "10px" }} />}
              style={{ fontSize: "12px" }}
              onClick={() => setClauses([])}
            >
              Clear filters
            </AppButton>
          </Flex>
        )}
      </AppSpace>
    </AppSurface>
  );
};
