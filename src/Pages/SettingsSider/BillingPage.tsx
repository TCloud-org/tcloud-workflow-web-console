import { AppButton } from "DataEntryComponents/AppButton";
import { PageTitle } from "../../DataDisplayComponents/PageTitle";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import axios from "axios";
import { AMS_CREATE_CHECKOUT_SESSION_ENDPOINT } from "Config/AMSEndpointConfig";
import { useSelector } from "react-redux";

export const BillingPage = () => {
  const accessToken = useSelector((state: any) => state.auth.token);

  const handleTest = async () => {
    const url = await axios
      .post(
        AMS_CREATE_CHECKOUT_SESSION_ENDPOINT,
        {
          test: "test",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => res.data);
    window.location.href = url;
  };
  return (
    <AppSpace>
      <PageTitle>Coming soon...</PageTitle>
      {/* <AppButton onClick={handleTest}>Test</AppButton> */}
    </AppSpace>
  );
};
