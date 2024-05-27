import { Flex, Tag, theme } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SiderName } from "./AppSider";
import { useNavigate } from "react-router-dom";
import { borderColor } from "Config/AutomationConfig";
import { PushpinFilled } from "@ant-design/icons";
import { setPinned } from "features/favorite/menuFavoriteSlice";
import { Workflow } from "Config/WorkflowConfig";

const subHeaderHeight = 40;
export const AppSubHeader = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pinned = useSelector((state: any) => state.menuFavorite.pinned);
  const workflow: Workflow = useSelector(
    (state: any) => state.workflow.workflow
  );

  const handleClose = (itemKey: string) => {
    dispatch(setPinned({ [itemKey]: false }));
  };

  return (
    <Flex
      align="center"
      gap={16}
      justify="space-between"
      style={{ height: subHeaderHeight }}
    >
      <Flex
        style={{
          backgroundColor: token.colorBgContainer,
          height: 35,
          padding: "0 16px",
          overflow: "auto",
          scrollbarWidth: "none",
          flexGrow: 1,
        }}
        align="center"
        wrap="nowrap"
        gap={8}
      >
        {Object.entries(pinned)
          .filter(([_, isPinned]) => isPinned)
          .map(([itemKey, _], i) => (
            <Tag
              color={borderColor}
              key={i}
              closable
              icon={<PushpinFilled />}
              onClick={() => navigate(itemKey)}
              onClose={() => handleClose(itemKey)}
              style={{ cursor: "pointer", margin: 0 }}
            >
              {SiderName[itemKey as keyof typeof SiderName]}
            </Tag>
          ))}
      </Flex>
      <Flex style={{ flexGrow: 1 }} justify="flex-end">
        <Tag
          color={workflow ? "green-inverse" : "gold-inverse"}
          bordered={false}
          className="cursor-pointer"
          onClick={() => navigate("/step-workflow")}
        >
          {workflow ? `Active: ${workflow.workflowName}` : "No active workflow"}
        </Tag>
      </Flex>
    </Flex>
  );
};
