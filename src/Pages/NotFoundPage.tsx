import { AppButton } from "DataEntryComponents/AppButton";
import { Flex, Result } from "antd";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Flex
      justify="center"
      align="center"
      style={{ width: "100vw", height: "100vh" }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <AppButton type="primary" onClick={() => navigate("/")}>
            Back Home
          </AppButton>
        }
      />
    </Flex>
  );
};
