import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppRow } from "LayoutComponents/AppRow";
import { AppSpace } from "LayoutComponents/AppSpace";
import { TemplateChip } from "WorkflowAutomationComponents/TemplateChip";
import { Col, Flex } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const templates = [
  {
    key: "blank",
    title: "Blank",
    src: "https://tcw-images.s3.us-west-2.amazonaws.com/Screenshot+2024-04-13+at+10.13.16%E2%80%AFPM.png",
  },
  {
    key: "basic",
    title: "Basic",
    src: "https://tcw-images.s3.us-west-2.amazonaws.com/Screenshot+2024-04-13+at+10.49.34%E2%80%AFPM.png",
  },
  {
    key: "delay",
    title: "Delay",
    src: "https://tcw-images.s3.us-west-2.amazonaws.com/Screenshot+2024-04-13+at+9.39.03%E2%80%AFPM.png",
  },
];

export const EmailNotificationTemplateSelectionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [active, setActive] = useState<number>(0);

  const handleNext = () => {
    const params = new URLSearchParams();
    params.set("template", templates[active].key);
    navigate(`${location.pathname}/create?${params}`);
  };

  return (
    <AppSpace>
      <PageTitle>Choose a template</PageTitle>
      <AppRow gutter={[16, 16]}>
        {templates.map((template, i) => (
          <Col span={6} key={i}>
            <TemplateChip
              {...template}
              active={active === i}
              onClick={() => setActive(i)}
            />
          </Col>
        ))}
      </AppRow>
      <Flex justify="flex-end">
        <AppButton onClick={handleNext} type="primary" size="small">
          Next
        </AppButton>
      </Flex>
    </AppSpace>
  );
};
