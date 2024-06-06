import { Typography, theme } from "antd";
import { CSSProperties, ReactElement, cloneElement } from "react";
import { MenuItem } from "./AppMenu";
import { useLocation } from "react-router-dom";

export const AppMenuLink = (props: { item: MenuItem }) => {
  const { token } = theme.useToken();

  const location = useLocation();
  const path = location.pathname;

  const { item } = props;

  const isHighlight = () => {
    if (item.href === "/") {
      return (
        path.includes(item.href || "undefined") &&
        path.split("/").join("") === ""
      );
    }
    return location.pathname.includes(item.href || "undefined");
  };

  return (
    <Typography.Link
      className={`flex items-center gap-2 hover:bg-slate-400/15 py-1 px-2 mx-2 rounded-md text-sm ${
        isHighlight() ? "bg-slate-400/15" : ""
      }`}
      style={{
        color: token.colorText,
      }}
      href={item.href}
    >
      {item.icon &&
        cloneElement(item.icon as ReactElement, {
          style: {
            fontSize: "inherit",
          } as CSSProperties,
        })}
      {item.label}
    </Typography.Link>
  );
};
