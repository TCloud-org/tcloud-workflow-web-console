import { theme } from "antd";
import { CSSProperties, useState } from "react";

export const HoveredLink = (props: {
  href?: string;
  children?: string;
  style?: CSSProperties;
}) => {
  const { token } = theme.useToken();

  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <a
      style={{
        transition: "all 0.3s",
        color: isHovered ? token.colorInfo : token.colorText,
        ...props.style,
      }}
      href={props.href}
      onMouseEnter={() => {
        if (!isHovered) {
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => {
        if (isHovered) {
          setIsHovered(false);
        }
      }}
    >
      {props.children}
    </a>
  );
};
