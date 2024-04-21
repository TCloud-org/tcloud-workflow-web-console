import { LinkOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { TitleProps } from "antd/es/typography/Title";
import { useState } from "react";

export const AppHeadingLink = (props: {
  level?: TitleProps["level"];
  id?: string;
  children?: string;
}) => {
  const { level, id, children } = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a href={`#${id}`} style={{ color: "black" }}>
      <Typography.Title
        level={level}
        id={id}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
        <LinkOutlined
          style={{
            marginLeft: 8,
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.2s ease-in-out",
          }}
        />
      </Typography.Title>
    </a>
  );
};
