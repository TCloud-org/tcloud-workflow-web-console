import { Flex, Radio, Steps, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ListItem } from "../../Config/DataDisplayInterface";
import { Graph, Route, XMLGraphState } from "../../Config/WorkflowConfig";
import { AppHeading } from "../../DataDisplayComponents/AppHeading";
import { AppList } from "../../DataDisplayComponents/AppList";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { AppVerticalStepContent } from "../../LayoutComponents/AppVerticalStepContent";
import { getGraphById } from "../../Network/WorkflowFetch";
import { extractStatesAfterSource } from "../../Utils/ObjectUtils";
import { WOS_TRANSITION_STATE_ENDPOINT } from "../../Config/WOSEndpointConfig";
import axios from "axios";
import { useSelector } from "react-redux";
import { AppButton } from "../../DataEntryComponents/AppButton";
import { AppEmpty } from "../../DataDisplayComponents/AppEmpty";

export const BatchTransitionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    route,
    bucketId,
    workIds,
  }: { route: Route; bucketId: string; workIds: string[] } =
    location?.state || {};

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
  const [nextStates, setNextStates] = useState<XMLGraphState[]>([]);
  const [otherStates, setOtherStates] = useState<XMLGraphState[]>([]);

  const fetchGraph = useCallback(async () => {
    if (route && route.graphId) {
      setLoading(true);

      const output = await getGraphById(route.graphId);
      setGraph(output.graph);

      setLoading(false);
    }
  }, [route]);

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
      await axios.post(WOS_TRANSITION_STATE_ENDPOINT, formData);

      setTransitionLoading(false);
    }
    navigate("/bucket");
  };

  return (
    <AppSpace loading={loading}>
      <Steps
        direction="vertical"
        size="small"
        current={current}
        onChange={setCurrent}
        items={[
          {
            title: <AppHeading>1. Review Batch</AppHeading>,
            description: (
              <AppVerticalStepContent>
                <AppList
                  headerTooltip="Bucket serialized ID"
                  header={bucketId}
                  data={workIds.map(
                    (workId) =>
                      ({
                        title: workId,
                        href: `/live/${workId}`,
                      } as ListItem)
                  )}
                />
              </AppVerticalStepContent>
            ),
          },
          {
            title: <AppHeading>2. Confirm Source</AppHeading>,
            description: (
              <AppVerticalStepContent>
                <Radio.Group
                  value={from}
                  buttonStyle="outline"
                  style={{ width: "100%" }}
                >
                  <Radio.Button style={{ width: "100%" }} value={from}>
                    {from}
                  </Radio.Button>
                </Radio.Group>
              </AppVerticalStepContent>
            ),
          },
          {
            title: <AppHeading>3. Choose Destination</AppHeading>,
            description: (
              <AppVerticalStepContent>
                <Radio.Group
                  buttonStyle="outline"
                  value={to}
                  style={{ width: "100%" }}
                  onChange={(e) => setTo(e.target.value)}
                >
                  <AppSpace>
                    {nextStates.length > 0 && (
                      <AppSpace size="small">
                        <Typography.Text style={{ fontWeight: 500 }}>
                          Next State
                        </Typography.Text>
                        {nextStates.map((state, i) => (
                          <Radio.Button
                            style={{ width: "100%" }}
                            key={i}
                            value={state.source}
                          >
                            {state.source}
                          </Radio.Button>
                        ))}
                      </AppSpace>
                    )}
                    {otherStates.length > 0 && (
                      <AppSpace size="small">
                        <Typography.Text style={{ fontWeight: 500 }}>
                          Other States
                        </Typography.Text>
                        <AppSpace size="small" direction="vertical">
                          {otherStates.map((state, i) => (
                            <Radio.Button
                              style={{ width: "100%" }}
                              key={i}
                              value={state.source}
                            >
                              {state.source}
                            </Radio.Button>
                          ))}
                        </AppSpace>
                      </AppSpace>
                    )}
                    {nextStates.length === 0 && <AppEmpty />}
                  </AppSpace>
                </Radio.Group>
              </AppVerticalStepContent>
            ),
          },
        ]}
      />

      <Flex justify="center">
        <AppButton
          tooltip={`Transition a batch of ${workIds.length} items from ${from} to ${to}`}
          type="primary"
          onClick={handleBatchTransition}
          loading={transitionLoading}
        >
          Batch Transition
        </AppButton>
      </Flex>
    </AppSpace>
  );
};
