import { AppSurface } from "DataDisplayComponents/AppSurface";
import { AppRow } from "LayoutComponents/AppRow";
import { Col, Flex, Radio, Steps, Typography } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ListItem, createSpan } from "../../Config/DataDisplayInterface";
import { WOS_TRANSITION_STATE_ENDPOINT } from "../../Config/WOSEndpointConfig";
import { Graph, Route } from "../../Config/WorkflowConfig";
import { AppEmpty } from "../../DataDisplayComponents/AppEmpty";
import { AppList } from "../../DataDisplayComponents/AppList";
import { AppButton } from "../../DataEntryComponents/AppButton";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { AppVerticalStepContent } from "../../LayoutComponents/AppVerticalStepContent";
import { getGraphById } from "../../Network/WorkflowFetch";
import { extractStatesAfterSource } from "../../Utils/ObjectUtils";

export const BatchTransitionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    route,
    bucketId,
    workIds,
  }: { route: Route; bucketId: string; workIds: string[] } =
    location?.state || {};

  const authToken = useSelector((state: any) => state.auth.token);
  const clientId = useSelector((state: any) => state.client.clientId);
  const { workflowId } = useSelector(
    (state: any) => state.workflow.workflow || {}
  );

  const [current, setCurrent] = useState<number>(0);
  const [graph, setGraph] = useState<Graph>();
  const [loading, setLoading] = useState<boolean>(false);
  const [transitionLoading, setTransitionLoading] = useState<boolean>(false);
  const [from, setFrom] = useState<string>("None");
  const [to, setTo] = useState<string>("None");
  const [nextStates, setNextStates] = useState<string[]>([]);
  const [otherStates, setOtherStates] = useState<string[]>([]);

  const fetchGraph = useCallback(async () => {
    if (route && route.graphId) {
      setLoading(true);

      const output = await getGraphById(route.graphId, authToken);
      setGraph(output.graph);

      setLoading(false);
    }
  }, [route, authToken]);

  useEffect(() => {
    if (graph && route) {
      setFrom(route.source);
      const statesAfterSource = extractStatesAfterSource(route.source, graph);
      setNextStates(statesAfterSource.filter((_, i) => i === 0));
      setOtherStates(statesAfterSource.filter((_, i) => i > 0));
    }
  }, [graph, route]);

  useEffect(() => {
    fetchGraph();
  }, [fetchGraph]);

  const handleBatchTransition = async () => {
    if (from && to && from !== "None" && to !== "None") {
      setTransitionLoading(true);

      const formData = {
        clientId,
        workflowId,
        workIds,
        from,
        to,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };
      await axios.post(WOS_TRANSITION_STATE_ENDPOINT, formData, config);

      setTransitionLoading(false);
    }
    navigate("/bucket");
  };

  return (
    <AppSurface type="form">
      <AppSpace loading={loading}>
        <Steps
          direction="vertical"
          size="small"
          current={current}
          onChange={setCurrent}
          items={[
            {
              title: "Review Batch",
              description: (
                <AppVerticalStepContent>
                  <AppList
                    headerTooltip="Bucket serialized ID"
                    header={bucketId}
                    data={workIds.map(
                      (workId) =>
                        ({
                          title: workId,
                          href: `/live/${encodeURIComponent(workId)}`,
                        } as ListItem)
                    )}
                  />
                </AppVerticalStepContent>
              ),
            },
            {
              title: "Confirm Source",
              description: (
                <AppVerticalStepContent>
                  <AppRow>
                    <Col {...createSpan(4)}>
                      <Typography.Text>Current state</Typography.Text>
                    </Col>

                    <Col {...createSpan(20)}>
                      <Radio.Group
                        size="small"
                        value={from}
                        buttonStyle="solid"
                        style={{ width: "100%" }}
                      >
                        <Radio.Button style={{ width: "100%" }} value={from}>
                          {from}
                        </Radio.Button>
                      </Radio.Group>
                    </Col>
                  </AppRow>
                </AppVerticalStepContent>
              ),
            },
            {
              title: "Choose Destination",
              description: (
                <AppVerticalStepContent>
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
                                size="small"
                                buttonStyle="solid"
                                value={to}
                                style={{ width: "100%" }}
                                onChange={(e) => setTo(e.target.value)}
                                key={i}
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
                                size="small"
                                buttonStyle="solid"
                                value={to}
                                style={{ width: "100%" }}
                                onChange={(e) => setTo(e.target.value)}
                                key={i}
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
                    {nextStates.length === 0 && <AppEmpty />}
                  </AppSpace>
                </AppVerticalStepContent>
              ),
            },
          ]}
        />

        <AppButton
          size="small"
          tooltip={`Transition a batch of ${workIds.length} items from ${from} to ${to}`}
          type="primary"
          onClick={handleBatchTransition}
          loading={transitionLoading}
        >
          Batch Transition
        </AppButton>
      </AppSpace>
    </AppSurface>
  );
};
