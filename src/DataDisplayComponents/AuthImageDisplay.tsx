import { Flex, Image, theme } from "antd";

export const AuthImageDisplay = (props: {
  imageUrl?: string;
  resourceUrl?: string;
  resourceLabel?: string;
}) => {
  const { token } = theme.useToken();

  return (
    <Flex
      vertical
      justify="center"
      style={{ height: "100%", backgroundColor: "#a7a5e7" }}
    >
      <Image
        src={props.imageUrl}
        style={{ borderRadius: token.borderRadiusLG, objectFit: "contain" }}
        height="100%"
      />
      <a
        style={{ fontSize: 12, position: "absolute", bottom: 16, left: 16 }}
        href={props.resourceUrl}
      >
        {props.resourceLabel}
      </a>
    </Flex>
  );
};
