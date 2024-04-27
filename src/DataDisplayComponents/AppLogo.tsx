import { LogoImageUrl } from "Config/LayoutConfig";
import { Image } from "antd";

export const AppLogo = (props: { spin?: boolean; size?: number }) => {
  const { spin, size = 60 } = props;
  return (
    <Image
      src={LogoImageUrl}
      width={size}
      preview={false}
      style={{
        animation: spin ? "spin 10s linear infinite" : "none",
      }}
    />
  );
};
