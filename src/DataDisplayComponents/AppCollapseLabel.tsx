import { Col, Flex, Tooltip, Typography } from "antd";
import { CollapseTag } from "../Utils/ObjectUtils";
import { AppTag } from "./AppTag";
import { AppRow } from "LayoutComponents/AppRow";
import { Span } from "Config/DataDisplayInterface";

export const AppCollapseLabel = (props: {
  label: string;
  startTags?: CollapseTag[];
  endTags?: CollapseTag[];
  id?: string;
  step?: number;
}) => {
  const { label, startTags = [], endTags = [], step = 0 } = props;
  return (
    <AppRow gutter={[16, 16]} id={props.id}>
      <Col {...Span[1]}>
        <div className="flex justify-between items-start">
          <Flex gap="16px" align="center">
            <Typography.Text>{label}</Typography.Text>

            <Flex
              gap="4px"
              wrap="wrap"
              style={{ justifyContent: "flex-start" }}
            >
              {startTags.map((tag, i) => (
                <AppTag {...tag} key={i} />
              ))}
            </Flex>
          </Flex>

          <Tooltip title={`Transition ${step}`}>
            <div className="glass-pill px-3 py-1 flex justify-center items-center rounded-full">
              T{step}
            </div>
          </Tooltip>
        </div>
      </Col>

      {endTags.length > 0 && (
        <Col {...Span[1]} className="flex justify-start">
          <Flex gap="8px" wrap="wrap" className="justify-start items-start">
            {endTags.map((tag, i) => (
              <Flex key={i}>
                <AppTag {...tag} key={i} className="rounded-xl" />
              </Flex>
            ))}
          </Flex>
        </Col>
      )}
    </AppRow>
  );
};
