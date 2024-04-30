import { EMS_GET_PAGINATED_TEMPLATES_ENDPOINT } from "Config/EMSEndpointConfig";
import {
  EmailTemplateProduct,
  PageableTemplateProducts,
} from "Config/StoreConfig";
import { AppRow } from "LayoutComponents/AppRow";
import { AppSpace } from "LayoutComponents/AppSpace";
import { EmailTemplateStoreItem } from "StoreComponents/EmailTemplateStoreItem";
import { Col, Typography } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const EmailTemplateStore = () => {
  const [products, setProducts] = useState<EmailTemplateProduct[]>([]);

  const fetchStore = useCallback(async () => {
    const res = await axios
      .get(`${EMS_GET_PAGINATED_TEMPLATES_ENDPOINT}`)
      .then((res) => res.data);

    const pagination = res.paginatedProducts as PageableTemplateProducts;

    setProducts(pagination.content || []);
  }, []);

  useEffect(() => {
    fetchStore();
  }, [fetchStore]);

  return (
    <AppSpace>
      <Typography.Title level={4}>Email Template Store</Typography.Title>

      <AppRow gutter={[32, 32]}>
        {products.map((product, i) => (
          <Col span={12} key={i}>
            <EmailTemplateStoreItem data={product} />
          </Col>
        ))}
      </AppRow>
    </AppSpace>
  );
};
