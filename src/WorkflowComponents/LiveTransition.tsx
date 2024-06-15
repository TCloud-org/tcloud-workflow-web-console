import { CloseRounded } from "@mui/icons-material";
import { Span, createSpan } from "Config/DataDisplayInterface";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { Col, Flex, Radio, Steps, Typography } from "antd";
import axios from "axios";
import { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { WOS_TRANSITION_STATE_ENDPOINT } from "../Config/WOSEndpointConfig";
import { Graph, Route } from "../Config/WorkflowConfig";
import { AppEmpty } from "../DataDisplayComponents/AppEmpty";
import { AppButton } from "../DataEntryComponents/AppButton";
import { AppIconButton } from "../DataEntryComponents/AppIconButton";
import { AppRow } from "../LayoutComponents/AppRow";
import { AppSheet } from "../LayoutComponents/AppSheet";
import { AppSpace } from "../LayoutComponents/AppSpace";
import {
  extractStatesAfterSource,
  getLastRouteSource,
} from "../Utils/ObjectUtils";

export const LiveTransition = forwardRef<
  HTMLDivElement,
  {
    onClose?: () => void;
    routes?: Route[];
    graph?: Graph;
  }
>(({ onClose = () => {}, routes = [], graph }, ref) => {
  const { workId } = useParams();

  const authToken = useSelector((state: any) => state.auth.token);
  const clientId = useSelector((state: any) => state.client.clientId);
  const { workflowId } = useSelector(
    (state: any) => state.workflow.workflow || {}
  );

  const [from, setFrom] = useState<string>("None");
  const [to, setTo] = useState<string>("None");
  const [nextStates, setNextStates] = useState<string[]>([]);
  const [otherStates, setOtherStates] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (routes.length > 0 && graph) {
      const source = getLastRouteSource(routes);
      setFrom(source);
      const statesAfterSource = extractStatesAfterSource(source, graph);
      setNextStates(statesAfterSource.filter((_, i) => i === 0));
      setOtherStates(statesAfterSource.filter((_, i) => i > 0));
    }
  }, [routes, graph]);

  const handleTransition = async () => {
    if (from && to && from !== "None" && to !== "None") {
      setLoading(true);

      const params = {
        clientId,
        workflowId,
        workIds: [workId],
        from,
        to,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      await axios.post(WOS_TRANSITION_STATE_ENDPOINT, params, config);

      setLoading(false);
    }
    onClose();
  };

  return (
    <AppSheet
      ref={ref}
      style={{
        marginTop: "16px",
      }}
    >
      <AppSpace>
        <PageTitle
          style={{ paddingTop: 0 }}
          level={5}
          endDecorator={
            <AppIconButton type="text" onClick={onClose}>
              <CloseRounded />
            </AppIconButton>
          }
        >
          Transition
        </PageTitle>
        <Steps
          progressDot
          direction="vertical"
          current={2}
          items={[
            {
              title: "Choose Source",
              description: (
                <AppRow className="mt-2">
                  <Col {...createSpan(4)}>
                    <Typography.Text>Current state</Typography.Text>
                  </Col>

                  <Col {...createSpan(20)}>
                    <Radio.Group
                      buttonStyle="solid"
                      style={{ width: "100%" }}
                      value={from}
                    >
                      <Radio.Button style={{ width: "100%" }} value={from}>
                        {from}
                      </Radio.Button>
                    </Radio.Group>
                  </Col>
                </AppRow>
              ),
            },
            {
              title: "Choose Target",
              description: (
                <AppRow className="mt-2">
                  <Col {...Span[1]}>
                    <AppSpace>
                      {nextStates.length > 0 && (
                        <AppRow>
                          <Col {...createSpan(4)}>
                            <Typography.Text>Next state</Typography.Text>
                          </Col>

                          <Col {...createSpan(20)}>
                            <Flex vertical gap={16}>
                              {nextStates.map((state, i) => (
                                <Radio.Group
                                  key={i}
                                  buttonStyle="solid"
                                  style={{ width: "100%" }}
                                  value={to}
                                  onChange={(e) => setTo(e.target.value)}
                                >
                                  <Radio.Button
                                    style={{ width: "100%" }}
                                    value={state}
                                  >
                                    {state}
                                  </Radio.Button>
                                </Radio.Group>
                              ))}
                            </Flex>
                          </Col>
                        </AppRow>
                      )}
                      {otherStates.length > 0 && (
                        <AppRow>
                          <Col {...createSpan(4)}>
                            <Typography.Text>Other state</Typography.Text>
                          </Col>

                          <Col {...createSpan(20)}>
                            <Flex vertical gap={16}>
                              {otherStates.map((state, i) => (
                                <Radio.Group
                                  key={i}
                                  buttonStyle="solid"
                                  style={{ width: "100%" }}
                                  value={to}
                                  onChange={(e) => setTo(e.target.value)}
                                >
                                  <Radio.Button
                                    key={i}
                                    style={{
                                      width: "100%",
                                    }}
                                    value={state}
                                  >
                                    {state}
                                  </Radio.Button>
                                </Radio.Group>
                              ))}
                            </Flex>
                          </Col>
                        </AppRow>
                      )}
                      {nextStates.length === 0 && <AppEmpty />}
                    </AppSpace>
                  </Col>
                </AppRow>
              ),
            },
          ]}
        />

        <AppButton
          type="primary"
          loading={loading}
          onClick={handleTransition}
          tooltip={`Transition from ${from} to ${to}`}
        >
          Transition
        </AppButton>
      </AppSpace>
    </AppSheet>
  );
});
