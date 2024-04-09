import { CloseOutlined } from "@ant-design/icons";
import { Clause } from "Config/FilterConfig";
import { AppTag } from "DataDisplayComponents/AppTag";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppIconButton } from "DataEntryComponents/AppIconButton";
import { Card, Flex, message, theme } from "antd";
import { activate, remove } from "features/filter/workFilterSlice";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react/jsx-runtime";

export const WorkQueryCard = (props: {
  clauses?: Clause[];
  index?: number;
}) => {
  const dispatch = useDispatch();

  const { token } = theme.useToken();

  const [messageApi, contextHolder] = message.useMessage();

  const { active }: { active?: number } = useSelector(
    (state: any) => state.workFilter
  );

  const { clauses = [], index = 0 } = props;

  const isActivated = active === index;

  const getValue = (clause: Clause) => {
    if (clause.date) {
      if (clause.date.end) {
        return (
          <div>
            {`'${clause.date.start}' `}
            <span style={{ fontWeight: 600 }}>AND</span>
            {` '${clause.date.end}'`}
          </div>
        );
      }
      return `'${clause.date.start}'`;
    }
    if (clause.checkbox) {
      return `(${Object.entries(clause.checkbox)
        .filter(([_, v]) => v)
        .map(([k, _]) => `'${k}'`)
        .join(", ")})`;
    }

    return `'${clause.input.trim()}'`;
  };

  const getValueText = (clause: Clause) => {
    if (clause.date) {
      if (clause.date.end) {
        return `'${clause.date.start}' AND '${clause.date.end}'`;
      }
      return `'${clause.date.start}'`;
    }
    if (clause.checkbox) {
      return `(${Object.keys(clause.checkbox)
        .map((k) => `'${k}'`)
        .join(", ")})`;
    }

    return `'${clause.input.trim()}'`;
  };

  const handleRemove = () => {
    dispatch(remove(index));
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(getQueryText())
      .then(() => messageApi.success(`Query ${index + 1} copied to clipboard`))
      .catch((error) =>
        console.error("Error copying JSON to clipboard: ", error)
      );
  };

  const getQueryText = (): string => {
    let query = "";
    clauses.forEach((clause, i) => {
      query += `${i > 0 ? `${clause.operator}` : "WHERE"} ${clause.attribute} ${
        clause.condition
      } ${getValueText(clause)}${i !== clauses.length - 1 ? "\n" : ""}`;
    });
    return query;
  };

  const handleActivate = () => {
    dispatch(activate(index));
  };

  const handleEdit = () => {};

  return (
    <Fragment>
      {contextHolder}
      <Card
        title={`Query ${index + 1}${isActivated ? " (Active)" : ""}`}
        bordered={false}
        size="small"
        extra={
          <AppIconButton size="small" type="text" onClick={handleRemove}>
            <CloseOutlined />
          </AppIconButton>
        }
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        styles={{
          title: {
            color: isActivated ? token.colorInfoActive : undefined,
          },
          body: {
            flex: 1,
          },
        }}
        actions={[
          <AppButton
            type="text"
            onClick={handleActivate}
            danger={isActivated}
            style={{ width: "80%" }}
          >
            {isActivated ? "Deactivate" : "Activate"}
          </AppButton>,
          <AppButton type="text" onClick={handleEdit} style={{ width: "80%" }}>
            Edit
          </AppButton>,
          <AppButton type="text" onClick={handleCopy} style={{ width: "80%" }}>
            Copy
          </AppButton>,
        ]}
      >
        <Flex gap="8px" vertical>
          {clauses.map((clause, i) => (
            <AppTag key={i} style={{ whiteSpace: "normal" }}>
              <span style={{ fontWeight: 600 }}>{`${
                i > 0 ? `${clause.operator}` : "WHERE"
              }`}</span>
              {` ${clause.attribute} `}
              <span style={{ fontWeight: 600 }}>{`${clause.condition} `}</span>
              {getValue(clause)}
            </AppTag>
          ))}
        </Flex>
      </Card>
    </Fragment>
  );
};
