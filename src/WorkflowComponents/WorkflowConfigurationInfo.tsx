import { Typography, theme } from "antd";
import { Span } from "../Config/DataDisplayInterface";
import { WorkflowConfiguration } from "../Config/WorkflowConfig";
import { AppDescriptions } from "../DataDisplayComponents/AppDescriptions";
import { AppSurface } from "../DataDisplayComponents/AppSurface";
import { AppTree } from "../DataDisplayComponents/AppTree";
import { AppSpace } from "../LayoutComponents/AppSpace";

export const WorkflowConfigurationInfo = (props: {
  data?: { [key: string]: WorkflowConfiguration | undefined };
  version?: string;
}) => {
  const { token } = theme.useToken();

  const { data = {}, version = "" } = props;

  return (
    <AppSurface style={{ paddingBottom: 0 }}>
      <AppDescriptions
        title="Configuration"
        className="bg-transparent w-full"
        items={[
          {
            key: "workflowAlias",
            label: "Workflow alias".toUpperCase(),
            children: data[version]?.workflowVersionConfig.alias,
            span: Span[1],
          },
          {
            key: "stateAlias",
            label: "State alias".toUpperCase(),
            children:
              Object.entries(data[version]?.stateEndpointConfigMap || {})
                .length === 0 ? (
                "live"
              ) : (
                <AppTree
                  selectable={false}
                  className="bg-transparent"
                  treeData={Object.entries(
                    data[version]?.stateEndpointConfigMap || {}
                  ).map(([k, v]) => ({
                    key: k,
                    title: `${k}: ${v.alias}`,
                    isLeaf: true,
                  }))}
                />
              ),
            span: Span[1],
          },
          {
            key: "serviceAlias",
            label: "Service alias".toUpperCase(),
            children:
              Object.entries(data[version]?.serviceEndpointConfigMap || {})
                .length === 0 ? (
                "live"
              ) : (
                <AppTree
                  selectable={false}
                  className="bg-transparent"
                  treeData={Object.entries(
                    data[version]?.serviceEndpointConfigMap || {}
                  ).map(([k, v]) => ({
                    key: k,
                    title: (
                      <AppSpace size="small" direction="horizontal">
                        <Typography.Text
                          style={{ fontWeight: 500 }}
                        >{`${k}:`}</Typography.Text>
                        <Typography.Text
                          style={{ color: token.colorTextSecondary }}
                        >
                          {v.alias}
                        </Typography.Text>
                      </AppSpace>
                    ),
                  }))}
                />
              ),
            span: Span[1],
          },
        ]}
        layout="vertical"
      />
    </AppSurface>
  );
};
