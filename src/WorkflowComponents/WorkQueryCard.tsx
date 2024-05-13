import { CloseOutlined } from "@ant-design/icons";
import { Clause } from "Config/FilterConfig";
import { AppCard } from "DataDisplayComponents/AppCard";
import { AppTag } from "DataDisplayComponents/AppTag";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppIconButton } from "DataEntryComponents/AppIconButton";
import { Flex, message, theme } from "antd";
import { FilterQuery, activate, remove } from "features/filter/workFilterSlice";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react/jsx-runtime";

export const WorkQueryCard = (props: { query: FilterQuery }) => {
  const dispatch = useDispatch();

  const { token } = theme.useToken();

  const [messageApi, contextHolder] = message.useMessage();

  const { active }: { active?: string } = useSelector(
    (state: any) => state.workFilter
  );

  const {
    query: { key, clauses = [] },
  } = props;

  const isActivated = active === key;

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

    if (!clause.input) {
      return null;
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
    dispatch(remove(key));
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(getQueryText())
      .then(() => messageApi.success(`Query ${key} copied to clipboard`))
      .catch((error) =>
        console.error("Error copying JSON to clipboard: ", error)
      );
  };

  const getQueryText = (): string => {
    let queryString = "";
    clauses.forEach((clause, i) => {
      queryString += `${i > 0 ? `${clause.operator}` : "WHERE"} ${
        clause.attribute
      } ${clause.condition} ${getValueText(clause)}${
        i !== clauses.length - 1 ? "\n" : ""
      }`;
    });
    return queryString;
  };

  const handleActivate = () => {
    dispatch(activate(key));
  };

  const handleEdit = () => {};

  return (
    <Fragment>
      {contextHolder}
      <AppCard
        title={`${key}${isActivated ? " (Active)" : ""}`}
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
          <AppButton type="text" onClick={handleActivate} danger={isActivated}>
            {isActivated ? "Deactivate" : "Activate"}
          </AppButton>,
          <AppButton type="text" onClick={handleEdit}>
            Edit
          </AppButton>,
          <AppButton type="text" onClick={handleCopy}>
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
      </AppCard>
    </Fragment>
  );
};
