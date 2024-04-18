import { CaretDownOutlined } from "@ant-design/icons";
import { AppIconButton } from "DataEntryComponents/AppIconButton";
import { AppAnimatedBox } from "LayoutComponents/AppAnimatedBox";
import { Flex, List } from "antd";
import { ListItemMetaProps } from "antd/es/list";
import { useEffect, useRef, useState } from "react";

export const EmailListItem = (props: { item: ListItemMetaProps }) => {
  const { item } = props;

  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      contentRef.current.style.height = isCollapsed ? "0" : `${height}px`;
    }
  }, [isCollapsed]);

  return (
    <List.Item>
      <List.Item.Meta
        title={
          <Flex justify="space-between" align="center">
            {item.title}
            <AppIconButton
              type="text"
              onClick={() => setIsCollapsed((prev) => !prev)}
            >
              <CaretDownOutlined
                style={{
                  transition: "0.2s",
                  transform: !isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </AppIconButton>
          </Flex>
        }
        description={item.description}
        avatar={item.avatar}
      />
      <AppAnimatedBox ref={contentRef}>{item.children}</AppAnimatedBox>
    </List.Item>
  );
};
