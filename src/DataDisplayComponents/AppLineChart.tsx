import { Typography } from "antd";
import { ReactElement, SVGProps } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";
import { DataKey } from "recharts/types/util/types";
import { AppSpace } from "../LayoutComponents/AppSpace";
import { formatTimeShort } from "../Utils/DateUtils";
import { formatCamelCaseKey } from "../Utils/ObjectUtils";
import { AppSurface } from "./AppSurface";

export const AppLineChart = (
  props: CategoricalChartProps & {
    yAxisTick?:
      | SVGProps<SVGTextElement>
      | ReactElement<SVGElement>
      | ((props: any) => ReactElement<SVGElement>)
      | boolean;
    dataKey: DataKey<any>;
    yMax?: number;
  }
) => {
  return (
    <LineChart
      width={850}
      height={400}
      margin={{ top: 20, right: 20, bottom: 5, left: 30 }}
      {...props}
    >
      <Line
        type="monotone"
        dataKey={props.dataKey}
        stroke="#8884d8"
        fill="#8884d8"
      />
      <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis tick={props.yAxisTick} interval={0} />
      <Legend formatter={(value) => formatCamelCaseKey(value)} />
      {props.yMax && <ReferenceLine y={props.yMax} label="Max" stroke="red" />}
      <Tooltip
        labelFormatter={(label) => `Attempt #${label}`}
        content={({ active, payload, label }) =>
          active && payload && payload.length > 0 ? (
            <AppSurface>
              <AppSpace size="small">
                <Typography.Text
                  strong
                  style={{ fontSize: "12px" }}
                >{`Attempt #${label}`}</Typography.Text>
                <Typography.Text style={{ fontSize: "12px" }}>
                  {`${formatCamelCaseKey(
                    payload[0].name?.toString() || ""
                  )}: ${formatTimeShort(payload[0].value?.toString() || "")}`}
                </Typography.Text>
              </AppSpace>
            </AppSurface>
          ) : null
        }
      />
    </LineChart>
  );
};
