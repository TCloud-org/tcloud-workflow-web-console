import { Tooltip } from "antd";

export const AppLink = (props: {
  children?: string | undefined;
  href?: string | undefined;
  tooltip?: string | undefined;
}) => {
  const { children, href, tooltip } = props;
  return (
    <Tooltip title={tooltip}>
      <a href={href}>{children}</a>
    </Tooltip>
  );
};
