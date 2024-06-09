import { AppSurface } from "DataDisplayComponents/AppSurface";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppSpace } from "LayoutComponents/AppSpace";

export const MonitorPage = () => {
  return (
    <AppSurface>
      <AppSpace>
        <PageTitle>Coming soon</PageTitle>

        <p className="mb-4 text-paragraph">
          Thank you for your patience as we work on this feature. To submit any
          feature requests, please visit our{" "}
          <a href="https://thecloudworld.supahub.com/b/feature-requests">
            Feature Request
          </a>{" "}
          page
        </p>
      </AppSpace>
    </AppSurface>
  );
};
