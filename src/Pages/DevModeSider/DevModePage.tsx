import { WOS_INITIATE_TCA_WORKFLOW_ENDPOINT } from "Config/WOSEndpointConfig";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppSpace } from "LayoutComponents/AppSpace";
import { Flex, Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";

export const DevModePage = () => {
  const clientId = useSelector((state: any) => state.client.clientId);
  const { workflowId } = useSelector((state: any) => state.workflow.workflow);

  const [initiatedId, setInitiatedId] = useState<string>("");
  const [initiatedLoading, setInitiatedLoading] = useState<boolean>(false);

  const initiate = async () => {
    setInitiatedLoading(true);

    const id = v4();

    const formData = {
      workId: id,
      clientId,
      workflowId,
    };

    await axios
      .post(WOS_INITIATE_TCA_WORKFLOW_ENDPOINT, formData)
      .then((_) => {
        setInitiatedId(id);
      })
      .catch((error) => console.error(error));

    setInitiatedLoading(false);
  };

  return (
    <AppSpace>
      <PageTitle>Development</PageTitle>

      <Flex gap="16px">
        <Flex style={{ flex: 1 }}>
          <Input disabled value={initiatedId} />
        </Flex>
        <Flex style={{ flex: 1 }}>
          <AppButton
            loading={initiatedLoading}
            type="primary"
            onClick={initiate}
          >
            Initiate workflow
          </AppButton>
        </Flex>
      </Flex>
    </AppSpace>
  );
};
