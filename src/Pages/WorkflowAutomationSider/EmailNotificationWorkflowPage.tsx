import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { EventWorkflow } from "Config/EventWorkflowConfig";
import { EditableColumn } from "Config/LayoutConfig";
import { AppTable } from "DataDisplayComponents/AppTable";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppIconButton } from "DataEntryComponents/AppIconButton";
import { AppLink } from "DataEntryComponents/AppLink";
import { AppSpace } from "LayoutComponents/AppSpace";
import { getEventWorkflowsByClientId } from "Network/EventWorkflowFetch";
import { formatDate } from "Utils/DateUtils";
import { Flex } from "antd";
import { Key, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export const EmailNotificationWorkflowPage = () => {
  const columns: EditableColumn[] = [
    {
      title: "Id",
      dataIndex: "id",
      render: (text: string) => <AppLink href="/">{text}</AppLink>,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      render: (text: string) => formatDate(text),
    },
    {
      title: "Action",
      fixed: "right",
      render: (value: any) => (
        <Flex align="center" gap="8px">
          <AppIconButton type="text">
            <EditOutlined />
          </AppIconButton>
          <AppIconButton type="text">
            <DeleteOutlined />
          </AppIconButton>
        </Flex>
      ),
    },
  ];

  const clientId = useSelector((state: any) => state.client.clientId);
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState<boolean>(false);
  const [workflows, setWorkflows] = useState<EventWorkflow[]>([]);
  const [selected, setSelected] = useState<Key[]>([]);

  const fetchEventWorkflows = useCallback(async () => {
    if (clientId) {
      setLoading(true);

      const res = await getEventWorkflowsByClientId(clientId);
      setWorkflows(res.workflows);

      setLoading(false);
    }
  }, [clientId]);

  const handleCreateWorkflow = () => {
    navigate(`${location.pathname}/choose-template`);
  };

  useEffect(() => {
    fetchEventWorkflows();
  }, [fetchEventWorkflows]);

  return (
    <AppSpace loading={loading}>
      <PageTitle>Email Notification Workflow</PageTitle>
      <AppButton onClick={handleCreateWorkflow}>
        Create a new workflow
      </AppButton>
      <AppTable
        columns={columns}
        rows={workflows}
        rowId="id"
        selected={selected}
        setSelected={setSelected}
      />
    </AppSpace>
  );
};
