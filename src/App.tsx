import { Layout, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import { AppFooter } from "./LayoutComponents/AppFooter";
import { AppHeader } from "./LayoutComponents/AppHeader";
import { AppSider, SiderHrefs } from "./LayoutComponents/AppSider";
import { HomePage } from "./Pages/HomePage";
import { AppBreadcrumb } from "./NavigationComponents/AppBreadcrumb";
import { LiveWorkflowPage } from "./Pages/LiveWorkflowPage";
import { WorkPage } from "./Pages/WorkPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setItems } from "./features/navigation/breadcrumbSlice";
import { deserializeLocation } from "./Utils/Serializer";
import { GraphPage } from "./Pages/GraphPage";
import { GraphDetailPage } from "./Pages/GraphDetailPage";
import { CreateGraphPage } from "./Pages/CreateGraphPage";
import { ServicePage } from "./Pages/ServicePage";
import { ServiceDetailPage } from "./Pages/ServiceDetailPage";
import { ServiceEndpointSetting } from "./Pages/ServiceEndpointSetting";
import { CreateEndpointPage } from "./Pages/CreateEndpointPage";
import { EditEndpointPage } from "./Pages/EditEndpointPage";
import { AddServicePage } from "./Pages/AddServicePage";
import { BucketPage } from "./Pages/BucketPage";
import { RetryPolicyPage } from "./Pages/RetryPolicyPage";
import { RetryPolicyDetailPage } from "./Pages/RetryPolicyDetailPage";
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
      const siderKey = deserializedLocation.find((item) =>
        SiderHrefs.has(item.href)
      );
      if (siderKey?.href) {
        dispatch(setSelectedKeys([siderKey.href]));
      }
      dispatch(setItems(deserializedLocation));
    }, [dispatch, location.pathname]);

    return (
      <Layout style={{ minHeight: "100vh" }}>
        <AppHeader />

        <Layout hasSider>
          <AppSider />

          <Layout>
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
          path: "/live",
          element: <LiveWorkflowPage />,
        },
        {
          path: "/live/:workId",
          element: <WorkPage />,
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
          path: "/bucket",
          element: <BucketPage />,
        },
        {
          path: "/retry-policy",
          element: <RetryPolicyPage />,
        },
        {
          path: "/retry-policy/:retryPolicyId",
          element: <RetryPolicyDetailPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
