import { CodeBeam } from "DataDisplayComponents/CodeBeam";
import { DescriptionsProps } from "antd";
import { CSSProperties, forwardRef } from "react";
import { Span } from "../Config/DataDisplayInterface";
import { Route } from "../Config/WorkflowConfig";
import { AppDescriptions } from "../DataDisplayComponents/AppDescriptions";
import { formatDate } from "../Utils/DateUtils";
import { parseError } from "../Utils/Serializer";

interface StateCardInfoProps {
  data?: Route;
  style?: CSSProperties;
}

export const StateCardInfo = forwardRef<HTMLDivElement, StateCardInfoProps>(
  (props, ref) => {
    const { data, style } = props;

    const renderNATag = () => {
      return "-";
    };

    const items: DescriptionsProps["items"] = [
      {
        label: "Result name",
        children: data?.resultName ? data?.resultName : renderNATag(),
        span: Span[2],
      },
      {
        label: "Result type",
        children: data?.resultType ? data.resultType : renderNATag(),
        span: Span[2],
      },
      {
        label: "Latency",
        children: data?.metadata?.httpResponse?.latency
          ? `${data?.metadata?.httpResponse.latency} ms`
          : renderNATag(),
        span: Span[2],
      },
      {
        label: "Status code",
        children: data?.metadata?.httpResponse?.statusCode
          ? data?.metadata?.httpResponse?.statusCode
          : renderNATag(),
        span: Span[2],
      },
      {
        label: "Status",
        children: data?.metadata?.httpResponse?.status
          ? data?.metadata?.httpResponse?.status
          : renderNATag(),
        span: Span[2],
      },
      {
        label: "Reason",
        children: data?.metadata?.httpResponse?.reasonPhrase
          ? data?.metadata?.httpResponse?.reasonPhrase
          : renderNATag(),
        span: Span[2],
      },
      {
        label: "Completed",
        children: data?.createdAt ? formatDate(data?.createdAt) : renderNATag(),
        span: Span[2],
      },
      {
        label: "Retried",
        children: data?.nextRetryAt
          ? formatDate(data?.nextRetryAt)
          : renderNATag(),
        span: Span[2],
      },
      ...(data?.metadata?.error
        ? [
            {
              label: "Error",
              children: (
                <CodeBeam
                  value="json"
                  wrapLongLines
                  snippets={[
                    {
                      key: "json",
                      label: "JSON",
                      language: "json",
                      value: parseError(data?.metadata.error) || "",
                    },
                  ]}
                />
              ),
              span: Span[1],
            },
          ]
        : []),
    ];

    return (
      <div
        style={{
          transition: "all 0.3s",
          marginTop: "16px",
          backgroundColor: "white",
          borderRadius: "8px",
          overflow: "auto",
          ...style,
        }}
        ref={ref}
      >
        <AppDescriptions
          labelStyle={{
            fontWeight: 500,
          }}
          size="small"
          items={items}
        />
      </div>
    );
  }
);
