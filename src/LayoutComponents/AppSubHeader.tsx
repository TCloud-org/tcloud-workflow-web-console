import { Flex, Tag, theme } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SiderName } from "./AppSider";
import { useNavigate } from "react-router-dom";
import { borderColor } from "Config/AutomationConfig";
import { PushpinFilled } from "@ant-design/icons";
import { setPinned } from "features/favorite/menuFavoriteSlice";

export const AppSubHeader = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pinned = useSelector((state: any) => state.menuFavorite.pinned);

  const handleClose = (itemKey: string) => {
    dispatch(setPinned({ [itemKey]: false }));
  };

  return (
    <Flex
      style={{
        backgroundColor: token.colorBgContainer,
        height: 35,
        padding: "0 32px",
      }}
      align="center"
      wrap="wrap"
    >
      {Object.entries(pinned)
        .filter(([_, isPinned]) => isPinned)
        .map(([itemKey, _]) => (
          <Tag
            color={borderColor}
            closable
            icon={<PushpinFilled />}
            onClick={() => navigate(itemKey)}
            onClose={() => handleClose(itemKey)}
            style={{ cursor: "pointer" }}
          >
            {SiderName[itemKey as keyof typeof SiderName]}
          </Tag>
        ))}
    </Flex>
  );
};
