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

const color = ["#5347ce", "#887cfd", "#4896fe", "#16c8c7", "#68e9ea"];

export const AppBarChart = (props: {
  data?: { [key: string]: number | string }[];
  width?: number;
  height?: number;
  className?: string;
}) => {
  const { token } = theme.useToken();

  const { data = [], width, height, className } = props;

  return (
    <BarChart
      width={width}
      height={height}
      data={data}
      className={className}
      barSize={24}
      style={{ stroke: "#fff", strokeWidth: 1 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip cursor={{ fill: token.colorBorder }} />
      <Legend />
      {data.length > 0 &&
        Object.entries(data[0])
          .filter(([_, v]) => typeof v === "number")
          .map(([k, _], i) => (
            <Bar
              dataKey={k}
              name={k}
              fill={color[i % color.length]}
              radius={[
                token.borderRadiusLG,
                token.borderRadiusLG,
                token.borderRadiusLG,
                token.borderRadiusLG,
              ]}
              key={i}
              stackId="a"
            />
          ))}
    </BarChart>
  );
};
