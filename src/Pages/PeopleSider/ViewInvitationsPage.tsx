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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PermissionColor } from "./ClientDetailsPage";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppLink } from "DataEntryComponents/AppLink";

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
        <Flex flex={1}>
          <AppAvatar />
        </Flex>
        <Flex flex={6}>
          <AppLink href={`mailto:${text}`}>{text}</AppLink>
        </Flex>
      </Flex>
    ),
    width: "30%",
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
  },
  {
    title: "Sent",
    dataIndex: "sentAt",
    render: (text: string) => formatDate(text),
  },
  {
    title: "Expired",
    dataIndex: "expiredAt",
    render: (text: string) => formatDate(text),
  },
  {
    title: "Confirmed",
    dataIndex: "confirmedAt",
    render: (text: string) => formatDate(text),
  },
];

export const ViewInvitationsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
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

  const handleInvite = () => {
    const paths = location.pathname.split("/");
    paths.pop();
    navigate(`${paths.join("/")}/invite`);
  };

  return (
    <AppSpace>
      <PageTitle
        endDecorator={
          <AppButton
            icon={<SendOutlined />}
            onClick={handleInvite}
            type="primary"
          >
            Invite
          </AppButton>
        }
      >
        Invitations
      </PageTitle>

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
