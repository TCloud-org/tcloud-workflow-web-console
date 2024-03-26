import { ReloadOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Popconfirm } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";
import {
  WOS_CLOSE_WORKFLOW_ENDPOINT,
  WOS_RERUN_WORKFLOW_ENDPOINT,
  WOS_RETRY_WORKFLOW_ENDPOINT,
} from "../Config/EndpointConfig";
import { Route, WorkflowRunConfig } from "../Config/WorkflowConfig";
import { AppSurface } from "../DataDisplayComponents/AppSurface";
import { AppIconButton } from "../DataEntryComponents/AppIconButton";
import { AppSpace } from "../LayoutComponents/AppSpace";
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
}) => {
  const { onReload = async () => {}, routes = [] } = props;

  const { workId } = useParams();
  const clientId = useSelector((state: any) => state.client.clientId);
  const { workflowId } = useSelector((state: any) => state.workflow.workflow);

  const rerunRef = useRef<HTMLDivElement>(null);
  const retryRef = useRef<HTMLDivElement>(null);

  const [rerunLoading, setRerunLoading] = useState<boolean>(false);
  const [closeLoading, setCloseLoading] = useState<boolean>(false);
  const [retryLoading, setRetryLoading] = useState<boolean>(false);
  const [runConfig, setRunConfig] = useState<any>();
  const [refreshToken, setRefreshToken] = useState<string>();

  useEffect(() => {
    if (rerunRef.current) {
      const height = rerunRef.current.scrollHeight;
      rerunRef.current.style.maxHeight =
        runConfig &&
        runConfig.toString() ===
          WorkflowRunConfig.RerunWithConfiguration.toString()
          ? `${height}px`
          : "0px";

      if (rerunRef.current.style.maxHeight === "0px") {
        rerunRef.current.style.marginBottom = "-48px";
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
        retryRef.current.style.marginBottom = "-48px";
        retryRef.current.style.opacity = "0";
      } else {
        retryRef.current.style.marginBottom = "0px";
        retryRef.current.style.opacity = "1";
      }
    }
  }, [runConfig, refreshToken]);

  const handleRetry = async () => {
    setRetryLoading(true);

    const formData = {
      clientId,
      workIds: [workId],
      workflowId,
    };
    await axios
      .post(WOS_RETRY_WORKFLOW_ENDPOINT, formData)
      .catch((error) => console.error(error));

    setRetryLoading(false);
  };

  const handleRerun = () => {
    setRerunLoading(true);

    const formData = {
      workIds: [workId],
      clientId,
      workflowId,
      alias: "live",
    };

    axios
      .post(WOS_RERUN_WORKFLOW_ENDPOINT, formData)
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

    const formData = {
      clientId,
      workIds: [workId],
      workflowId,
    };

    axios
      .post(WOS_CLOSE_WORKFLOW_ENDPOINT, formData)
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
      .then(() => {})
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
      <AppSpace>
        <AppSurface>
          <AppSpace
            direction="horizontal"
            loading={rerunLoading || closeLoading || retryLoading}
          >
            <Dropdown.Button
              onClick={handleRetry}
              trigger={["click"]}
              menu={{
                items: RetryOptions,
                onClick: (e) => {
                  setRunConfig(e.key);
                },
              }}
            >
              Retry
            </Dropdown.Button>

            <Dropdown.Button
              onClick={handleRerun}
              trigger={["click"]}
              menu={{
                items: RerunOptions,
                onClick: (e) => {
                  setRunConfig(e.key);
                },
              }}
            >
              Rerun
            </Dropdown.Button>

            <Popconfirm
              title="Close this workflow"
              description="Are you sure to close this workflow?"
              okText="Yes"
              cancelText="No"
              onConfirm={handleClose}
            >
              <Button danger>Close</Button>
            </Popconfirm>

            <Button>Transition</Button>

            <AppIconButton onClick={onReload} tooltip="Reload">
              <ReloadOutlined />
            </AppIconButton>

            <AppIconButton onClick={handleShare} tooltip="Share">
              <ShareAltOutlined />
            </AppIconButton>
          </AppSpace>
        </AppSurface>
      </AppSpace>
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
    </>
  );
};
