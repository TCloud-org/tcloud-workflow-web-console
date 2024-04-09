import { Flex, Typography } from "antd";
import { CollapseTag } from "../Utils/ObjectUtils";
import { AppTag } from "./AppTag";

export const AppCollapseLabel = (props: {
  label: string;
  startTags?: CollapseTag[];
  endTags?: CollapseTag[];
}) => {
  const { label, startTags = [], endTags = [] } = props;
  return (
    <Flex justify="space-between" align="flex-start">
      <Flex gap="16px" align="flex-start">
        <Typography.Text>{label}</Typography.Text>

        <Flex gap="4px" wrap="wrap" style={{ justifyContent: "flex-start" }}>
          {startTags.map((tag, i) => (
            <AppTag {...tag} key={i} />
          ))}
        </Flex>
      </Flex>
      <Flex
        gap="4px"
        wrap="wrap"
        style={{ width: "60%", justifyContent: "flex-end" }}
      >
        {endTags.map((tag, i) => (
          <AppTag {...tag} key={i} />
        ))}
      </Flex>
    </Flex>
  );
};
