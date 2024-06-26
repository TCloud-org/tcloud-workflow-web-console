import { decodeBucketId } from "Utils/IdentifierUtils";
import { Steps } from "antd";
import axios from "axios";
import { Key, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ListItem } from "../../Config/DataDisplayInterface";
import { WOS_CLOSE_WORKFLOW_ENDPOINT } from "../../Config/WOSEndpointConfig";
import { AppHeading } from "../../DataDisplayComponents/AppHeading";
import { AppList } from "../../DataDisplayComponents/AppList";
import { AppButton } from "../../DataEntryComponents/AppButton";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { AppVerticalStepContent } from "../../LayoutComponents/AppVerticalStepContent";

export const BatchClosePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { workIds = [], bucketId }: { workIds: Key[]; bucketId: string } =
    location.state || {};
  const authToken = useSelector((state: any) => state.auth.token);
  const { clientId, workflowId } = decodeBucketId(bucketId);

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
    <AppSpace>
      <Steps
        current={current}
        onChange={setCurrent}
        direction="vertical"
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
        tooltip={`Close a batch of ${workIds.length} items`}
        type="primary"
        onClick={handleClose}
        loading={loading}
      >
        Batch Close
      </AppButton>
    </AppSpace>
  );
};
