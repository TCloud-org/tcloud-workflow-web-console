import { Empty } from "antd";
import { Box } from "../LayoutComponents/Box";

export const AppEmpty = () => {
  return (
    <Box>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    </Box>
  );
};
