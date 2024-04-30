import { Image, theme } from "antd";

export const AppImageWithSource = (props: {
  imageUrl?: string;
  resourceUrl?: string;
  resourceLabel?: string;
  size?: number | string;
  preview?: boolean;
}) => {
  const { token } = theme.useToken();

  return (
    <div style={{ position: "relative" }}>
      <Image
        src={props.imageUrl}
        style={{
          borderRadius: token.borderRadiusLG,
          objectFit: "contain",
        }}
        height={props.size}
        preview={props.preview}
      />
      <a
        style={{
          fontSize: 12,
          position: "absolute",
          bottom: 16,
          left: 16,
          color: token.colorText,
          textDecoration: "underline",
        }}
        href={props.resourceUrl}
      >
        {props.resourceLabel}
      </a>
    </div>
  );
};
