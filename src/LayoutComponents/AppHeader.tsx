import {
  ContainerOutlined,
  DownOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  QuestionCircleOutlined,
  SettingFilled,
  UserOutlined,
} from "@ant-design/icons";
import { ScheduleRounded } from "@mui/icons-material";
import { Client } from "Config/SCSConfig";
import { AppAvatar } from "DataDisplayComponents/AppAvatar";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppIconButton } from "DataEntryComponents/AppIconButton";
import { AppSearchBar } from "DataEntryComponents/AppSearchBar";
import { getAccount } from "Network/AuthFetch";
import { getClients } from "Network/SecurityFetch";
import {
  AutoCompleteProps,
  Divider,
  Dropdown,
  Flex,
  MenuProps,
  Select,
  Tooltip,
  Typography,
  theme,
} from "antd";
import { Header } from "antd/es/layout/layout";
import { DefaultOptionType } from "antd/es/select";
import { ActionType } from "app/rootReducer";
import {
  Account,
  ProductTierType,
  ProductType,
  setAccount,
} from "features/auth/authSlice";
import { clear, set } from "features/search/historySlice";
import { setWorkflow } from "features/workflow/workflowSlice";
import { LRUCache } from "lru-cache";
import React, {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setClientId, updateClients } from "../features/workflow/clientSlice";
import { AppBrand } from "./AppBrand";
import { setTabIndex } from "features/settings/settingsSlice";

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
      onClick: () => {
        dispatch(setTabIndex("account"));
        navigate("/settings");
      },
    },
    {
      key: "/general",
      icon: <SettingFilled />,
      label: "Settings",
      onClick: () => {
        dispatch(setTabIndex("general"));
        navigate("/settings");
      },
    },
    {
      key: "/billing",
      icon: <ContainerOutlined />,
      label: "Billing",
      onClick: () => {
        dispatch(setTabIndex("billing"));
        navigate("/settings");
      },
    },
  ];

  const clientId = useSelector((state: any) => state.client.clientId);
  const historyCache: LRUCache<string, string | number, any> = useSelector(
    (state: any) => state.history.cache
  );
  const account: Account = useSelector((state: any) => state.auth.account);
  const clients: Client[] = useSelector((state: any) => state.client.clients);
  const authToken = useSelector((state: any) => state.auth.token);

  const [searchInput, setSearchInput] = useState<string>("");

  const fetchClients = useCallback(async () => {
    const res = await getClients(account.email);
    dispatch(updateClients(res.clients));
  }, [account, dispatch]);

  const fetchAccount = useCallback(async () => {
    const res = await getAccount(authToken);
    if (JSON.stringify(res.account) !== JSON.stringify(account)) {
      dispatch(setAccount(res.account));
    }
  }, [authToken, dispatch, account]);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleClientIdChange = (value: string) => {
    dispatch(setClientId(value));
    dispatch(setWorkflow(undefined));
  };

  const handleSearchEnter = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      dispatch(set({ key: searchInput.trim(), value: searchInput.trim() }));
      navigate(`live/${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const handleSearchSelect = (value: string) => {
    dispatch(set({ key: value.trim(), value: value.trim() }));
    navigate(`live/${encodeURIComponent(value)}`);
  };

  const handleClear = () => {
    dispatch(clear());
  };

  const handleLogout = () => {
    dispatch({ type: ActionType.logout });
    navigate("/");
  };

  const getHistoryOptions = (): AutoCompleteProps["options"] => {
    const options: AutoCompleteProps["options"] = [];
    historyCache.forEach((value, key) => {
      options.push({
        label: (
          <Tooltip title={value}>
            <Flex justify="space-between" align="center">
              <Flex gap="12px" align="center">
                <ScheduleRounded style={{ fontSize: 14 }} />
                <Typography.Text>{value}</Typography.Text>
              </Flex>
            </Flex>
          </Tooltip>
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
    backgroundColor: token.colorBgContainer,
    borderRadius: token.borderRadiusLG,
  };

  const menuStyle: React.CSSProperties = {
    boxShadow: "none",
  };

  const isTierUpgradable =
    account.productTiers?.find(
      (item) => item.product === ProductType.STEP_WORKFLOW
    )?.tier !== ProductTierType.ENTERPRISE;

  return (
    <Header className="left-0 lg:left-[280px] glass-bar !fixed top-4 right-4 z-50 p-0 flex items-center">
      <Flex align="center" justify="space-between" gap={16} className="w-full">
        <Flex
          align="center"
          style={{ flex: 1 }}
          className="flex lg:hidden pl-2"
        >
          <AppIconButton
            id="menu-button"
            type="text"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </AppIconButton>

          <AppBrand />
        </Flex>
        <Flex
          style={{
            borderRadius: token.borderRadiusLG,
            flex: 1.5,
          }}
          className="hidden lg:flex px-4"
          align="center"
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

        <Flex
          align="center"
          style={{ flex: 1.5 }}
          justify="flex-end"
          gap={8}
          className="px-4"
        >
          <Flex gap={8} align="center" className="hidden lg:flex">
            {isTierUpgradable && (
              <Flex className="mx-1">
                <AppButton
                  type="primary"
                  onClick={() => navigate("/subscription/plan")}
                >
                  Upgrade
                </AppButton>
              </Flex>
            )}
            <AppIconButton
              type="text"
              onClick={() => navigate("/support")}
              tooltip="Support"
            >
              <QuestionCircleOutlined />
            </AppIconButton>
            <Select
              placeholder="Client"
              value={clientId}
              dropdownStyle={{ width: "auto" }}
              placement="bottomRight"
              onChange={handleClientIdChange}
              options={clients.map((client) => ({
                label: client.clientId,
                value: client.clientId,
              }))}
            />
          </Flex>
          <Dropdown
            menu={{ items: accountItems }}
            trigger={["click"]}
            placement="bottomRight"
            dropdownRender={(menu) => (
              <div style={contentStyle} className="w-64 lg:w-80">
                <Flex style={{ padding: "8px 16px" }} justify="flex-start">
                  <Typography.Text type="secondary">
                    {account.email}
                  </Typography.Text>
                </Flex>
                <Divider style={{ margin: 0 }} />
                {React.cloneElement(menu as React.ReactElement, {
                  style: menuStyle,
                })}
                <Divider style={{ margin: 0 }} />
                <Flex justify="center" className="p-4">
                  <AppButton
                    type="primary"
                    size="small"
                    onClick={handleLogout}
                    icon={<LogoutOutlined />}
                  >
                    Log out
                  </AppButton>
                </Flex>
              </div>
            )}
          >
            <Flex
              align="center"
              style={{
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              className="px-4 py-2"
              gap={6}
            >
              <AppAvatar />
              <Typography.Text
                style={{
                  maxWidth: 100,
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                {`${account.firstName} ${account.lastName}`}
              </Typography.Text>
              <DownOutlined
                style={{ fontSize: 12, color: token.colorTextQuaternary }}
              />
            </Flex>
          </Dropdown>
        </Flex>
      </Flex>
    </Header>
  );
};
