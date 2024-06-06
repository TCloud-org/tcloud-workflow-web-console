import { CaretRightFilled } from "@ant-design/icons";
import { Email } from "Config/EMSConfig";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppAnimatedBox } from "LayoutComponents/AppAnimatedBox";
import { Flex, List, Typography } from "antd";
import { ListItemMetaProps } from "antd/es/list";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const EmailListItem = (props: {
  item: ListItemMetaProps & { email: Email };
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { item } = props;

  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      contentRef.current.style.height = isCollapsed ? "0" : `${height}px`;
    }
  }, [isCollapsed]);

  const handleViewJob = () => {
    const email = item.email;
    navigate(`${location.pathname}/job?id=${email.jobId}`);
  };

  return (
    <List.Item
      actions={[<AppButton onClick={handleViewJob}>View job</AppButton>]}
      style={{ paddingBottom: "24px" }}
    >
      <List.Item.Meta
        title={
          <Flex justify="space-between" align="center">
            <Flex align="center" gap={16}>
              <AppButton
                type="link"
                onClick={() => setIsCollapsed((prev) => !prev)}
                style={{ padding: 0, fontWeight: 600 }}
                icon={
                  <CaretRightFilled
                    style={{
                      transition: "0.2s",
                      transform: !isCollapsed
                        ? "rotate(90deg)"
                        : "rotate(0deg)",
                    }}
                  />
                }
              >
                {item.title}
              </AppButton>
            </Flex>
            <Typography.Text strong>
              {`Job #${item.email.jobId}`}
            </Typography.Text>
          </Flex>
        }
        description={item.description}
        avatar={item.avatar}
      />
      <AppAnimatedBox ref={contentRef}>{item.children}</AppAnimatedBox>
    </List.Item>
  );
};
