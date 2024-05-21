import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppSpace } from "LayoutComponents/AppSpace";
import { EmailTemplateStore } from "./EmailTemplateStore";
import { AppButton } from "DataEntryComponents/AppButton";
import { FormOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { AppSearchInput } from "DataEntryComponents/AppSearchInput";
import { AppSurface } from "DataDisplayComponents/AppSurface";

export const StorePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePublish = () => {
    navigate(`${location.pathname}/publish`);
  };

  return (
    <AppSurface type="form" style={{ paddingBottom: 24 }}>
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
    </AppSurface>
  );
};
