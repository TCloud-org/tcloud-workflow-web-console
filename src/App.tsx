import { SiderWidth } from "Config/LayoutConfig";
import { DevModePage } from "Pages/DevModeSider/DevModePage";
import { MonitorTrafficPage } from "Pages/MonitorSider/MonitorTrafficPage";
import { QueryPage } from "Pages/QuerySider/QueryPage";
import { WorkflowStatisticPage } from "Pages/Statistic/WorkflowStatisticPage";
import { CreateEmailNotificationWorkflowPage } from "Pages/WorkflowAutomationSider/CreateEmailNotificationWorkflowPage";
import { EmailNotificationWorkflowPage } from "Pages/WorkflowAutomationSider/EmailNotificationWorkflowPage";
import { WorkflowAutomationPage } from "Pages/WorkflowAutomationSider/WorkflowAutomationPage";
import { Layout, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import { AppFooter } from "./LayoutComponents/AppFooter";
import { AppHeader } from "./LayoutComponents/AppHeader";
import { AppSider, SiderHrefs } from "./LayoutComponents/AppSider";
import { AppBreadcrumb } from "./NavigationComponents/AppBreadcrumb";
import { AddTokenPage } from "./Pages/AuthTokenSider/AddTokenPage";
import { AuthTokenPage } from "./Pages/AuthTokenSider/AuthTokenPage";
import { EditTokenPage } from "./Pages/AuthTokenSider/EditTokenPage";
import { ViewTokenPage } from "./Pages/AuthTokenSider/ViewTokenPage";
import { BatchClosePage } from "./Pages/BucketSider/BatchClosePage";
import { BatchRerunPage } from "./Pages/BucketSider/BatchRerunPage";
import { BatchRetryPage } from "./Pages/BucketSider/BatchRetryPage";
import { BatchTransitionPage } from "./Pages/BucketSider/BatchTransitionPage";
import { BucketPage } from "./Pages/BucketSider/BucketPage";
import { CreateGraphPage } from "./Pages/GraphSider/CreateGraphPage";
import { EditGraphPage } from "./Pages/GraphSider/EditGraphPage";
import { GraphDetailPage } from "./Pages/GraphSider/GraphDetailPage";
import { GraphPage } from "./Pages/GraphSider/GraphPage";
import { HomePage } from "./Pages/HomePage";
import { LiveWorkflowPage } from "./Pages/LiveSider/LiveWorkflowPage";
import { WorkPage } from "./Pages/LiveSider/WorkPage";
import { OnboardingPage } from "./Pages/OnboardingSider/OnboardingPage";
import { AddRetryPolicyPage } from "./Pages/RetryPolicySider/AddRetryPolicyPage";
import { EditRetryPolicyPage } from "./Pages/RetryPolicySider/EditRetryPolicyPage";
import { RetryPolicyDetailPage } from "./Pages/RetryPolicySider/RetryPolicyDetailPage";
import { RetryPolicyPage } from "./Pages/RetryPolicySider/RetryPolicyPage";
import { AddServicePage } from "./Pages/ServiceSider/AddServicePage";
import { CreateEndpointPage } from "./Pages/ServiceSider/CreateEndpointPage";
import { EditEndpointPage } from "./Pages/ServiceSider/EditEndpointPage";
import { ServiceDetailPage } from "./Pages/ServiceSider/ServiceDetailPage";
import { ServiceEndpointSetting } from "./Pages/ServiceSider/ServiceEndpointSetting";
import { ServicePage } from "./Pages/ServiceSider/ServicePage";
import { BillingPage } from "./Pages/SettingsSider/BillingPage";
import { GeneralPage } from "./Pages/SettingsSider/GeneralPage";
import { deserializeLocation } from "./Utils/Serializer";
import { setItems } from "./features/navigation/breadcrumbSlice";
import { setSelectedKeys } from "./features/navigation/siderSlice";

export const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const Wrapper = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
      const deserializedLocation = deserializeLocation(location.pathname);
      const siderKey = deserializedLocation.find(
        (item) => item.href in SiderHrefs
      );

      if (siderKey?.href) {
        dispatch(setSelectedKeys([siderKey.href]));
      } else {
        dispatch(setSelectedKeys(["home"]));
      }
      dispatch(setItems(deserializedLocation));
    }, [dispatch, location.pathname]);

    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Layout hasSider>
          <AppSider />

          <Layout style={{ marginLeft: SiderWidth }}>
            <AppHeader />
            <Layout style={{ padding: "0 16px 0 16px" }}>
              <AppBreadcrumb />

              <Content
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                <Outlet />
              </Content>
            </Layout>
            <AppFooter />
          </Layout>
        </Layout>
      </Layout>
    );
  };

  const router = createBrowserRouter([
    {
      element: <Wrapper />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/statistic",
          element: <WorkflowStatisticPage />,
        },
        {
          path: "/onboarding",
          element: <OnboardingPage />,
        },
        {
          path: "/query",
          element: <QueryPage />,
        },
        {
          path: "/live",
          element: <LiveWorkflowPage />,
        },
        {
          path: "/live/:workId",
          element: <WorkPage />,
        },
        {
          path: "/bucket",
          element: <BucketPage />,
        },
        {
          path: "/bucket/batch-retry",
          element: <BatchRetryPage />,
        },
        {
          path: "/bucket/batch-rerun",
          element: <BatchRerunPage />,
        },
        {
          path: "/bucket/batch-transition",
          element: <BatchTransitionPage />,
        },
        {
          path: "/bucket/batch-close",
          element: <BatchClosePage />,
        },
        {
          path: "/graph",
          element: <GraphPage />,
        },
        {
          path: "/graph/:graphId",
          element: <GraphDetailPage />,
        },
        {
          path: "/graph/:graphId/edit",
          element: <EditGraphPage />,
        },
        {
          path: "/graph/create",
          element: <CreateGraphPage />,
        },
        {
          path: "/service",
          element: <ServicePage />,
        },
        {
          path: "/service/add",
          element: <AddServicePage />,
        },
        {
          path: "/service/:serviceName",
          element: <ServiceDetailPage />,
        },
        {
          path: "/service/:serviceName/create",
          element: <CreateEndpointPage />,
        },
        {
          path: "/service/:serviceName/:serviceId",
          element: <ServiceEndpointSetting />,
        },
        {
          path: "/service/:serviceName/:serviceId/edit",
          element: <EditEndpointPage />,
        },
        {
          path: "/retry-policy",
          element: <RetryPolicyPage />,
        },
        {
          path: "/retry-policy/add",
          element: <AddRetryPolicyPage />,
        },
        {
          path: "/retry-policy/:retryPolicyId",
          element: <RetryPolicyDetailPage />,
        },
        {
          path: "/retry-policy/:retryPolicyId/edit",
          element: <EditRetryPolicyPage />,
        },
        {
          path: "/auth-token",
          element: <AuthTokenPage />,
        },
        {
          path: "/auth-token/:tokenId",
          element: <ViewTokenPage />,
        },
        {
          path: "/auth-token/:tokenId/edit",
          element: <EditTokenPage />,
        },
        {
          path: "/auth-token/add",
          element: <AddTokenPage />,
        },
        {
          path: "/general",
          element: <GeneralPage />,
        },
        {
          path: "/billing",
          element: <BillingPage />,
        },
        {
          path: "/traffic",
          element: <MonitorTrafficPage />,
        },
        {
          path: "/development",
          element: <DevModePage />,
        },
        {
          path: "/workflow-automation",
          element: <WorkflowAutomationPage />,
        },
        {
          path: "/workflow-automation/email-notification-workflow",
          element: <EmailNotificationWorkflowPage />,
        },
        {
          path: "/workflow-automation/email-notification-workflow/create",
          element: <CreateEmailNotificationWorkflowPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
