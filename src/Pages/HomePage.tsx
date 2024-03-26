import { useNavigate } from "react-router-dom";
import { AppList } from "../DataDisplayComponents/AppList";
import { AppTable } from "../DataDisplayComponents/AppTable";
import { AppSpace } from "../LayoutComponents/AppSpace";
import { Button } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import { WOS_INITIATE_TCA_WORKFLOW_ENDPOINT } from "../Config/EndpointConfig";
import { v4 as uuidv4 } from "uuid";

export const HomePage = () => {
  const navigate = useNavigate();
  const clientId = useSelector((state: any) => state.client.clientId);
  const { workflowId } = useSelector((state: any) => state.workflow.workflow);

  const initiate = () => {
    const id = uuidv4();
    const formData = {
      workId: id,
      clientId,
      workflowId,
    };
    axios
      .post(WOS_INITIATE_TCA_WORKFLOW_ENDPOINT, formData)
      .then((_) => alert(id))
      .catch((error) => console.error(error));
  };

  return (
    <AppSpace>
      <Button onClick={initiate}>Initiate workflow</Button>
      <Button type="primary" onClick={() => navigate("/live")}>
        Primary Button
      </Button>
      <AppList />
      <AppTable />
    </AppSpace>
  );
};
