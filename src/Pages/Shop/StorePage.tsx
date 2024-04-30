import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppSpace } from "LayoutComponents/AppSpace";
import { EmailTemplateStore } from "./EmailTemplateStore";
import { AppButton } from "DataEntryComponents/AppButton";
import { FormOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

export const StorePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePublish = () => {
    navigate(`${location.pathname}/publish`);
  };

  return (
    <AppSpace>
      <PageTitle
        endDecorator={
          <AppButton
            icon={<FormOutlined />}
            type="primary"
            onClick={handlePublish}
          >
            Publish
          </AppButton>
        }
      >
        Store
      </PageTitle>

      <EmailTemplateStore />
    </AppSpace>
  );
};
