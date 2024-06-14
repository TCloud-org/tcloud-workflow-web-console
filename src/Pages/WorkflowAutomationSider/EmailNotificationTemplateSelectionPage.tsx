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
    src: "https://utfs.io/f/23b12579-2938-45d3-b2e1-4adc221e887f-b8l3zi.png",
  },
  {
    key: "basic",
    title: "Basic",
    src: "https://utfs.io/f/0cdaf882-d07e-44e2-9bdc-eca9857117a5-b8rrmc.png",
  },
  {
    key: "delay",
    title: "Delay",
    src: "https://utfs.io/f/ba718cb5-47bf-41cf-a883-2c469ebc8c08-7lw247.png",
  },
  {
    key: "consecutiveEmails",
    title: "Consecutive Emails",
    src: "https://utfs.io/f/b7fdefc8-2139-47ef-9d3d-cdb15ee0507d-txocx4.png",
  },
  {
    key: "consecutiveEmailsWithDelay",
    title: "Consecutive Emails with Delay",
    src: "https://utfs.io/f/606a99a0-52c4-4d7d-b8c0-1cade4408191-etzlcu.png",
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
        <AppButton onClick={handleNext} type="primary">
          Next
        </AppButton>
      </Flex>
    </AppSpace>
  );
};
