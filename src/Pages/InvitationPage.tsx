import { SCS_PROCESS_INVITATION_URL } from "Config/SCSEndpointConfig";
import { AppCard } from "DataDisplayComponents/AppCard";
import { AppLogo } from "DataDisplayComponents/AppLogo";
import { AppButton } from "DataEntryComponents/AppButton";
import {
  InvitationStatus,
  InvitationToken,
  getInvitationToken,
} from "Network/SecurityFetch";
import { prettifyDate } from "Utils/DateUtils";
import { Flex, Result, Typography, message } from "antd";
import { ActionType } from "app/rootReducer";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const InvitationPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const isExternalLink = searchParams.get("isExternalLink");

  const [invitationToken, setInvitationToken] = useState<InvitationToken>();
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const fetchInvitationToken = useCallback(async () => {
    if (token) {
      const res = await getInvitationToken(token);
      setInvitationToken(res.invitationToken);
    }
  }, [token]);

  useEffect(() => {
    if (!isExternalLink) {
      searchParams.append("isExternalLink", "true");
      window.location.href = `${window.location.pathname}?${searchParams}`;
    }
  }, [isExternalLink, searchParams]);

  useEffect(() => {
    fetchInvitationToken();
  }, [fetchInvitationToken]);

  const handleUserAction = async (action: InvitationStatus) => {
    setLoading({ [action]: true });

    const formData = {
      token: token,
      action: action.toString(),
    };
    const res = await axios
      .post(SCS_PROCESS_INVITATION_URL, formData)
      .then((res) => res.data as InvitationToken)
      .catch((err) => {
        console.error(err);
        return undefined;
      });

    if (!res) {
      setTimeout(() => {
        setLoading({ [action]: false });

        messageApi.error("Failed to process the invitation response.");
      }, 1000);
    } else {
      setTimeout(async () => {
        setLoading({ [action]: false });

        if (res.status === InvitationStatus.PENDING) {
          dispatch({ type: ActionType.logout });
          navigate("/", {
            state: {
              redirectTo: `/sign-up?invitationToken=${token}`,
            },
          });
        } else {
          navigate("/");
        }
      }, 1000);
    }
  };

  if (invitationToken?.confirmedAt) {
    return (
      <Flex justify="center" align="center" style={{ height: "100vh" }}>
        <Result
          status="403"
          title="403"
          subTitle="The invitation link has either expired or has already been confirmed!"
          extra={
            <AppButton type="primary" onClick={() => navigate("/")}>
              Back Home
            </AppButton>
          }
        />
      </Flex>
    );
  }

  return (
    <>
      {contextHolder}
      <Flex justify="center" align="center" style={{ height: "100vh" }}>
        <AppCard
          style={{
            width: "50vw",
          }}
          title={
            <Flex align="flex-start" vertical style={{ padding: "16px 0" }}>
              <Typography.Text>Pending invite</Typography.Text>
              <Typography.Text type="secondary">
                {prettifyDate(new Date().toLocaleString())}
              </Typography.Text>
            </Flex>
          }
          actions={[
            <AppButton
              style={{ width: "80%" }}
              loading={loading[InvitationStatus.REJECTED]}
              onClick={() => handleUserAction(InvitationStatus.REJECTED)}
            >
              Reject
            </AppButton>,
            <AppButton
              onClick={() => handleUserAction(InvitationStatus.ACCEPTED)}
              type="primary"
              style={{ width: "80%" }}
              loading={loading[InvitationStatus.ACCEPTED]}
            >
              Accept Invitation
            </AppButton>,
          ]}
        >
          <Flex vertical gap={16}>
            <Flex vertical justify="center" align="center" gap={16}>
              <AppLogo />

              <Typography.Title level={4} style={{ marginTop: 0 }}>
                You've got an invitation
              </Typography.Title>
            </Flex>

            <Typography.Paragraph>
              <Typography.Link href={`mailto:${invitationToken?.sender}`}>
                {invitationToken?.sender}
              </Typography.Link>{" "}
              invited you to join{" "}
              <Typography.Text strong>
                {invitationToken?.location}
              </Typography.Text>{" "}
              organization. Accepting this invitation will grant you{" "}
              <Typography.Text strong>
                {invitationToken?.grantedPermissions.join(", ")}
              </Typography.Text>{" "}
              access to valuable resources within the organization.
            </Typography.Paragraph>
            <Typography.Paragraph>
              You can choose to accept or reject this invitation at your
              convenience.
            </Typography.Paragraph>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              Your invitation expires in 30 days.
            </Typography.Text>
          </Flex>
        </AppCard>
      </Flex>
    </>
  );
};
