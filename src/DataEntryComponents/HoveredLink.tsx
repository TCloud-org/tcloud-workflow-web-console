import { theme } from "antd";
import { useState } from "react";

export const HoveredLink = (props: { href?: string; children?: string }) => {
  const { token } = theme.useToken();

  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <a
      style={{
        transition: "0.1s",
        color: isHovered ? token.colorInfo : token.colorText,
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
