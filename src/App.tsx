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
import { AppSider } from "./LayoutComponents/AppSider";
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

export const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const Wrapper = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
      dispatch(setItems(deserializeLocation(location.pathname)));
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
