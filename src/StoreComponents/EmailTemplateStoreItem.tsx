import { FormOutlined } from "@ant-design/icons";
import { EmailTemplateProduct } from "Config/StoreConfig";
import { AppIconButton } from "DataEntryComponents/AppIconButton";
import { Card, Flex, Typography, theme } from "antd";

export const EmailTemplateStoreItem = (props: {
  data: EmailTemplateProduct;
}) => {
  const { token } = theme.useToken();
  const { data } = props;

  const handleEdit = () => {};

  return (
    <Card
      bordered={false}
      style={{ boxShadow: token.boxShadowSecondary }}
      title={
        <Flex align="center" justify="space-between">
          <Typography.Text>{`${data.name} #${data.templateStoreId}`}</Typography.Text>
          <AppIconButton type="text" tooltip="Edit" onClick={handleEdit}>
            <FormOutlined />
          </AppIconButton>
        </Flex>
      }
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
