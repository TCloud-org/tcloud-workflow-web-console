import React, { forwardRef, useEffect, useState } from "react";
import { AppSheet } from "../LayoutComponents/AppSheet";
import { AppSpace } from "../LayoutComponents/AppSpace";
import { Box } from "../LayoutComponents/Box";
import { AppIconButton } from "../DataEntryComponents/AppIconButton";
import { CaretUpOutlined } from "@ant-design/icons";
import { Col, Flex, Radio, Typography } from "antd";
import { AppRow } from "../LayoutComponents/AppRow";
import { Graph, Route, XMLGraphState } from "../Config/WorkflowConfig";
import {
  extractStatesAfterSource,
  getLastRouteSource,
} from "../Utils/ObjectUtils";
import { AppButton } from "../DataEntryComponents/AppButton";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { WOS_TRANSITION_STATE_ENDPOINT } from "../Config/WOSEndpointConfig";
import axios from "axios";
import { AppEmpty } from "../DataDisplayComponents/AppEmpty";

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
  const [nextStates, setNextStates] = useState<XMLGraphState[]>([]);
  const [otherStates, setOtherStates] = useState<XMLGraphState[]>([]);
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
        <Flex>
          <Typography.Text strong style={{ fontSize: "16px" }}>
            Transition
          </Typography.Text>
        </Flex>
        <AppRow>
          <Col span={24}>
            <Typography.Text strong>1. Confirm source</Typography.Text>
          </Col>
          <Col span={24}>
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
        <AppRow>
          <Col span={24}>
            <Typography.Text strong>2. Choose Destination</Typography.Text>
          </Col>
          <Col span={24}>
            <Radio.Group
              buttonStyle="solid"
              style={{ width: "100%" }}
              value={to}
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
                        key={i}
                        style={{ width: "100%" }}
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
                    {otherStates.map((state, i) => (
                      <Radio.Button
                        key={i}
                        style={{ width: "100%" }}
                        value={state.source}
                      >
                        {state.source}
                      </Radio.Button>
                    ))}
                  </AppSpace>
                )}
                {nextStates.length === 0 && <AppEmpty />}
              </AppSpace>
            </Radio.Group>
          </Col>
        </AppRow>
        <Flex justify="center">
          <AppButton
            loading={loading}
            onClick={handleTransition}
            tooltip={`Transition from ${from} to ${to}`}
          >
            Transition
          </AppButton>
        </Flex>
        <Box>
          <AppIconButton width="100%" onClick={onClose} type="text">
            <CaretUpOutlined />
          </AppIconButton>
        </Box>
      </AppSpace>
    </AppSheet>
  );
});
