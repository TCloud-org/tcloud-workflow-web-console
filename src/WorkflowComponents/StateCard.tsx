import { DownOutlined } from "@ant-design/icons";
import { Card, Flex, theme } from "antd";
import { useEffect, useRef, useState } from "react";
import { Route } from "../Config/WorkflowConfig";
import { StateCardInfo } from "./StateCardInfo";

export const StateCard = (props: { data?: Route }) => {
  const { data } = props;

  const {
    token: {
      colorSuccessBg,
      colorSuccessBorder,
      colorErrorBg,
      colorErrorBorder,
      colorWarningBg,
      colorWarningBorder,
      colorInfoBg,
      colorInfoBorder,
      colorFillAlter,
      colorFill,
    },
  } = theme.useToken();

  const ResultColorMapping = {
    success: {
      backgroundColor: colorSuccessBg,
      borderColor: colorSuccessBorder,
    },
    failure: {
      backgroundColor: colorErrorBg,
      borderColor: colorErrorBorder,
    },
    pending: {
      backgroundColor: colorWarningBg,
      borderColor: colorWarningBorder,
    },
    default: {
      backgroundColor: colorInfoBg,
      borderColor: colorInfoBorder,
    },
    notified: {
      backgroundColor: colorInfoBg,
      borderColor: colorInfoBorder,
    },
    terminal: {
      backgroundColor: colorFillAlter,
      borderColor: colorFill,
    },
  };

  const expandedViewRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (expandedViewRef.current) {
      const contentHeight = expandedViewRef.current?.scrollHeight;
      expandedViewRef.current.style.height = expanded
        ? `${contentHeight}px`
        : "0";
      if (expandedViewRef.current.style.height === "0px") {
        expandedViewRef.current.style.marginBottom = "-24px";
      } else {
        expandedViewRef.current.style.marginBottom = "0px";
      }
    }
  });

  return (
    <Card
      type="inner"
      size="small"
      style={{
        backgroundColor:
          ResultColorMapping[
            data?.resultType as keyof typeof ResultColorMapping
          ]?.backgroundColor,
        borderColor:
          ResultColorMapping[
            data?.resultType as keyof typeof ResultColorMapping
          ].borderColor,
        lineHeight: 1,
        paddingTop: 4,
        paddingBottom: 4,
        position: "relative",
      }}
    >
      <Flex
        justify="space-between"
        onClick={() => setExpanded((prev) => !prev)}
        style={{
          cursor: "pointer",
          position: "absolute",
          width: "100%",
          top: 0,
          left: 0,
          right: 0,
          alignItems: "center",
          lineHeight: 2.25,
          paddingLeft: 12,
          paddingRight: 12,
          borderRadius: "6px",
        }}
      >
        {data?.source}
        <DownOutlined
          style={{
            fontSize: "12px",
            transition: "0.2s",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </Flex>
      <StateCardInfo ref={expandedViewRef} data={data} />
    </Card>
  );
};
