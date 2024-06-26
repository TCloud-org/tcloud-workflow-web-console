import { FormOutlined } from "@ant-design/icons";
import { EmailTemplateProduct } from "Config/StoreConfig";
import { AppCard } from "DataDisplayComponents/AppCard";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppIconButton } from "DataEntryComponents/AppIconButton";
import { Flex, Typography } from "antd";

export const EmailTemplateStoreItem = (props: {
  data: EmailTemplateProduct;
  use?: (template: EmailTemplateProduct) => void;
}) => {
  const { data, use } = props;

  const handleEdit = () => {
    window.open(
      `https://www.stepworkflow.thecloudworlds.com/store/${data.templateStoreId}/edit`,
      "_blank"
    );
  };

  const handleView = () => {
    window.open(
      `https://www.stepworkflow.thecloudworlds.com/store/${data.templateStoreId}`,
      "_blank"
    );
  };

  return (
    <AppCard
      actions={
        use
          ? [
              <AppButton
                style={{ width: "90%" }}
                type="primary"
                onClick={() => use(data)}
              >
                Use
              </AppButton>,
            ]
          : []
      }
      title={
        <Flex align="center" justify="space-between">
          <Typography.Text>{`${data.name} #${data.templateStoreId}`}</Typography.Text>
          <Flex align="center" gap={8}>
            <AppButton type="text" onClick={handleView}>
              View
            </AppButton>
            <AppIconButton type="text" tooltip="Edit" onClick={handleEdit}>
              <FormOutlined />
            </AppIconButton>
          </Flex>
        </Flex>
      }
    >
      <Flex gap={16} vertical>
        <Typography.Text italic type="secondary" style={{ fontSize: 12 }}>
          From{" "}
          <Typography.Text strong type="secondary" style={{ fontSize: 12 }}>
            {data.author}
          </Typography.Text>
        </Typography.Text>
        <div
          className="inner-html"
          dangerouslySetInnerHTML={{
            __html: data.preview ? data.preview : data.raw,
          }}
        />
      </Flex>
    </AppCard>
  );
};
