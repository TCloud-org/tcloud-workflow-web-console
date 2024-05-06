import { Flex, Typography, theme } from "antd";
import { useParams } from "react-router-dom";
import { Span } from "../Config/DataDisplayInterface";
import { WorkflowConfiguration } from "../Config/WorkflowConfig";
import { AppCopy } from "../DataDisplayComponents/AppCopy";
import { AppDescriptions } from "../DataDisplayComponents/AppDescriptions";
import { AppSurface } from "../DataDisplayComponents/AppSurface";
import { AppTree } from "../DataDisplayComponents/AppTree";
import { AppSpace } from "../LayoutComponents/AppSpace";

export const WorkflowConfigurationInfo = (props: {
  data?: { [key: string]: WorkflowConfiguration | undefined };
  version?: string;
}) => {
  const { token } = theme.useToken();

  const { workId = "" } = useParams();
  const { data = {}, version = "" } = props;

  return (
    <AppSurface type="form" style={{ paddingBottom: 0 }}>
      <AppDescriptions
        title="Configuration"
        items={[
          {
            key: "workId",
            label: "Work Id",
            children: (
              <Flex align="flex-start" style={{ gap: 4 }}>
                {workId}
                <AppCopy size="small" type="text" content={workId} />
              </Flex>
            ),
            span: Span[2],
          },
          {
            key: "workflowAlias",
            label: "Workflow alias",
            children: data[version]?.workflowVersionConfig.alias,
            span: Span[2],
          },
          {
            key: "stateAlias",
            label: "State alias",
            children:
              Object.entries(data[version]?.stateEndpointConfigMap || {})
                .length === 0 ? (
                "live"
              ) : (
                <AppTree
                  style={{ backgroundColor: token.colorFillAlter }}
                  selectable={false}
                  treeData={Object.entries(
                    data[version]?.stateEndpointConfigMap || {}
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
            span: Span[2],
          },
          {
            key: "serviceAlias",
            label: "Service alias",
            children:
              Object.entries(data[version]?.serviceEndpointConfigMap || {})
                .length === 0 ? (
                "live"
              ) : (
                <AppTree
                  style={{ backgroundColor: token.colorFillAlter }}
                  selectable={false}
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
            span: Span[2],
          },
        ]}
        layout="vertical"
      />
    </AppSurface>
  );
};
