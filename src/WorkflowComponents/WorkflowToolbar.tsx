import { ReloadOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Span } from "Config/DataDisplayInterface";
import { AppInfo } from "DataDisplayComponents/AppInfo";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppIconToggle } from "DataEntryComponents/AppIconToggle";
import { Button, Dropdown, Flex, MenuProps, Popconfirm, message } from "antd";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";
import {
  WOS_CLOSE_WORKFLOW_ENDPOINT,
  WOS_RERUN_WORKFLOW_ENDPOINT,
  WOS_RETRY_WORKFLOW_ENDPOINT,
} from "../Config/WOSEndpointConfig";
import { Graph, Route, WorkflowRunConfig } from "../Config/WorkflowConfig";
import { LiveTransition } from "./LiveTransition";
import { RerunConfiguration } from "./RerunConfiguration";
import { RetryConfiguration } from "./RetryConfiguration";

const RetryOptions: MenuProps["items"] = [
  {
    key: WorkflowRunConfig.RetryWithConfiguration,
    label: "Retry with configuration",
  },
];

const RerunOptions: MenuProps["items"] = [
  {
    key: WorkflowRunConfig.RerunWithConfiguration,
    label: "Rerun with configuration",
  },
];

export const WorkflowToolbar = (props: {
  onReload?: () => void;
  routes?: Route[];
  graph?: Graph;
}) => {
  const { onReload = async () => {}, routes = [], graph } = props;
  const { workId } = useParams();

  const authToken = useSelector((state: any) => state.auth.token);

  const [messageApi, contextHolder] = message.useMessage();

  const rerunRef = useRef<HTMLDivElement>(null);
  const retryRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);

  const [rerunLoading, setRerunLoading] = useState<boolean>(false);
  const [closeLoading, setCloseLoading] = useState<boolean>(false);
  const [retryLoading, setRetryLoading] = useState<boolean>(false);
  const [runConfig, setRunConfig] = useState<any>();
  const [refreshToken, setRefreshToken] = useState<string>();

  const updateHeights = useCallback(() => {
    if (refreshToken) {
    }
    if (rerunRef.current) {
      const height = rerunRef.current.scrollHeight;
      rerunRef.current.style.maxHeight =
        runConfig &&
        runConfig.toString() ===
          WorkflowRunConfig.RerunWithConfiguration.toString()
          ? `${height}px`
          : "0px";

      if (rerunRef.current.style.maxHeight === "0px") {
        rerunRef.current.style.marginBottom = "-64px";
        rerunRef.current.style.opacity = "0";
      } else {
        rerunRef.current.style.marginBottom = "0px";
        rerunRef.current.style.opacity = "1";
      }
    }

    if (retryRef.current) {
      const height = retryRef.current.scrollHeight;
      retryRef.current.style.maxHeight =
        runConfig &&
        runConfig.toString() ===
          WorkflowRunConfig.RetryWithConfiguration.toString()
          ? `${height}px`
          : "0px";
      if (retryRef.current.style.maxHeight === "0px") {
        retryRef.current.style.marginBottom = "-64px";
        retryRef.current.style.opacity = "0";
      } else {
        retryRef.current.style.marginBottom = "0px";
        retryRef.current.style.opacity = "1";
      }
    }

    if (transitionRef.current) {
      const height = transitionRef.current.scrollHeight;
      transitionRef.current.style.maxHeight =
        runConfig &&
        runConfig.toString() === WorkflowRunConfig.Transition.toString()
          ? `${height}px`
          : "0px";
      if (transitionRef.current.style.maxHeight === "0px") {
        transitionRef.current.style.marginBottom = "-64px";
        transitionRef.current.style.opacity = "0";
      } else {
        transitionRef.current.style.marginBottom = "0px";
        transitionRef.current.style.opacity = "1";
      }
    }
  }, [runConfig, refreshToken]);

  useEffect(() => {
    updateHeights();

    window.addEventListener("resize", updateHeights);

    return () => {
      window.removeEventListener("resize", updateHeights);
    };
  }, [updateHeights]);

  const handleRetry = async () => {
    setRetryLoading(true);

    const formData = {
      workIds: [workId],
    };
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    await axios
      .post(WOS_RETRY_WORKFLOW_ENDPOINT, formData, config)
      .catch((error) => console.error(error));

    setRetryLoading(false);
  };

  const handleRerun = () => {
    setRerunLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    const formData = {
      workIds: [workId],
    };

    axios
      .post(WOS_RERUN_WORKFLOW_ENDPOINT, formData, config)
      .then((_) => {
        setRerunLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setRerunLoading(false);
      });
  };

  const handleClose = () => {
    setCloseLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    const formData = {
      workIds: [workId],
    };

    axios
      .post(WOS_CLOSE_WORKFLOW_ENDPOINT, formData, config)
      .then((_) => {
        setCloseLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setCloseLoading(false);
      });
  };

  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        messageApi.success("Link copied to clipboard");
      })
      .catch((error) => console.error(error));
  };

  const handleCloseConfig = () => {
    setRunConfig(undefined);
  };

  const handleRefresh = () => {
    setRefreshToken(v4());
  };

  return (
    <>
      {contextHolder}
      <AppInfo
        title="Action Panel"
        items={[
          {
            key: "actions",
            span: Span[1],
            children: (
              <Flex wrap="wrap" gap={16} className="w-full">
                <Flex>
                  <Dropdown.Button
                    onClick={handleRetry}
                    trigger={["click"]}
                    loading={retryLoading}
                    menu={{
                      items: RetryOptions,
                      onClick: (e) => {
                        setRunConfig(e.key);
                      },
                    }}
                  >
                    Retry
                  </Dropdown.Button>
                </Flex>

                <Flex>
                  <Dropdown.Button
                    onClick={handleRerun}
                    trigger={["click"]}
                    loading={rerunLoading}
                    menu={{
                      items: RerunOptions,
                      onClick: (e) => {
                        setRunConfig(e.key);
                      },
                    }}
                  >
                    Rerun
                  </Dropdown.Button>
                </Flex>

                <Flex>
                  <AppIconToggle
                    onToggle={() => {
                      setRunConfig((prev: WorkflowRunConfig) =>
                        prev === WorkflowRunConfig.Transition
                          ? undefined
                          : WorkflowRunConfig.Transition
                      );
                    }}
                    title="Transition"
                    active={runConfig === WorkflowRunConfig.Transition}
                  />
                </Flex>

                <Flex>
                  <Popconfirm
                    title="Close this workflow"
                    description="Are you sure to close this workflow?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={handleClose}
                  >
                    <Button loading={closeLoading} danger type="primary">
                      Close
                    </Button>
                  </Popconfirm>
                </Flex>

                <Flex>
                  <AppButton
                    onClick={onReload}
                    icon={<ReloadOutlined />}
                    type="primary"
                  >
                    Reload
                  </AppButton>
                </Flex>

                <Flex>
                  <AppButton
                    onClick={handleShare}
                    type="primary"
                    icon={<ShareAltOutlined />}
                  >
                    Share
                  </AppButton>
                </Flex>
              </Flex>
            ),
          },
        ]}
      />
      <RetryConfiguration
        ref={retryRef}
        onClose={handleCloseConfig}
        routes={routes}
      />

      <RerunConfiguration
        ref={rerunRef}
        onClose={handleCloseConfig}
        onRefresh={handleRefresh}
      />

      <LiveTransition
        ref={transitionRef}
        onClose={handleCloseConfig}
        routes={routes}
        graph={graph}
      />
    </>
  );
};
