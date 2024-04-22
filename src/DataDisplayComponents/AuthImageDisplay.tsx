import { Flex, Image, theme } from "antd";

export const AuthImageDisplay = (props: {
  imageUrl?: string;
  resourceUrl?: string;
  resourceLabel?: string;
}) => {
  const { token } = theme.useToken();

  return (
    <Flex vertical justify="center" style={{ height: "100%" }}>
      <Image
        src={props.imageUrl}
        style={{ borderRadius: token.borderRadiusLG }}
      />
      <Flex justify="flex-start">
        <a style={{ fontSize: 12 }} href={props.resourceUrl}>
          {props.resourceLabel}
        </a>
      </Flex>
    </Flex>
  );
};
