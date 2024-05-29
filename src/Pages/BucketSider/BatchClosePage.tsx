import { Flex, Steps } from "antd";
import { Key, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ListItem } from "../../Config/DataDisplayInterface";
import { AppHeading } from "../../DataDisplayComponents/AppHeading";
import { AppList } from "../../DataDisplayComponents/AppList";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { AppVerticalStepContent } from "../../LayoutComponents/AppVerticalStepContent";
import { AppButton } from "../../DataEntryComponents/AppButton";
import { useSelector } from "react-redux";
import { WOS_CLOSE_WORKFLOW_ENDPOINT } from "../../Config/WOSEndpointConfig";
import axios from "axios";
import { AppSurface } from "DataDisplayComponents/AppSurface";

export const BatchClosePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { workIds = [], bucketId }: { workIds: Key[]; bucketId: string } =
    location.state || {};
  const authToken = useSelector((state: any) => state.auth.token);
  const clientId = useSelector((state: any) => state.client.clientId);
  const { workflowId } = useSelector(
    (state: any) => state.workflow.workflow || {}
  );

  const [current, setCurrent] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClose = async () => {
    setLoading(true);

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    const formData = {
      clientId,
      workIds,
      workflowId,
    };

    await axios.post(WOS_CLOSE_WORKFLOW_ENDPOINT, formData, config);
    setLoading(false);
    navigate("/bucket");
  };

  return (
    <AppSurface type="form">
      <AppSpace>
        <Steps
          current={current}
          onChange={setCurrent}
          direction="vertical"
          size="small"
          items={[
            {
              title: <AppHeading>1. Review Batch</AppHeading>,
              description: (
                <AppVerticalStepContent>
                  <AppList
                    headerSurface
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
          ]}
        />

        <AppButton
          size="small"
          tooltip={`Close a batch of ${workIds.length} items`}
          type="primary"
          onClick={handleClose}
          loading={loading}
        >
          Batch Close
        </AppButton>
      </AppSpace>
    </AppSurface>
  );
};
