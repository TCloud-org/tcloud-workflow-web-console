import { AppSurface } from "DataDisplayComponents/AppSurface";
import { DescriptionsProps } from "antd";
import { CSSProperties, forwardRef } from "react";
import { Span } from "../Config/DataDisplayInterface";
import { Route } from "../Config/WorkflowConfig";
import { AppDescriptions } from "../DataDisplayComponents/AppDescriptions";
import { AppTag, TagVariantMapping } from "../DataDisplayComponents/AppTag";
import { CodeDisplay } from "../DataDisplayComponents/CodeDisplay";
import { formatDate } from "../Utils/DateUtils";
import { parseError } from "../Utils/Serializer";
import { LatencyTag } from "./LatencyTag";

interface StateCardInfoProps {
  data?: Route;
  style?: CSSProperties;
}

export const StateCardInfo = forwardRef<HTMLDivElement, StateCardInfoProps>(
  (props, ref) => {
    const { data, style } = props;

    const renderNATag = () => {
      return <AppTag>-</AppTag>;
    };

    const items: DescriptionsProps["items"] = [
      {
        label: "Result name",
        children: data?.resultName ? (
          <AppTag>{data?.resultName}</AppTag>
        ) : (
          renderNATag()
        ),
        span: Span[4],
      },
      {
        label: "Result type",
        children: data?.resultType ? (
          <AppTag
            color={TagVariantMapping[data.resultType]?.color}
            icon={TagVariantMapping[data.resultType]?.icon}
          >
            {data.resultType}
          </AppTag>
        ) : (
          renderNATag()
        ),
        span: Span[4],
      },
      {
        label: "Latency",
        children: data?.metadata?.httpResponse?.latency ? (
          <LatencyTag latency={data?.metadata?.httpResponse.latency} />
        ) : (
          renderNATag()
        ),
        span: Span[4],
      },
      {
        label: "Status code",
        children: data?.metadata?.httpResponse?.statusCode ? (
          <AppTag
            color={
              data?.metadata?.httpResponse?.statusCode === 200
                ? "green-inverse"
                : "red-inverse"
            }
          >
            {data?.metadata?.httpResponse?.statusCode}
          </AppTag>
        ) : (
          renderNATag()
        ),
        span: Span[4],
      },
      {
        label: "Status",
        children: data?.metadata?.httpResponse?.status ? (
          <AppTag>{data?.metadata?.httpResponse?.status}</AppTag>
        ) : (
          renderNATag()
        ),
        span: Span[4],
      },
      {
        label: "Reason",
        children: data?.metadata?.httpResponse?.reasonPhrase ? (
          <AppTag>{data?.metadata?.httpResponse?.reasonPhrase}</AppTag>
        ) : (
          renderNATag()
        ),
        span: Span[4],
      },
      {
        label: "Completed",
        children: data?.createdAt ? (
          <AppTag>{formatDate(data?.createdAt)}</AppTag>
        ) : (
          renderNATag()
        ),
        span: Span[4],
      },
      {
        label: "Retried",
        children: data?.nextRetryAt ? (
          <AppTag>{formatDate(data?.nextRetryAt)}</AppTag>
        ) : (
          renderNATag()
        ),
        span: Span[4],
      },
      ...(data?.metadata?.error
        ? [
            {
              label: "Error",
              children: (
                <AppSurface size="small">
                  <CodeDisplay
                    code={parseError(data?.metadata.error)}
                    copyToClipboard
                  />
                </AppSurface>
              ),
              span: Span[1],
            },
          ]
        : []),
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
        <AppDescriptions
          layout="vertical"
          labelStyle={{
            fontWeight: "bold",
            fontSize: "12px",
          }}
          contentStyle={{
            fontSize: "12px",
          }}
          size="small"
          style={{ padding: "16px 16px 8px 16px" }}
          items={items}
        />
      </div>
    );
  }
);
