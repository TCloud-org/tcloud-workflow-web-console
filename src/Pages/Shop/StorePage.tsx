import { FormOutlined } from "@ant-design/icons";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppSearchInput } from "DataEntryComponents/AppSearchInput";
import { AppSpace } from "LayoutComponents/AppSpace";
import { useLocation, useNavigate } from "react-router-dom";
import { EmailTemplateStore } from "./EmailTemplateStore";

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

      <AppSearchInput />

      <EmailTemplateStore />
    </AppSpace>
  );
};
