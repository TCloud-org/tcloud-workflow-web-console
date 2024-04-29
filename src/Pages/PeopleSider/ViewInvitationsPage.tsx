import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { borderColor } from "Config/AutomationConfig";
import { EditableColumn } from "Config/LayoutConfig";
import { PermissionType } from "Config/SCSConfig";
import { AppAvatar } from "DataDisplayComponents/AppAvatar";
import { AppTable } from "DataDisplayComponents/AppTable";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppSpace } from "LayoutComponents/AppSpace";
import {
  InvitationToken,
  getInvitationTokensBySenderAndLocation,
} from "Network/SecurityFetch";
import { formatDate } from "Utils/DateUtils";
import { Flex, Tag } from "antd";
import { Account } from "features/auth/authSlice";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PermissionColor } from "./ClientDetailsPage";

export const InvitationComponent = {
  ACCEPTED: {
    icon: <CheckCircleOutlined />,
    color: "green-inverse",
  },
  REJECTED: {
    icon: <CloseCircleOutlined />,
    color: "red-inverse",
  },
  PENDING: {
    icon: <ClockCircleOutlined />,
    color: "gold-inverse",
  },
  SENT: {
    icon: <SendOutlined />,
    color: borderColor,
  },
};

const columns: EditableColumn[] = [
  {
    title: "Email",
    dataIndex: "receiver",
    render: (text: string) => (
      <Flex align="center" gap={8}>
        <Flex style={{ flex: 1 }}>
          <AppAvatar />
        </Flex>
        <Flex style={{ flex: 6 }}>
          <a href={`mailto:${text}`} className="custom-link">
            {text}
          </a>
        </Flex>
      </Flex>
    ),
    width: "20%",
  },
  {
    title: "Location",
    dataIndex: "location",
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text: string) => (
      <Tag
        icon={
          InvitationComponent[text as keyof typeof InvitationComponent].icon
        }
        color={
          InvitationComponent[text as keyof typeof InvitationComponent].color
        }
      >
        {text}
      </Tag>
    ),
    width: "10%",
  },
  {
    title: "Granted Permissions",
    dataIndex: "grantedPermissions",
    render: (permissions: PermissionType[]) => (
      <Flex wrap="wrap" align="center" gap={4}>
        {permissions.map((permission, i) => (
          <Tag
            key={i}
            style={{ margin: 0 }}
            color={PermissionColor[permission as keyof typeof PermissionColor]}
          >
            {permission}
          </Tag>
        ))}
      </Flex>
    ),
    width: "18%",
  },
  {
    title: "Sent",
    dataIndex: "sentAt",
    render: (text: string) => formatDate(text),
    width: "12%",
  },
  {
    title: "Expired",
    dataIndex: "expiredAt",
    render: (text: string) => formatDate(text),
    width: "12%",
  },
  {
    title: "Confirmed",
    dataIndex: "confirmedAt",
    render: (text: string) => formatDate(text),
    width: "12%",
  },
];

export const ViewInvitationsPage = () => {
  const { clientId } = useParams();
  const account: Account = useSelector((state: any) => state.auth.account);

  const [invitationTokens, setInvitationTokens] = useState<InvitationToken[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  const fetchInvitations = useCallback(async () => {
    if (account && clientId) {
      setLoading(true);

      const res = await getInvitationTokensBySenderAndLocation(
        account.email,
        clientId
      );
      setInvitationTokens(res.invitationTokens);

      setLoading(false);
    }
  }, [clientId, account]);

  useEffect(() => {
    fetchInvitations();
  }, [fetchInvitations]);

  return (
    <AppSpace>
      <PageTitle>Invitations</PageTitle>

      <AppTable
        rowId="receiver"
        rows={invitationTokens}
        columns={columns}
        showSelected={false}
        showTitle={false}
        loading={loading}
        rowHoverable={false}
      />
    </AppSpace>
  );
};
