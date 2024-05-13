import { theme } from "antd";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const AppBarChart = (props: {
  data?: { name: string; value: number }[];
  width?: number;
  height?: number;
}) => {
  const { token } = theme.useToken();

  const { data = [], width, height } = props;

  return (
    <BarChart width={width} height={height} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill={token.colorPrimary} />
    </BarChart>
  );
};
