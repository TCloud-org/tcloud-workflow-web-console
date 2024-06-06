import { AddWorkflowPage } from "Pages/ApiWorkflowConfigurationSider/AddWorkflowPage";
import { WorkflowPage } from "Pages/ApiWorkflowConfigurationSider/WorkflowPage";
import { ApiWorkflowHowItWorksPage } from "Pages/ApiWorkflowGetStartedSider/ApiWorkflowHowItWorksPage";
import { ApiWorkflowIntroductionPage } from "Pages/ApiWorkflowGetStartedSider/ApiWorkflowIntroductionPage";
import { ApiWorkflowModelPage } from "Pages/ApiWorkflowGetStartedSider/ApiWorkflowModelPage";
import { ApiWorkflowQuickstartPage } from "Pages/ApiWorkflowGetStartedSider/ApiWorkflowQuickstartPage";
import { EmailVerificationPage } from "Pages/Authentication/EmailVerificationPage";
import { ForgotPasswordPage } from "Pages/Authentication/ForgotPasswordPage";
import { LoginPage } from "Pages/Authentication/LoginPage";
import { ResetPasswordPage } from "Pages/Authentication/ResetPasswordPage";
import { SignUpPage } from "Pages/Authentication/SignUpPage";
import { DevModePage } from "Pages/DevModeSider/DevModePage";
import { InvitationPage } from "Pages/InvitationPage";
import { MonitorPage } from "Pages/MonitorSider/MonitorPage";
import { NotFoundPage } from "Pages/NotFoundPage";
import { AddClientPage } from "Pages/PeopleSider/AddClientPage";
import { ClientDetailsPage } from "Pages/PeopleSider/ClientDetailsPage";
import { ClientPage } from "Pages/PeopleSider/ClientPage";
import { InviteClientPage } from "Pages/PeopleSider/InviteClientPage";
import { PeoplePage } from "Pages/PeopleSider/PeoplePage";
import { ViewInvitationsPage } from "Pages/PeopleSider/ViewInvitationsPage";
import { CookiePolicyPage } from "Pages/Policy/CookiePolicyPage";
import { PrivacyPolicyPage } from "Pages/Policy/PrivacyPolicyPage";
import { TermsAndConditionsPage } from "Pages/Policy/TermsAndConditionsPage";
import { QueryPage } from "Pages/QuerySider/QueryPage";
import { SecurityPage } from "Pages/SecuritySider/SecurityPage";
import { AccountPage } from "Pages/SettingsSider/AccountPage";
import { SettingsPage } from "Pages/SettingsSider/SettingsPage";
import { EditEmailTemplatePage } from "Pages/Shop/EditEmailTemplatePage";
import { EmailTemplateDetailPage } from "Pages/Shop/EmailTemplateDetailPage";
import { PublishProductPage } from "Pages/Shop/PublishProductPage";
import { StorePage } from "Pages/Shop/StorePage";
import { WorkflowStatisticPage } from "Pages/Statistic/WorkflowStatisticPage";
import { StepWorkflowPage } from "Pages/StepWorkflowSider/StepWorkflowPage";
import { SubscriptionInvoicePage } from "Pages/Subscription/SubscriptionInvoicePage";
import { SubscriptionPage } from "Pages/Subscription/SubscriptionPage";
import { SubscriptionPlanPage } from "Pages/Subscription/SubscriptionPlanPage";
import { ContactPage } from "Pages/Support/ContactPage";
import { HelpPage } from "Pages/Support/HelpPage";
import { SupportPage } from "Pages/Support/SupportPage";
import { CreateEmailNotificationWorkflowPage } from "Pages/WorkflowAutomationSider/CreateEmailNotificationWorkflowPage";
import { EmailNotificationJobPage } from "Pages/WorkflowAutomationSider/EmailNotificationJobPage";
import { EmailNotificationTemplateSelectionPage } from "Pages/WorkflowAutomationSider/EmailNotificationTemplateSelectionPage";
import { EmailNotificationWorkflowDetailPage } from "Pages/WorkflowAutomationSider/EmailNotificationWorkflowDetailPage";
import { EmailNotificationWorkflowPage } from "Pages/WorkflowAutomationSider/EmailNotificationWorkflowPage";
import { NotificationHubPage } from "Pages/WorkflowAutomationSider/NotificationHubPage";
import { Layout, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import { AppFooter } from "./LayoutComponents/AppFooter";
import { AppHeader } from "./LayoutComponents/AppHeader";
import { AppSider } from "./LayoutComponents/AppSider";
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
import { DashboardPage } from "./Pages/DashboardPage";
import { CreateGraphPage } from "./Pages/GraphSider/AddGraphPage";
import { EditGraphPage } from "./Pages/GraphSider/EditGraphPage";
import { GraphDetailPage } from "./Pages/GraphSider/GraphDetailPage";
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
import { BillingPage } from "./Pages/SettingsSider/BillingPage";
import { GeneralPage } from "./Pages/SettingsSider/GeneralPage";
import { deserializeLocation } from "./Utils/Serializer";
import { setItems } from "./features/navigation/breadcrumbSlice";

export const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const authToken = useSelector((state: any) => state.auth.token);
  const account = useSelector((state: any) => state.auth.account);

  const Wrapper = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const isExternalLink = searchParams.get("isExternalLink");

    const [collapsed, setCollapsed] = useState<boolean>(true);

    useEffect(() => {
      const deserializedLocation = deserializeLocation(location.pathname);
      dispatch(setItems(deserializedLocation));
    }, [dispatch, location.pathname]);

    if (!authToken || !account || isExternalLink) {
      return (
        <Layout style={{ minHeight: "100vh", background: colorBgContainer }}>
          <Outlet />
        </Layout>
      );
    }

    return (
      <Layout style={{ minHeight: "100vh", backgroundColor: colorBgContainer }}>
        <AppSider collapsed={collapsed} setCollapsed={setCollapsed} />

        <Layout
          style={{ backgroundColor: colorBgContainer }}
          className={`ml-0 lg:ml-[266px]`}
        >
          <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />

          <Layout
            style={{
              padding: "0 16px 0 16px",
              marginTop: 80,
              backgroundColor: colorBgContainer,
            }}
          >
            <AppBreadcrumb />

            <Content
              style={{
                margin: 0,
                paddingBottom: 16,
                minHeight: 280,
                background: "transparent",
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
          <AppFooter />
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
    {
      path: "/cookie-policy",
      element: <CookiePolicyPage />,
    },
    {
      path: "/invitation/:token",
      element: <InvitationPage />,
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
            {
              path: "/email-verification",
              element: <EmailVerificationPage />,
            },
            {
              path: "/reset-your-password/:resetToken",
              element: <ResetPasswordPage />,
            },
            {
              path: "*",
              element: <Navigate to="/" replace />,
            },
          ]
        : [
            ...globalRoutes,
            {
              path: "/",
              element: <DashboardPage />,
            },
            {
              path: "/statistic",
              element: <WorkflowStatisticPage />,
            },
            {
              path: "/step-workflow",
              element: <StepWorkflowPage />,
            },
            {
              path: "/step-workflow-introduction",
              element: <ApiWorkflowIntroductionPage />,
            },
            {
              path: "/step-workflow-how-it-works",
              element: <ApiWorkflowHowItWorksPage />,
            },
            {
              path: "/step-workflow-onboarding",
              element: <OnboardingPage />,
            },
            {
              path: "/step-workflow-model",
              element: <ApiWorkflowModelPage />,
            },
            {
              path: "/step-workflow-quickstart",
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
              path: "/step-workflow/add-workflow",
              element: <AddWorkflowPage />,
            },
            {
              path: "/graph",
              element: <Navigate to="/step-workflow" />,
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
              path: "/step-workflow/add-graph",
              element: <CreateGraphPage />,
            },
            {
              path: "/service",
              element: <Navigate to="/step-workflow" />,
            },
            {
              path: "/step-workflow/add-service-endpoint",
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
              path: "/step-workflow/add-retry-policy",
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
              path: "/security",
              element: <SecurityPage />,
            },
            {
              path: "/authentication",
              element: <AuthTokenPage />,
            },
            {
              path: "/authentication/:tokenId",
              element: <ViewTokenPage />,
            },
            {
              path: "/authentication/:tokenId/edit",
              element: <EditTokenPage />,
            },
            {
              path: "/authentication/add",
              element: <AddTokenPage />,
            },
            {
              path: "/people",
              element: <PeoplePage />,
            },
            {
              path: "/client",
              element: <ClientPage />,
            },
            {
              path: "/people/add-client",
              element: <AddClientPage />,
            },
            {
              path: "/client/:clientId",
              element: <ClientDetailsPage />,
            },
            {
              path: "/client/:clientId/invite",
              element: <InviteClientPage />,
            },
            {
              path: "/client/:clientId/view-invitations",
              element: <ViewInvitationsPage />,
            },
            {
              path: "/settings",
              element: <SettingsPage />,
            },
            {
              path: "/account",
              element: <AccountPage />,
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
              path: "/monitor",
              element: <MonitorPage />,
            },
            {
              path: "/development",
              element: <DevModePage />,
            },
            {
              path: "/notification-hub",
              element: <NotificationHubPage />,
            },
            {
              path: "/notification-hub/email-notification-workflow",
              element: <EmailNotificationWorkflowPage />,
            },
            {
              path: "/notification-hub/email-notification-workflow/choose-template",
              element: <EmailNotificationTemplateSelectionPage />,
            },
            {
              path: "/notification-hub/email-notification-workflow/choose-template/create",
              element: <CreateEmailNotificationWorkflowPage />,
            },
            {
              path: "/notification-hub/email-notification-workflow/:id",
              element: <EmailNotificationWorkflowDetailPage />,
            },
            {
              path: "/notification-hub/email-notification-workflow/:id/job",
              element: <EmailNotificationJobPage />,
            },
            {
              path: "/store",
              element: <StorePage />,
            },
            {
              path: "/store/publish",
              element: <PublishProductPage />,
            },
            {
              path: "/store/:productId",
              element: <EmailTemplateDetailPage />,
            },
            {
              path: "/store/:productId/edit",
              element: <EditEmailTemplatePage />,
            },
            {
              path: "/help",
              element: <HelpPage />,
            },
            {
              path: "/support",
              element: <SupportPage />,
            },
            {
              path: "/contact",
              element: <ContactPage />,
            },
            {
              path: "/subscription/plan",
              element: <SubscriptionPlanPage />,
            },
            {
              path: "/subscription",
              element: <SubscriptionPage />,
            },
            {
              path: "/invoice/:paymentId",
              element: <SubscriptionInvoicePage />,
            },
          ],
    },
  ]);

  return <RouterProvider router={router} />;
};
