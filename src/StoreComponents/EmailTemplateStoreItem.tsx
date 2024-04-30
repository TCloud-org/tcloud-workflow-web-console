import { EmailTemplateProduct } from "Config/StoreConfig";
import { Card, Flex, theme } from "antd";

export const EmailTemplateStoreItem = (props: {
  data: EmailTemplateProduct;
}) => {
  const { token } = theme.useToken();
  const { data } = props;

  return (
    <Card
      bordered={false}
      style={{ boxShadow: token.boxShadowSecondary }}
      title={`${data.name} #${data.templateStoreId}`}
      className="scale"
    >
      <Flex gap={16} vertical>
        <div>{data.author}</div>
        <div
          className="inner-html"
          dangerouslySetInnerHTML={{
            __html: data.preview ? data.preview : data.raw,
          }}
        />
      </Flex>
    </Card>
  );
};
