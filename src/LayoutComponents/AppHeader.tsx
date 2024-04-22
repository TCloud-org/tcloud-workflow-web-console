import {
  ClockCircleOutlined,
  ContainerOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingFilled,
  UserOutlined,
} from "@ant-design/icons";
import Icon from "@ant-design/icons/lib/components/Icon";
import { HeaderHeight } from "Config/LayoutConfig";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppIconButton } from "DataEntryComponents/AppIconButton";
import { AppSearchBar } from "DataEntryComponents/AppSearchBar";
import {
  AutoCompleteProps,
  Divider,
  Dropdown,
  Flex,
  MenuProps,
  Select,
  Typography,
  theme,
} from "antd";
import { Header } from "antd/es/layout/layout";
import { DefaultOptionType } from "antd/es/select";
import { clear, set } from "features/search/historySlice";
import { LRUCache } from "lru-cache";
import React, {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BRAND } from "../Config/WOSEndpointConfig";
import { setClientId } from "../features/workflow/clientSlice";
import { AppSubHeader } from "./AppSubHeader";
import { Account, logout } from "features/auth/authSlice";

export const AppHeader = (props: {
  collapsed?: boolean;
  setCollapsed?: Dispatch<SetStateAction<boolean>>;
}) => {
  const { token } = theme.useToken();

  const { collapsed, setCollapsed = () => {} } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accountItems: MenuProps["items"] = [
    {
      key: "/account",
      icon: <UserOutlined />,
      label: "Account",
      onClick: () => navigate("/account"),
    },
    {
      key: "/general",
      icon: <SettingFilled />,
      label: "Settings",
      onClick: () => navigate("/general"),
    },
    {
      key: "/billing",
      icon: <ContainerOutlined />,
      label: "Billing",
      onClick: () => navigate("/billing"),
    },
  ];

  const clientId = useSelector((state: any) => state.client.clientId);
  const historyCache: LRUCache<string, string | number, any> = useSelector(
    (state: any) => state.history.cache
  );
  const account: Account = useSelector((state: any) => state.auth.account);

  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    dispatch(setClientId("admin"));
  }, [dispatch]);

  const handleClientIdChange = (value: string) => {
    dispatch(setClientId(value));
  };

  const handleSearchEnter = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      dispatch(set({ key: searchInput.trim(), value: searchInput.trim() }));
      navigate(`live/${decodeURIComponent(searchInput.trim())}`);
    }
  };

  const handleSearchSelect = (value: string) => {
    dispatch(set({ key: value.trim(), value: value.trim() }));
    navigate(`live/${value}`);
  };

  const handleClear = () => {
    dispatch(clear());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const getHistoryOptions = (): AutoCompleteProps["options"] => {
    const options: AutoCompleteProps["options"] = [];
    historyCache.forEach((value, key) => {
      options.push({
        label: (
          <Flex justify="space-between" align="center">
            <Flex gap="12px" align="center">
              <ClockCircleOutlined />
              <Typography.Text>{value}</Typography.Text>
            </Flex>
            {/* <AppIconButton
              onClick={() => handleRemoveHistory(key)}
              type="text"
              size="small"
            >
              <CloseOutlined />
            </AppIconButton> */}
          </Flex>
        ),
        value: key,
      } as DefaultOptionType);
    });
    const parent: AutoCompleteProps["options"] = [
      {
        label: (
          <Flex justify="space-between" align="center">
            <span>Recent</span>
            <AppButton onClick={handleClear} type="link" size="small">
              Clear
            </AppButton>
          </Flex>
        ),
        options: options,
      },
    ];
    return parent;
  };

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const menuStyle: React.CSSProperties = {
    boxShadow: "none",
  };

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        width: "100%",
        height: HeaderHeight,
        background: token.colorBgContainer,
        borderBottom: `1px solid ${token.colorBorder}`,
        paddingLeft: 0,
        paddingRight: 0,
      }}
    >
      <Flex
        align="center"
        justify="space-between"
        style={{ width: "100%", paddingRight: 32, height: 64 }}
        gap={48}
      >
        <Flex justify="center" align="center" gap={16}>
          <AppIconButton
            type="text"
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 40,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </AppIconButton>
          <Typography.Link
            style={{
              flex: 1,
              textAlign: "center",
              borderRadius: token.borderRadiusLG,
              color: "black",
              fontSize: "18px",
            }}
            strong
            href="/"
          >
            <Flex justify="center" align="center">
              <Icon
                component={() => (
                  <img
                    alt={BRAND}
                    src="https://tcw-icon.s3.us-west-2.amazonaws.com/7.png"
                    width={24}
                    height={24}
                    style={{
                      marginRight: "8px",
                      // animation: "spin 2s linear infinite",
                    }}
                  />
                )}
              />
              {BRAND}
            </Flex>
          </Typography.Link>
        </Flex>
        <Flex
          style={{
            borderRadius: token.borderRadiusLG,
            flex: 2,
          }}
        >
          <AppSearchBar
            placeholder="Search by work ID"
            value={searchInput}
            onChange={(value) => setSearchInput(value)}
            options={getHistoryOptions()}
            onSelect={handleSearchSelect}
            onKeyDown={handleSearchEnter}
          />
        </Flex>

        <Flex gap="8px" align="center" style={{ flex: 1 }} justify="flex-end">
          <Select
            placeholder="Select client ID"
            value={clientId}
            variant="borderless"
            onChange={handleClientIdChange}
            options={[{ value: "admin", label: "admin" }]}
          />
          <Divider type="vertical" style={{ margin: "0 2px" }} />
          <Dropdown
            menu={{ items: accountItems }}
            trigger={["click"]}
            placement="bottomRight"
            dropdownRender={(menu) => (
              <div style={contentStyle}>
                {React.cloneElement(menu as React.ReactElement, {
                  style: menuStyle,
                })}
                <Divider style={{ margin: 0 }} />
                <Flex justify="center" style={{ padding: 8 }}>
                  <AppButton type="primary" size="small" onClick={handleLogout}>
                    Log out
                  </AppButton>
                </Flex>
              </div>
            )}
          >
            <AppButton type="text">
              {`${account.firstName} ${account.lastName}`}
            </AppButton>
          </Dropdown>
        </Flex>
      </Flex>
      <AppSubHeader />
    </Header>
  );
};
