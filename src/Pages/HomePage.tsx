import { Button } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { WOS_INITIATE_TCA_WORKFLOW_ENDPOINT } from "../Config/EndpointConfig";
import { AppSpace } from "../LayoutComponents/AppSpace";

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
    </AppSpace>
  );
};
