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
  className?: string;
}) => {
  const { token } = theme.useToken();

  const { data = [], width, height, className } = props;

  return (
    <BarChart width={width} height={height} data={data} className={className}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip cursor={{ fill: token.colorBorder }} />
      <Legend />
      <Bar dataKey="value" fill={token.colorPrimary} />
    </BarChart>
  );
};
