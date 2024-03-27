import { PartitionOutlined } from "@ant-design/icons";
import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppSider = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const items2: MenuProps["items"] = [
    {
      key: "workflow",
      icon: <PartitionOutlined />,
      label: "Workflow",
      children: [
        {
          key: "workflow-live",
          label: "Live",
          onClick: () => navigate("/live"),
        },
        {
          key: "workflow-graph",
          label: "Graph",
          onClick: () => navigate("/graph"),
        },
        {
          key: "workflow-service",
          label: "Service",
          onClick: () => navigate("/service"),
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
        defaultSelectedKeys={["workflow"]}
        defaultOpenKeys={["workflow"]}
        style={{ borderRight: 0 }}
        items={items2}
      />
    </Sider>
  );
};
