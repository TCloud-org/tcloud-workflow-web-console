import { useEffect, useState } from "react";
import { Legend, Pie, PieChart, Sector, Tooltip } from "recharts";

export interface ChartProps {
  name?: string;
  value?: number;
  fill?: string;
}

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    percent,
  } = props;

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
        fontWeight={700}
        fontSize={18}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        stroke="#ffffff"
      />
    </g>
  );
};

export const AppPieChart = (props: {
  data?: ChartProps[];
  width?: number;
  height?: number;
}) => {
  const { data = [], width = 500, height = 300 } = props;

  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    setActiveIndex(
      data.findIndex((item: ChartProps) => (item.value || 0) > 0) || 0
    );
  }, [data]);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <PieChart width={width} height={height}>
      <Pie
        activeIndex={activeIndex}
        activeShape={(shapeProps: any) =>
          renderActiveShape({
            ...shapeProps,
            ...(data?.[activeIndex] && {
              fill: data[activeIndex].fill || "#8884d8",
            }),
          })
        }
        data={data}
        fillOpacity={0.35}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        onMouseEnter={onPieEnter}
      />
      <Legend iconType="circle" />
      <Tooltip />
    </PieChart>
  );
};
