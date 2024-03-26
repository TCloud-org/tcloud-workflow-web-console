import { Descriptions, DescriptionsProps } from "antd";
import { CSSProperties, forwardRef } from "react";
import { ResultType, Route } from "../Config/WorkflowConfig";
import { AppTag } from "../DataDisplayComponents/AppTag";
import { CodeDisplay } from "../DataDisplayComponents/CodeDisplay";
import { formatDate } from "../Utils/DateUtils";
import { parseError } from "../Utils/Serializer";

interface StateCardInfoProps {
  data?: Route;
  style?: CSSProperties;
}

export const StateCardInfo = forwardRef<HTMLDivElement, StateCardInfoProps>(
  (props, ref) => {
    const { data, style } = props;

    const items: DescriptionsProps["items"] = [
      {
        label: "Result name",
        children: data?.resultName || "n/a",
        span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 },
      },
      {
        label: "Result type",
        children: data?.resultType ? (
          <AppTag type={data?.resultType as keyof ResultType} />
        ) : (
          "n/a"
        ),
        span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 },
      },
      {
        label: "Latency",
        children: data?.executionTime ? `${data?.executionTime} ms` : "n/a",
        span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 },
      },
      {
        label: "Completed at",
        children: formatDate(data?.createdAt) || "n/a",
        span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 },
      },
      {
        label: "Next retry at",
        children: formatDate(data?.nextRetryAt) || "n/a",
        span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 },
      },
      {
        label: "Error",
        children: data?.metadata.error ? (
          <CodeDisplay
            code={parseError(data?.metadata.error)}
            backgroundColor="transparent"
            copyToClipboard
          />
        ) : (
          "n/a"
        ),
        span: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 },
      },
    ];

    return (
      <div
        style={{
          transition: "0.2s",
          overflow: "hidden",
          marginTop: "24px",
          backgroundColor: "white",
          borderRadius: "8px",
          ...style,
        }}
        ref={ref}
      >
        <Descriptions
          bordered
          layout="vertical"
          labelStyle={{
            fontWeight: "bold",
            fontSize: "12px",
          }}
          contentStyle={{
            fontSize: "12px",
          }}
          size="small"
          items={items}
          column={{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }}
        />
      </div>
    );
  }
);
