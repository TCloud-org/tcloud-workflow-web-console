import { Footer } from "antd/es/layout/layout";
import { BRAND } from "../Config/EndpointConfig";

export const AppFooter = () => {
  return (
    <Footer
      style={{
        textAlign: "center",
      }}
    >
      {`${BRAND} ©2024 Powered by TCloud`}
    </Footer>
  );
};
