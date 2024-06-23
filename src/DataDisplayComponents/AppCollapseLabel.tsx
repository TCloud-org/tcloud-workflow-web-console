import { Span } from "Config/DataDisplayInterface";
import { formatDate } from "Utils/DateUtils";
import { Col, Flex, Row } from "antd";
import { CollapseTag } from "../Utils/ObjectUtils";
import { AppTag } from "./AppTag";

export const AppCollapseLabel = (props: {
  label: string;
  startTags?: CollapseTag[];
  endTags?: CollapseTag[];
  id?: string;
  step?: number;
  time?: string;
}) => {
  const { label, startTags = [], endTags = [], time = "" } = props;

  return (
    <Row gutter={[16, 16]} id={props.id}>
      <Col {...Span[1]}>
        <div className="flex justify-between items-start">
          <Flex gap={8} align="center">
            <p className="font-semibold">{label}</p>

            <p>•</p>

            <p>{formatDate(time)}</p>

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
    </Row>
  );
};
