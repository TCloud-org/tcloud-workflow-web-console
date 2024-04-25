import { PushpinFilled, PushpinOutlined } from "@ant-design/icons";
import { AppIconButton } from "DataEntryComponents/AppIconButton";
import { SiderName } from "LayoutComponents/AppSider";
import { Flex, Typography, theme } from "antd";
import { setPinned } from "features/favorite/menuFavoriteSlice";
import { useDispatch, useSelector } from "react-redux";

export const AppMenuPin = (props: { children?: string }) => {
  const dispatch = useDispatch();
  const { token } = theme.useToken();

  const pinned = useSelector((state: any) => state.menuFavorite.pinned);

  const handlePin = () => {
    dispatch(
      setPinned({
        [props.children as string]: !pinned[props.children as string],
      })
    );
  };

  if (!props.children) return null;

  return (
    <Flex justify="space-between" align="center">
      <Typography.Text>
        {SiderName[props.children as keyof typeof SiderName]}
      </Typography.Text>
      <AppIconButton
        type="link"
        onClick={handlePin}
        style={{ color: token.colorText }}
      >
        {pinned[props.children as string] ? (
          <PushpinFilled />
        ) : (
          <PushpinOutlined />
        )}
      </AppIconButton>
    </Flex>
  );
};
