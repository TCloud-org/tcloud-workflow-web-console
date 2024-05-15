import { Flex, Image, theme } from "antd";

export const AuthImageDisplay = (props: {
  imageUrl?: string;
  resourceUrl?: string;
  resourceLabel?: string;
}) => {
  const { token } = theme.useToken();
  //#a7a5e7
  return (
    <Flex vertical justify="center" style={{ backgroundColor: "transparent" }}>
      <Image
        src={props.imageUrl}
        style={{ objectFit: "cover" }}
        height="100vh"
        preview={false}
      />
      {props.resourceUrl && (
        <a
          style={{
            fontSize: 12,
            position: "absolute",
            bottom: 16,
            left: 16,
            color: token.colorWhite,
            textDecoration: "underline",
          }}
          href={props.resourceUrl}
        >
          {props.resourceLabel}
        </a>
      )}
    </Flex>
  );
};
