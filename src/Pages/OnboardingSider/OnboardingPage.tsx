import { Form } from "antd";
import { useState } from "react";
import { StepItem } from "../../Config/DataDisplayInterface";
import { AppStepContent } from "../../DataDisplayComponents/AppStepContent";
import { AppStepFooter } from "../../DataDisplayComponents/AppStepFooter";
import { AppSteps } from "../../DataDisplayComponents/AppSteps";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { AddClientStep } from "../../WorkflowComponents/Onboarding/AddClientStep";
import { AddGraphStep } from "../../WorkflowComponents/Onboarding/AddGraphStep";
import { AddWorkflowStep } from "../../WorkflowComponents/Onboarding/AddWorkflowStep";
import { AddEndpointStep } from "../../WorkflowComponents/Onboarding/AddEndpointStep";
import { AddRetryPolicyStep } from "../../WorkflowComponents/Onboarding/AddRetryPolicyStep";
import { useNavigate } from "react-router-dom";
import { ReviewStep } from "../../WorkflowComponents/Onboarding/ReviewStep";
import axios from "axios";
import {
  WOS_ADD_GRAPH_ENDPOINT,
  WOS_ADD_SERVICE_CONFIGURATION_ENDPOINT,
  WOS_REGISTER_WORKFLOW_ENDPOINT,
  WOS_SAVE_RETRY_POLICY_ENDPOINT,
} from "../../Config/WOSEndpointConfig";
import { RegisterWorkflowOutput } from "../../Config/WorkflowConfig";
import { useSelector } from "react-redux";

export const OnboardingPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const authToken = useSelector((state: any) => state.auth.token);

  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const steps: StepItem[] = [
    {
      key: "Client",
      title: "Client",
      render: (props) => <AddClientStep {...props} />,
      required: true,
    },
    {
      key: "Workflow",
      title: "Workflow",
      render: (props) => <AddWorkflowStep {...props} />,
      required: true,
    },
    {
      key: "Graph",
      title: "Graph",
      render: (props) => <AddGraphStep {...props} />,
    },
    {
      key: "Endpoint",
      title: "Endpoint",
      render: (props) => <AddEndpointStep {...props} />,
    },
    {
      key: "Retry Policy",
      title: "Retry Policy",
      render: (props) => <AddRetryPolicyStep {...props} />,
    },
    {
      key: "Review",
      title: "Review",
      render: (props) => <ReviewStep {...props} />,
    },
  ];

  const next = () => {
    setFormData((prev: any) => ({
      ...prev,
      [steps[current].key]: form.getFieldsValue(),
    }));
    setCurrent(current + 1);
  };

  const skip = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const done = async () => {
    setLoading(true);

    const allForm = {
      ...formData,
      [steps[current].key]: form.getFieldsValue(),
    };
    const workflowOutput = await addWorkflow(allForm);
    await addGraph(allForm, workflowOutput.workflowId);
    await addEndpoints(allForm);
    await addRetryPolicy(allForm);

    setLoading(false);
    navigate("/");
  };

  const addWorkflow = async (allForm: { [key: string]: any }) => {
    const { clientId } = allForm["Client"] || {};
    const { workflowName } = allForm["Workflow"] || {};

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    const request = {
      workflowName,
      clientId,
    };
    return await axios
      .post(WOS_REGISTER_WORKFLOW_ENDPOINT, request, config)
      .then((response) => response.data as RegisterWorkflowOutput);
  };

  const addGraph = async (
    allForm: { [key: string]: any },
    workflowId: string
  ) => {
    const { clientId } = allForm["Client"] || {};
    const { alias, description, version, xmlContent } = allForm["Graph"] || {};
    if (!xmlContent) return;
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    const request = {
      workflowId,
      clientId,
      alias,
      description,
      version,
      xmlContent,
    };
    await axios.post(WOS_ADD_GRAPH_ENDPOINT, request, config);
  };

  const addEndpoints = async (allForm: { [key: string]: any }) => {
    const endpointInputs = allForm["Endpoint"] || {};
    const { clientId } = allForm["Client"] || {};
    if (Object.keys(endpointInputs).length === 0) {
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    await Object.entries(endpointInputs).forEach(
      async ([serviceName, input]) => {
        const request = {
          clientId,
          serviceName,
          ...(input as { [key: string]: any }),
        };
        await axios.post(
          WOS_ADD_SERVICE_CONFIGURATION_ENDPOINT,
          request,
          config
        );
      }
    );
  };

  const addRetryPolicy = async (allForm: { [key: string]: any }) => {
    const { clientId } = allForm["Client"] || {};
    const retryPolicyForm = allForm["Retry Policy"] || {};
    if (Object.values(retryPolicyForm).length === 0) return;

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    const request = {
      retryPolicy: {
        ...retryPolicyForm,
        clientId,
      },
    };

    await axios.post(WOS_SAVE_RETRY_POLICY_ENDPOINT, request, config);
  };

  const items = steps.map((item) => ({ key: item.key, title: item.title }));

  return (
    <AppSpace loading={loading}>
      <AppSteps current={current} items={items} />
      <AppStepContent>
        {steps[current].render({
          form,
          formData,
          current,
          stepKey: steps[current].key,
          setCurrent,
        })}
      </AppStepContent>
      <AppStepFooter
        current={current}
        form={form}
        next={next}
        prev={prev}
        done={done}
        skip={skip}
        totalSteps={steps.length}
        required={steps[current].required}
      />
    </AppSpace>
  );
};
