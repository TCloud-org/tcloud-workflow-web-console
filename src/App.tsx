import { SiderCollapseWidth, SiderWidth } from "Config/LayoutConfig";
import { ApiWorkflowHowItWorksPage } from "Pages/ApiWorkflowGetStartedSider/ApiWorkflowHowItWorksPage";
import { ApiWorkflowIntroductionPage } from "Pages/ApiWorkflowGetStartedSider/ApiWorkflowIntroductionPage";
import { ApiWorkflowModelPage } from "Pages/ApiWorkflowGetStartedSider/ApiWorkflowModelPage";
import { ApiWorkflowQuickstartPage } from "Pages/ApiWorkflowGetStartedSider/ApiWorkflowQuickstartPage";
import { DevModePage } from "Pages/DevModeSider/DevModePage";
import { MonitorTrafficPage } from "Pages/MonitorSider/MonitorTrafficPage";
import { QueryPage } from "Pages/QuerySider/QueryPage";
import { WorkflowStatisticPage } from "Pages/Statistic/WorkflowStatisticPage";
import { CreateEmailNotificationWorkflowPage } from "Pages/WorkflowAutomationSider/CreateEmailNotificationWorkflowPage";
import { EmailNotificationJobPage } from "Pages/WorkflowAutomationSider/EmailNotificationJobPage";
import { EmailNotificationTemplateSelectionPage } from "Pages/WorkflowAutomationSider/EmailNotificationTemplateSelectionPage";
import { EmailNotificationWorkflowDetailPage } from "Pages/WorkflowAutomationSider/EmailNotificationWorkflowDetailPage";
import { EmailNotificationWorkflowPage } from "Pages/WorkflowAutomationSider/EmailNotificationWorkflowPage";
import { WorkflowAutomationPage } from "Pages/WorkflowAutomationSider/WorkflowAutomationPage";
import { Layout, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Outlet,
  RouteObject,
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
import { WorkflowPage } from "Pages/ApiWorkflowConfigurationSider/WorkflowPage";
import { NotFoundPage } from "Pages/NotFoundPage";
import { LoginPage } from "Pages/Authentication/LoginPage";
import { SignUpPage } from "Pages/Authentication/SignUpPage";
import { TermsAndConditionsPage } from "Pages/Policy/TermsAndConditionsPage";
import { PrivacyPolicyPage } from "Pages/Policy/PrivacyPolicyPage";
import { ForgotPasswordPage } from "Pages/Authentication/ForgotPasswordPage";

export const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const authToken = useSelector((state: any) => state.auth.token);

  const Wrapper = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const [collapsed, setCollapsed] = useState<boolean>(true);
    const [isSiderHovered, setIsSiderHovered] = useState<boolean>(false);

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

    if (!authToken) {
      return (
        <Layout style={{ minHeight: "100vh", background: colorBgContainer }}>
          <Outlet />
        </Layout>
      );
    }

    return (
      <Layout style={{ minHeight: "100vh" }}>
        <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />

        <Layout hasSider>
          <AppSider
            collapsed={collapsed}
            isHovered={isSiderHovered}
            setIsHovered={setIsSiderHovered}
          />

          <Layout
            style={{
              marginLeft:
                collapsed && !isSiderHovered ? SiderCollapseWidth : SiderWidth,
              transition: "0.2s",
            }}
          >
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

  const globalRoutes: RouteObject[] = [
    {
      path: "/terms-and-conditions",
      element: <TermsAndConditionsPage />,
    },
    {
      path: "/privacy-policy",
      element: <PrivacyPolicyPage />,
    },
  ];

  const router = createBrowserRouter([
    {
      element: <Wrapper />,
      errorElement: <NotFoundPage />,
      children: !authToken
        ? [
            ...globalRoutes,
            {
              path: "/",
              element: <LoginPage />,
            },
            {
              path: "/sign-up",
              element: <SignUpPage />,
            },
            {
              path: "/forgot-your-password",
              element: <ForgotPasswordPage />,
            },
          ]
        : [
            ...globalRoutes,
            {
              path: "/",
              element: <HomePage />,
            },
            {
              path: "/statistic",
              element: <WorkflowStatisticPage />,
            },
            {
              path: "/api-workflow-introduction",
              element: <ApiWorkflowIntroductionPage />,
            },
            {
              path: "/api-workflow-how-it-works",
              element: <ApiWorkflowHowItWorksPage />,
            },
            {
              path: "/api-workflow-onboarding",
              element: <OnboardingPage />,
            },
            {
              path: "/api-workflow-model",
              element: <ApiWorkflowModelPage />,
            },
            {
              path: "/api-workflow-quickstart",
              element: <ApiWorkflowQuickstartPage />,
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
              path: "/workflow",
              element: <WorkflowPage />,
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
              path: "/workflow-automation/email-notification-workflow/choose-template",
              element: <EmailNotificationTemplateSelectionPage />,
            },
            {
              path: "/workflow-automation/email-notification-workflow/choose-template/create",
              element: <CreateEmailNotificationWorkflowPage />,
            },
            {
              path: "/workflow-automation/email-notification-workflow/:id",
              element: <EmailNotificationWorkflowDetailPage />,
            },
            {
              path: "/workflow-automation/email-notification-workflow/:id/job",
              element: <EmailNotificationJobPage />,
            },
          ],
    },
  ]);

  return <RouterProvider router={router} />;
};
