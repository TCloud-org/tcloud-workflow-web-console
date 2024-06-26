import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { EventWorkflow } from "Config/EventWorkflowConfig";
import { EditableColumn } from "Config/LayoutConfig";
import { WOS_DELETE_EVENT_WORKFLOW_ENDPOINT } from "Config/WOSEndpointConfig";
import { AppTable } from "DataDisplayComponents/AppTable";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppIconButton } from "DataEntryComponents/AppIconButton";
import { AppLink } from "DataEntryComponents/AppLink";
import { AppSpace } from "LayoutComponents/AppSpace";
import { getEventWorkflowsByClientId } from "Network/EventWorkflowFetch";
import { formatDate } from "Utils/DateUtils";
import { Flex } from "antd";
import axios from "axios";
import { Key, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export const EmailNotificationWorkflowPage = () => {
  const columns: EditableColumn[] = [
    {
      title: "Id",
      dataIndex: "id",
      render: (text: string) => (
        <AppLink href={`${location.pathname}/${text}`}>{text}</AppLink>
      ),
      width: "10%",
    },
    {
      title: "Name",
      dataIndex: "name",
      editable: true,
    },
    {
      title: "Client",
      dataIndex: "clientId",
      hidden: true,
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      render: (text: string) => formatDate(text),
    },
    {
      title: "Updated",
      dataIndex: "updatedAt",
      render: (text: string) => formatDate(text),
      hidden: true,
    },
    {
      title: "Action",
      fixed: "right",
      width: "10%",
      render: (value: EventWorkflow) => (
        <Flex align="center" gap="8px">
          <AppIconButton type="text" onClick={() => handleEdit(value)}>
            <EditOutlined />
          </AppIconButton>
          <AppIconButton type="text" onClick={() => handleDelete(value)}>
            <DeleteOutlined />
          </AppIconButton>
        </Flex>
      ),
    },
  ];

  const authToken = useSelector((state: any) => state.auth.token);
  const clientId = useSelector((state: any) => state.client.clientId);
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState<boolean>(false);
  const [workflows, setWorkflows] = useState<EventWorkflow[]>([]);
  const [selected, setSelected] = useState<Key[]>([]);

  const fetchEventWorkflows = useCallback(async () => {
    if (clientId) {
      setLoading(true);

      const res = await getEventWorkflowsByClientId(clientId, authToken);
      setWorkflows(res.workflows);

      setLoading(false);
    }
  }, [clientId, authToken]);

  const handleCreateWorkflow = () => {
    navigate(`${location.pathname}/choose-template`);
  };

  const handleEdit = (value: EventWorkflow) => {
    navigate(`${location.pathname}/${value.id}/edit`);
  };

  const handleDelete = (value: EventWorkflow) => {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .delete(`${WOS_DELETE_EVENT_WORKFLOW_ENDPOINT}?id=${value.id}`, config)
      .then((res) => {
        if (res.data) {
          fetchEventWorkflows();
        }
      });
  };

  useEffect(() => {
    fetchEventWorkflows();
  }, [fetchEventWorkflows]);

  return (
    <AppSpace loading={loading}>
      <PageTitle
        endDecorator={
          <AppButton onClick={handleCreateWorkflow} type="primary">
            Create a new workflow
          </AppButton>
        }
      >
        Email Notification Workflow
      </PageTitle>

      <AppTable
        heading="Workflows"
        columns={columns}
        rows={workflows}
        rowId="id"
        selected={selected}
        setSelected={setSelected}
        defaultPageSize={100}
      />
    </AppSpace>
  );
};
