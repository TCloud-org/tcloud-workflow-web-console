import { PartitionOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const SiderHrefs = new Set<string>([
  "/live",
  "/bucket",
  "/graph",
  "/service",
  "/retry-policy",
]);

export const AppSider = () => {
  const selectedKeys = useSelector((state: any) => state.sider.selectedKeys);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const siderMenus: MenuProps["items"] = [
    {
      key: "workflow",
      icon: <PartitionOutlined />,
      label: "Workflow",
      children: [
        {
          key: "/live",
          label: "Live",
          onClick: () => navigate("/live"),
        },
        {
          key: "/bucket",
          label: "Bucket",
          onClick: () => navigate("/bucket"),
        },
        {
          key: "/graph",
          label: "Graph",
          onClick: () => navigate("/graph"),
        },
        {
          key: "/service",
          label: "Service",
          onClick: () => navigate("/service"),
        },
        {
          key: "/retry-policy",
          label: "Retry Policy",
          onClick: () => navigate("/retry-policy"),
        },
      ],
    },
  ];

  return (
    <Sider
      width="15%"
      collapsible
      theme="dark"
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={selectedKeys}
        defaultSelectedKeys={["workflow"]}
        defaultOpenKeys={["workflow"]}
        style={{ borderRight: 0 }}
        items={siderMenus}
      />
    </Sider>
  );
};
