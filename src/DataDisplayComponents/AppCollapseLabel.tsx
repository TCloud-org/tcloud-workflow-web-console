import { Col, Flex, Typography } from "antd";
import { CollapseTag } from "../Utils/ObjectUtils";
import { AppTag } from "./AppTag";
import { AppRow } from "LayoutComponents/AppRow";
import { Span } from "Config/DataDisplayInterface";

export const AppCollapseLabel = (props: {
  label: string;
  startTags?: CollapseTag[];
  endTags?: CollapseTag[];
}) => {
  const { label, startTags = [], endTags = [] } = props;
  return (
    <AppRow gutter={[16, 16]}>
      <Col {...Span[1]}>
        <Flex gap="16px" align="flex-start">
          <Typography.Text>{label}</Typography.Text>

          <Flex gap="4px" wrap="wrap" style={{ justifyContent: "flex-start" }}>
            {startTags.map((tag, i) => (
              <AppTag {...tag} key={i} />
            ))}
          </Flex>
        </Flex>
      </Col>

      <Col {...Span[1]} className="flex justify-start ">
        <Flex gap="4px" wrap="wrap" className="justify-start items-start">
          {endTags.map((tag, i) => (
            <Flex key={i}>
              <AppTag {...tag} key={i} className="rounded-xl" />
            </Flex>
          ))}
        </Flex>
      </Col>
    </AppRow>
  );
};
