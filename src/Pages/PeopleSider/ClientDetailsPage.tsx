import { SendOutlined } from "@ant-design/icons";
import { EditableColumn } from "Config/LayoutConfig";
import { ClientInvitee } from "Config/SCSConfig";
import { AppTable } from "DataDisplayComponents/AppTable";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppLink } from "DataEntryComponents/AppLink";
import { AppSpace } from "LayoutComponents/AppSpace";
import { getClientInviteesByClientId } from "Network/SecurityFetch";
import { formatDate } from "Utils/DateUtils";
import { Flex, Tag } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const PermissionColor = {
  ADMIN: "#4312e5",
  READ: "#7fbfff",
  WRITE: "#6abf69",
  DELETE: "#f88b8b",
};

const columns: EditableColumn[] = [
  {
    title: "Owner/contributor",
    dataIndex: "inviteeEmail",
    render: (text: string) => <AppLink href={`mailto:${text}`}>{text}</AppLink>,
  },
  {
    title: "Id",
    dataIndex: "inviteeId",
    hidden: true,
  },
  {
    title: "client",
    dataIndex: "clientId",
    hidden: true,
  },
  {
    title: "Permissions",
    dataIndex: "permissions",
    render: (permissions: string[]) => (
      <Flex wrap="wrap" gap={4}>
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
    title: "Joined",
    dataIndex: "createdAt",
    render: (text: string) => formatDate(text),
  },
  {
    title: "Modified",
    dataIndex: "updatedAt",
    render: (text: string) => formatDate(text),
    hidden: true,
  },
  {
    title: "Action",
    fixed: "right",
    width: "15%",
    render: (value: ClientInvitee & { permissions: string[] }) => (
      <Flex align="center" gap={4}>
        <AppButton onClick={() => {}}>Edit</AppButton>
        {!value.permissions.includes("ADMIN") && (
          <AppButton onClick={() => {}} danger type="primary">
            Revoke
          </AppButton>
        )}
      </Flex>
    ),
  },
];
export const ClientDetailsPage = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [clientInvitees, setCLientInvitees] = useState<
    (ClientInvitee & { permissions: string[] })[]
  >([]);

  const fetchClientInvitees = useCallback(async () => {
    if (clientId) {
      const res = await getClientInviteesByClientId(clientId);
      const transformedData: (ClientInvitee & { permissions: string[] })[] =
        Object.values(
          res.clientInvitees.reduce((acc: any, curr) => {
            const { inviteeEmail, permission } = curr;
            if (acc[inviteeEmail]) {
              acc[inviteeEmail].permissions.push(permission);
            } else {
              acc[inviteeEmail] = { ...curr, permissions: [permission] };
            }
            return acc;
          }, {})
        );
      setCLientInvitees(transformedData);
    }
  }, [clientId]);

  useEffect(() => {
    fetchClientInvitees();
  }, [fetchClientInvitees]);

  const handleInvite = () => {
    navigate(`${location.pathname}/invite`);
  };

  const handleViewInvitations = () => {
    navigate(`${location.pathname}/view-invitations`);
  };

  return (
    <AppSpace>
      <PageTitle
        endDecorator={
          <>
            <AppButton onClick={handleViewInvitations}>
              View Invitations
            </AppButton>
            <AppButton
              icon={<SendOutlined />}
              type="primary"
              onClick={handleInvite}
            >
              Invite
            </AppButton>
          </>
        }
      >
        {clientId}
      </PageTitle>

      <AppTable
        rowId="inviteeEmail"
        rows={clientInvitees}
        columns={columns}
        heading="People"
      />
    </AppSpace>
  );
};
