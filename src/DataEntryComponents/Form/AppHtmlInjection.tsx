import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppSpace } from "LayoutComponents/AppSpace";

export const AppHtmlInjection = (props: {
  value?: any;
  onChange?: (e: any) => void;
}) => {
  return (
    <AppSpace>
      <PageTitle>Coming soon...</PageTitle>
    </AppSpace>
  );
};
